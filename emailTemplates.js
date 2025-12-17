function signupWelcome({ name }) {
  const subject = "Welcome to Wanderlust!";
  const html = `<p>Hi ${name || "there"},</p><p>Your account has been created successfully.</p>`;
  const text = `Hi ${name || "there"}, your account has been created successfully.`;
  return { subject, html, text };
}

function bookingCreated({ name, destination, startDate, endDate, travelers }) {
  const subject = "We received your booking request";
  const html = `
    <p>Hi ${name || "there"},</p>
    <p>We received your booking request:</p>
    <ul>
      <li><b>Destination:</b> ${destination}</li>
      <li><b>Dates:</b> ${startDate || "-"} to ${endDate || "-"}</li>
      <li><b>Travelers:</b> ${travelers || "-"}</li>
    </ul>
    <p>We’ll confirm soon.</p>
  `;
  const text = `Booking received for ${destination}.`;
  return { subject, html, text };
}

function bookingStatusChanged({ name, destination, status }) {
  const pretty = status?.toUpperCase();
  const subject = `Booking ${pretty}: ${destination}`;
  const html = `<p>Hi ${name || "there"},</p><p>Your booking for <b>${destination}</b> is now: <b>${pretty}</b>.</p>`;
  const text = `Your booking for ${destination} is now ${pretty}.`;
  return { subject, html, text };
}

function feedbackThanks({ name }) {
  const subject = "Thanks for your feedback";
  const html = `<p>Hi ${name || "there"},</p><p>Thanks for sharing your feedback. We appreciate it!</p>`;
  const text = `Thanks for your feedback!`;
  return { subject, html, text };
}

function adminNewBooking({ userEmail, destination }) {
  const subject = `New booking request: ${destination}`;
  const html = `<p>New booking request from <b>${userEmail}</b> for <b>${destination}</b>.</p>`;
  const text = `New booking from ${userEmail} for ${destination}.`;
  return { subject, html, text };
}

function adminNewFeedback({ userEmail, type }) {
  const subject = `New feedback (${type || "general"})`;
  const html = `<p>New feedback submitted by <b>${userEmail || "unknown user"}</b> (${type || "general"}).</p>`;
  const text = `New feedback submitted (${type || "general"}).`;
  return { subject, html, text };
}

module.exports = {
  signupWelcome,
  bookingCreated,
  bookingStatusChanged,
  feedbackThanks,
  adminNewBooking,
  adminNewFeedback,
};
