const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { sendEmail } = require('./mailer');
const templates = require('./emailTemplates');
const path = require('path');

const app = express();
const DB_PATH = './wanderlust.db';
const SALT_ROUNDS = 10;

const JWT_SECRET = process.env.JWT_SECRET;
const PORT = process.env.PORT || 3000;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

// ---------- DB SETUP ----------
const db = new Database(DB_PATH);

// Create tables if they don't exist
db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT,
    phone TEXT
  );
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS feedback (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    name TEXT,
    contact TEXT,
    type TEXT DEFAULT 'general',
    message TEXT,
    rating INTEGER,
    share INTEGER DEFAULT 0,
    status TEXT DEFAULT 'new',
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    destination TEXT NOT NULL,
    start_date TEXT,
    end_date TEXT,
    travelers INTEGER,
    notes TEXT,
    status TEXT DEFAULT 'pending',
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
`).run();

// ---------- MIDDLEWARE ----------
// Allow all origins
// allow from https://tiny-mandazi-d484ce.netlify.app/
app.use(cors(
  { origin: '*' }
));
app.use(express.json()); // parse JSON body

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'frontend')));

/**
 * Auth middleware
 * - If `requiredRole` is provided ('admin'), only that role is allowed
 * - Expects header: Authorization: Bearer <token>
 */
function auth(requiredRole) {               
  return (req, res, next) => {
    const authHeader = req.headers.authorization || '';
    const [scheme, token] = authHeader.split(' ');

    if (scheme !== 'Bearer' || !token) {
      return res.status(401).json({ message: 'Missing or invalid Authorization header' });
    }

    try {
      const payload = jwt.verify(token, JWT_SECRET);
      req.user = payload; // { id, email, role }

      if (requiredRole && payload.role !== requiredRole) {
        return res.status(403).json({ message: 'Forbidden (insufficient role)' });
      }

      next();
    } catch (err) {
      console.error('Auth error:', err);
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  };
}

// ---------- ROUTES ----------

// 1a) LOGIN
app.post('/api/login', (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.status(400).json({ message: 'Missing identifier or password' });
  }

  try {
    const user = db.prepare(
      'SELECT * FROM users WHERE email = ? OR phone = ? LIMIT 1'
    ).get(identifier, identifier);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // admin email
    const role = user.email === ADMIN_EMAIL ? 'admin' : 'user';

    // Create JWT token  --------------------------------- *** NEW
    const token = jwt.sign(
      { id: user.id, email: user.email, role },
      JWT_SECRET,
      { expiresIn: '7d' } // choose your expiry
    );

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role,
      token, // <-- frontend should store & send this
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


// 1b) SIGNUP - create a new user
app.post('/api/signup', (req, res) => {
  const { name, email, phone, password } = req.body;

  if (!email || !password || !name || !phone) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (existing) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS);

    const stmt = db.prepare(`
      INSERT INTO users (email, password, name, phone)
      VALUES (@email, @password, @name, @phone)
    `);

    const info = stmt.run({
      email,
      password: hashedPassword,
      name,
      phone,
    });

    const user = {
      id: info.lastInsertRowid,
      name,
      email,
      phone,
    };

    // (optionally) auto-login and return token as well  --- *** OPTIONAL
    const role = email === 'admin@email.com' ? 'admin' : 'user';
    const token = jwt.sign(
      { id: user.id, email: user.email, role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    sendEmail({
      to: user.email,
      ...templates.signupWelcome({ name: user.name }),
    })
      .then(() => {
        res.status(201).json({ ...user, role, token });
      })
      .catch((emailErr) => {
        console.error('Signup email error:', emailErr);
        res.status(201).json({ 
          ...user, 
          role, 
          token, 
          emailError: emailErr && emailErr.message ? emailErr.message : String(emailErr)
        });
      });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Server error', error: err.message});
  }
});

// 2) SUBMIT FEEDBACK
// You may or may not want this protected. Currently left OPEN.
app.post('/api/feedback', (req, res) => {
  const { userId, name, contact, type, message, rating, share } = req.body;

  if (!message && !rating) {
    return res.status(400).json({ message: 'Need at least rating or message' });
  }

  try {
    const stmt = db.prepare(`
      INSERT INTO feedback (user_id, name, contact, type, message, rating, share)
      VALUES (@user_id, @name, @contact, @type, @message, @rating, @share)
    `);

    const info = stmt.run({
      user_id: userId || null,
      name: name || null,
      contact: contact || null,
      type: type || 'general',
      message: message || null,
      rating: rating || null,
      share: share ? 1 : 0,
    });

    // If userId provided, fetch email
    let feedbackUser = null;
    if (userId) {
      feedbackUser = db.prepare('SELECT name, email FROM users WHERE id = ?').get(userId);
    }

    if (feedbackUser?.email) {
      sendEmail({
        to: feedbackUser.email,
        ...templates.feedbackThanks({ name: feedbackUser.name }),
      }).catch(console.error);
    }

    // optional: notify admin
    sendEmail({
      to: process.env.ADMIN_EMAIL,
      ...templates.adminNewFeedback({
        userEmail: feedbackUser?.email || contact || null,
        type,
      }),
    }).catch(console.error);

    res.json({ id: info.lastInsertRowid, message: 'Feedback saved' });
  } catch (err) {
    console.error('Feedback error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// 3) CREATE BOOKING (protected: user must be logged in)
app.post('/api/bookings', auth(), (req, res) => {
  const {
    userId,
    destination,
    startDate,
    endDate,
    travelers,
    notes,
  } = req.body;

  const actualUserId = req.user.id;                  

  if (!destination) {
    return res.status(400).json({ message: 'Missing destination' });
  }

  try {
    const stmt = db.prepare(`
      INSERT INTO bookings (user_id, destination, start_date, end_date, travelers, notes)
      VALUES (@user_id, @destination, @start_date, @end_date, @travelers, @notes)
    `);

    const info = stmt.run({
      user_id: actualUserId,
      destination,
      start_date: startDate || null,
      end_date: endDate || null,
      travelers: travelers || null,
      notes: notes || null,
    });

    const bookedUser = db.prepare(
      'SELECT name, email FROM users WHERE id = ?'
    ).get(actualUserId);

    sendEmail({
      to: bookedUser.email,
      ...templates.bookingCreated({
        name: bookedUser.name,
        destination,
        startDate,
        endDate,
        travelers,
      }),
    }).catch(console.error);

    sendEmail({
      to: process.env.ADMIN_EMAIL,
      ...templates.adminNewBooking({ userEmail: bookedUser.email, destination }),
    }).catch(console.error);

    res.json({ id: info.lastInsertRowid, message: 'Booking saved' });
  } catch (err) {
    console.error('Booking error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// 4) PROFILE (protected: user or admin)
app.get('/api/profile/:userId', auth(), (req, res) => {
  const userId = Number(req.params.userId);
  if (!userId) {
    return res.status(400).json({ message: 'Invalid user id' });
  }

  // User can only see their own profile unless admin
  if (req.user.role !== 'admin' && req.user.id !== userId) { 
    return res.status(403).json({ message: 'Forbidden' });
  }

  try {
    const user = db.prepare(
      'SELECT id, name, email, phone FROM users WHERE id = ?'
    ).get(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const feedbackList = db.prepare(
      `SELECT id, type, message, rating, share, status, created_at
       FROM feedback
       WHERE user_id = ?
       ORDER BY datetime(created_at) DESC`
    ).all(userId);

    const bookings = db.prepare(
      `SELECT id, destination, start_date, end_date, travelers, status, created_at
       FROM bookings
       WHERE user_id = ?
       ORDER BY datetime(created_at) DESC`
    ).all(userId);

    res.json({ user, feedback: feedbackList, bookings });

  } catch (err) {
    console.error('Profile error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ---------- ADMIN ROUTES ----------

// All admin routes require admin role
// Get all users
app.get('/api/admin/users', auth('admin'), (req, res) => {   
  try {
    const users = db.prepare(`
      SELECT id, name, email, phone
      FROM users
      ORDER BY id DESC
    `).all();

    res.json(users);
  } catch (err) {
    console.error('Admin users error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all feedback
app.get('/api/admin/feedback', auth('admin'), (req, res) => {
  try {
    const feedback = db.prepare(`
      SELECT id, user_id, name, contact, type, message, rating, share, status, created_at
      FROM feedback
      ORDER BY datetime(created_at) DESC
    `).all();

    res.json(feedback);
  } catch (err) {
    console.error('Admin feedback error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all bookings
app.get('/api/admin/bookings', auth('admin'), (req, res) => {
  try {
    const bookings = db.prepare(`
      SELECT id, user_id, destination, start_date, end_date, travelers, status, created_at
      FROM bookings
      ORDER BY datetime(created_at) DESC
    `).all();

    res.json(bookings);
  } catch (err) {
    console.error('Admin bookings error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update booking status
app.patch('/api/admin/bookings/:id', auth('admin'), (req, res) => {
  const bookingId = Number(req.params.id);
  const { status } = req.body;

  if (!bookingId || !status) {
    return res.status(400).json({ message: 'Missing id or status' });
  }

  try {
    const stmt = db.prepare(`
      UPDATE bookings
      SET status = @status
      WHERE id = @id
    `);

    const info = stmt.run({ status, id: bookingId });

    const booking = db.prepare(`
      SELECT b.id, b.destination, b.status, u.email, u.name
      FROM bookings b
      JOIN users u ON u.id = b.user_id
      WHERE b.id = ?
    `).get(bookingId);

    if (booking) {
      sendEmail({
        to: booking.email,
        ...templates.bookingStatusChanged({
          name: booking.name,
          destination: booking.destination,
          status: booking.status,
        }),
      }).catch(console.error);
    }

    if (info.changes === 0) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json({ message: 'Booking status updated' });
  } catch (err) {
    console.error('Admin update booking error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update feedback status
app.patch('/api/admin/feedback/:id', auth('admin'), (req, res) => {
  const feedbackId = Number(req.params.id);
  const { status } = req.body;

  if (!feedbackId || !status) {
    return res.status(400).json({ message: 'Missing id or status' });
  }

  try {
    const stmt = db.prepare(`
      UPDATE feedback
      SET status = @status
      WHERE id = @id
    `);

    const info = stmt.run({ status, id: feedbackId });

    if (info.changes === 0) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    res.json({ message: 'Feedback status updated' });
  } catch (err) {
    console.error('Admin update feedback error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ---------- SPA FALLBACK ----------
// Serve index.html for any unknown route (for SPA support)
app.use((req, res, next) => {
  // Only handle non-API, non-static requests
  if (
    req.method === 'GET' &&
    !req.path.startsWith('/api')
  ) {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
  } else {
    next();
  }
});

// ---------- START SERVER ----------
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});