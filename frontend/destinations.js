window.DESTINATIONS = [
  {
    slug: 'goa',
    name: 'Goa Trip',
    short: 'Sun, sand & shacks — the classic coastal escape.',
    price: 24999,
    image: 'goa2.jpg',
    page: 'trip.html?slug=goa',
  },
  {
    slug: 'himachal',
    name: 'Himachal',
    short: 'Snow peaks, pine forests, and cozy cafés.',
    price: 19999,
    image: 'himachal.webp',
    page: 'trip.html?slug=himachal',
  },
  {
    slug: 'sikkim',
    name: 'Sikkim',
    short: 'Monasteries, lakes, and Himalayan views.',
    price: 25999,
    image: 'sikkim.webp',
    page: 'trip.html?slug=sikkim',
  },
  {
    slug: 'spiti',
    name: 'Spiti Valley',
    short: 'High deserts, starry skies, and ancient gompas.',
    price: 29999,
    image: 'spiti.webp',
    page: 'trip.html?slug=spiti',
  },
  {
    slug: 'rajasthan',
    name: 'Rajasthan',
    short: 'Royal forts, deserts, and heritage stays.',
    price: 22999,
    image: 'rajasthan.webp',
    page: 'trip.html?slug=rajasthan',
  },
  {
    slug: 'kerala',
    name: 'Kerala',
    short: 'Backwaters, tea gardens & Ayurveda retreats.',
    price: 23999,
    image: 'kerala.webp',
    page: 'trip.html?slug=kerala',
  },
  {
    slug: 'kashmir',
    name: 'Kashmir',
    short: 'Houseboats, meadows, and snow-capped peaks.',
    price: 26999,
    image: 'kashmir.webp',
    page: 'trip.html?slug=kashmir',
  },
];

// Full trip data scraped from individual pages
window.TRIP_DETAILS = {
  goa: {
    slug: 'goa',
    heroHighlight: 'GOA',
    heroTagline: 'Handpicked group trips & custom getaways',
    heroImage:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
    overview:
      'Experience the beauty of Goa with beaches, water sports, forts, and vibrant nightlife. This 4-day trip blends adventure with relaxation.',
    price: 24999,
    overviewLabel: 'Overview',
    itinerary: [
      'Day 1: Arrival and Baga Beach evening',
      'Day 2: North Goa tour (Anjuna, Vagator, Chapora Fort)',
      'Day 3: South Goa tour + Mandovi River Cruise',
      'Day 4: Shopping and Departure',
    ],
    inclusions: [
      '3 Nights Hotel Stay',
      'Daily Breakfast',
      'AC Transfers',
      'Trip Captain Assistance',
    ],
  },

  himachal: {
    slug: 'himachal',
    heroHighlight: 'HIMACHAL',
    heroTagline: 'Discover snow peaks, pine forests, cozy stays, and mountain adventures.',
    heroImage:
      'https://images.unsplash.com/photo-1491466424936-e304919aada7?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1169',
    overview:
      'Escape to the breathtaking landscapes of Himachal Pradesh! From the vibrant streets of Manali to the serene charm of Dharamshala and the peaceful beauty of Kasol, this 6-day journey offers an unforgettable experience of mountains, rivers, and culture.',
    price: 27999,
    itinerary: [
      'Day 1: Arrival in Manali, leisure evening by Mall Road',
      'Day 2: Solang Valley adventures — skiing, snow scooter, and paragliding',
      'Day 3: Visit Rohtang Pass (subject to weather) and enjoy mountain views',
      'Day 4: Drive to Kasol, visit Manikaran Sahib & relax by Parvati River',
      'Day 5: Explore Dharamshala — monasteries, cafes, and local markets',
      'Day 6: Departure from Dharamshala',
    ],
    inclusions: [
      '5 Nights Hotel Stay (Manali, Kasol, Dharamshala)',
      'Daily Breakfast and Dinner',
      'AC Volvo Transfers (Delhi Pickup & Drop)',
      'Local Sightseeing Tours',
      'Experienced Trip Captain Assistance',
    ],
  },

  sikkim: {
    slug: 'sikkim',
    heroHighlight: 'SIKKIM',
    heroTagline:
      'Discover pristine lakes, ancient monasteries, and the mighty Kanchenjunga — a peaceful Himalayan escape.',
    heroImage:
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1174',
    overview:
      'Explore the quiet beauty of Sikkim — alpine valleys, sacred lakes, colorful monasteries, and the third highest peak in the world. This 6-day itinerary mixes cultural visits, easy treks, and relaxed time in picturesque hill towns.',
    price: 28999,
    itinerary: [
      'Day 1: Arrival in Gangtok and evening stroll at MG Marg',
      'Day 2: Excursion to Tsomgo Lake (Changu Lake) & Baba Mandir',
      'Day 3: Drive to North Sikkim (Lachung) — local village walk and waterfall',
      'Day 4: Visit Yumthang Valley (Valley of Flowers) & hot springs',
      'Day 5: Explore Yuksom / Pelling — monasteries, Khecheopalri Lake, and views of Kanchenjunga',
      'Day 6: Return to Gangtok & departure',
    ],
    inclusions: [
      '5 Nights hotel stays across Gangtok, Lachung (or Pelling/Yuksom)',
      'Daily breakfast and 3 dinners',
      'All inter-city transfers in comfortable vehicles',
      'Local sightseeing with experienced guides',
      'Permits for restricted areas where required',
    ],
  },

  spiti: {
    slug: 'spiti',
    heroHighlight: 'SPITI VALLEY',
    heroTagline:
      'Explore stark high-altitude deserts, ancient gompas, turquoise lakes, and remote Himalayan villages.',
    heroImage:
      'https://images.unsplash.com/photo-1466854076813-4aa9ac0fc347?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1332',
    overview:
      'Spiti Valley is a remote cold-desert region in Himachal Pradesh known for rugged landscapes, centuries-old monasteries, high mountain passes, and unique wildlife. This 6-day itinerary blends easy treks, cultural visits, and scenic drives across the Trans-Himalayan plateau.',
    price: 29999,
    itinerary: [
      'Day 1: Arrival at Kaza; acclimatize and explore the town',
      'Day 2: Visit Key (Kye) Monastery and Kibber / Komik villages',
      'Day 3: Excursion to Chandratal Lake — scenic drive and short walks',
      'Day 4: Explore Dhankar Monastery & Dhankar Lake',
      'Day 5: Drive to Pin Valley National Park — wildlife and village walks',
      'Day 6: Return drive (via Kunzum Pass if open) and departure',
    ],
    inclusions: [
      '5 Nights comfortable stays (Kaza-area)',
      'Daily breakfast and 3 dinners',
      'All ground transfers in a comfortable SUV/tempo traveller',
      'Local sightseeing with experienced guides',
      'Permits (if required) and camping/excursion arrangements',
    ],
  },

  rajasthan: {
    slug: 'rajasthan',
    heroHighlight: 'RAJASTHAN',
    heroTagline:
      'Experience royal palaces, vast deserts, colorful bazaars and timeless forts — a journey through the land of kings.',
    heroImage:
      'https://plus.unsplash.com/premium_photo-1661962428918-6a57ab674e23?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1170',
    overview:
      "Rajasthan offers a sweep of vibrant culture, majestic forts, palace architecture, desert safaris and lively markets. From Jaipur's Pink City to Udaipur's lakes, Jaisalmer's golden dunes and Ranthambore's wildlife, this 6-day tour highlights the best of the state.",
    price: 22999,
    itinerary: [
      'Day 1: Arrival in Jaipur — visit Hawa Mahal & Amber Fort, evening at local bazaars',
      'Day 2: Drive to Pushkar — explore Pushkar Lake, temples and ghats',
      'Day 3: Travel to Jaisalmer — sunset at Sam Sand Dunes and camel safari',
      'Day 4: Explore Jaisalmer Fort & Patwon Ki Haveli, then drive to Jodhpur',
      'Day 5: Visit Mehrangarh Fort and Jaswant Thada; drive to Udaipur',
      'Day 6: Udaipur — City Palace, Lake Pichola boat ride, and departure',
    ],
    inclusions: [
      '5 Nights comfortable hotel stays across Jaipur, Jaisalmer, Jodhpur & Udaipur',
      'Daily breakfast and 3 dinners',
      'All ground transfers and local sightseeing in an air-conditioned vehicle',
      'Experienced local guides and entry fees to monuments (where required)',
    ],
  },

  kerala: {
    slug: 'kerala',
    heroHighlight: 'KERALA',
    heroTagline:
      'Drift through tranquil backwaters, stroll tea gardens in Munnar, and spot wildlife in Thekkady — a lush, tropical escape.',
    heroImage:
      'https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1074',
    overview:
      'Kerala blends emerald backwaters, misty hill stations, spice plantations, and coastal beaches. Enjoy houseboat stays on Alleppey canals, tea walks in Munnar, wildlife in Thekkady, and relaxed beach time at Kovalam on this 6-day curated itinerary.',
    price: 25999,
    itinerary: [
      'Day 1: Arrival in Kochi — explore Fort Kochi and local cafés',
      'Day 2: Transfer to Munnar — tea garden walks & viewpoint visits',
      'Day 3: Munnar local sights (Eravikulam National Park / Mattupetty)',
      'Day 4: Drive to Thekkady — spice plantation visit & optional wildlife safari',
      'Day 5: Alleppey houseboat cruise — backwaters and village life',
      'Day 6: Kovalam beach time and departure from Trivandrum',
    ],
    inclusions: [
      '5 Nights hotel stays (Munnar, Thekkady, Alleppey/Kumarakom & Kovalam)',
      'Daily breakfast and 3 dinners',
      'Traditional houseboat cruise in Alleppey (shared/private options)',
      'All transfers in a comfortable vehicle and local sightseeing',
      'Experienced local guides and entry fees (where required)',
    ],
  },

  kashmir: {
    slug: 'kashmir',
    heroHighlight: 'KASHMIR',
    heroTagline:
      'Glide on shikaras across Dal Lake, ski in Gulmarg, and wander through alpine meadows and Mughal gardens — Kashmir’s landscapes are unforgettable.',
    heroImage:
      'https://images.unsplash.com/photo-1464254786740-b97e5420c299?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1171',
    overview:
      'Kashmir—often called "Paradise on Earth"—offers mirror-like lakes, snow-capped peaks, lush valleys, and rich cultural heritage. From Srinagar’s houseboats and Mughal gardens to the ski slopes of Gulmarg and the scenic drives to Pahalgam and Sonamarg, this 6-day itinerary blends relaxation with adventure.',
    price: 26999,
    itinerary: [
      'Day 1: Arrival in Srinagar — houseboat check-in & shikara ride on Dal Lake',
      'Day 2: Srinagar sightseeing — Mughal Gardens (Shalimar, Nishat) and Shankaracharya viewpoint',
      'Day 3: Excursion to Gulmarg — gondola ride and optional skiing/treks',
      'Day 4: Drive to Pahalgam — Betaab Valley and Aru Valley walks',
      'Day 5: Sonamarg day trip — Thajiwas Glacier (seasonal) and alpine meadows',
      'Day 6: Return to Srinagar & departure',
    ],
    inclusions: [
      '5 Nights comfortable stays (Srinagar / Gulmarg / Pahalgam)',
      'Daily breakfast and 3 dinners',
      'Shikara ride on Dal Lake (shared/private options)',
      'All local transfers and sightseeing in comfortable vehicles',
      'Experienced local guides and necessary permits',
    ],
  },
};
