/**
 * List of real Israeli restaurants to import from Google Places
 * Used for intelligent bulk import
 * Total: 46 restaurants across 11 cities
 */

const REAL_ISRAEL_RESTAURANTS = [
  // Tel Aviv (14 restaurants)
  { query: 'OCD restaurant', city: 'Tel Aviv' },
  { query: 'HaBasta restaurant', city: 'Tel Aviv' },
  { query: 'Claro restaurant', city: 'Tel Aviv' },
  { query: 'Mashya restaurant', city: 'Tel Aviv' },
  { query: 'Port Said restaurant', city: 'Tel Aviv' },
  { query: 'HaKosem falafel', city: 'Tel Aviv' },
  { query: 'Shila restaurant', city: 'Tel Aviv' },
  { query: 'Taizu restaurant', city: 'Tel Aviv' },
  { query: 'Popina restaurant', city: 'Tel Aviv' },
  { query: 'M25 restaurant', city: 'Tel Aviv' },
  { query: 'Pastel restaurant', city: 'Tel Aviv' },
  { query: 'Yaffo Tel Aviv restaurant', city: 'Tel Aviv' },
  { query: 'Miznon restaurant', city: 'Tel Aviv' },
  { query: 'Mizlala restaurant', city: 'Tel Aviv' },
  
  // Jaffa (4 restaurants)
  { query: 'Abu Hassan hummus', city: 'Jaffa' },
  { query: 'Dr Shakshuka', city: 'Jaffa' },
  { query: 'Sabich Frishman', city: 'Jaffa' },
  { query: 'Pua restaurant', city: 'Jaffa' },
  
  // Jerusalem (7 restaurants)
  { query: 'Machneyuda restaurant', city: 'Jerusalem' },
  { query: 'Mona restaurant', city: 'Jerusalem' },
  { query: 'The Eucalyptus restaurant', city: 'Jerusalem' },
  { query: 'Azura restaurant', city: 'Jerusalem' },
  { query: '1868 restaurant', city: 'Jerusalem' },
  { query: 'Chakra restaurant', city: 'Jerusalem' },
  { query: 'Adom restaurant', city: 'Jerusalem' },
  { query: 'Canela restaurant', city: 'Jerusalem' },
  
  // Herzliya (3 restaurants)
  { query: 'Herbert Samuel restaurant', city: 'Herzliya' },
  { query: 'Darya restaurant', city: 'Herzliya' },
  { query: 'Rustico restaurant', city: 'Herzliya' },
  
  // Caesarea (2 restaurants)
  { query: 'Helena restaurant', city: 'Caesarea' },
  { query: 'Aperto restaurant', city: 'Caesarea' },
  
  // Haifa (3 restaurants)
  { query: 'Minna Tomei restaurant', city: 'Haifa' },
  { query: 'Fattoush restaurant', city: 'Haifa' },
  { query: 'Douzan restaurant', city: 'Haifa' },
  
  // Acre (1 restaurant)
  { query: 'Uri Buri restaurant', city: 'Acre' },
  
  // Eilat (3 restaurants)
  { query: 'Pago Pago restaurant', city: 'Eilat' },
  { query: 'The Last Refuge restaurant', city: 'Eilat' },
  { query: 'Herzog restaurant', city: 'Eilat' },
  
  // Tiberias (2 restaurants)
  { query: 'Decks restaurant', city: 'Tiberias' },
  { query: 'Magdalena restaurant', city: 'Tiberias' },
  
  // Other cities (7 restaurants)
  { query: 'Ranana Garden restaurant', city: 'Raanana' },
  { query: 'Ashdod Marina restaurant', city: 'Ashdod' },
  { query: 'Beersheba Souk restaurant', city: 'Beer Sheva' },
  { query: 'Ramat Gan Chic restaurant', city: 'Ramat Gan' },
  { query: 'Petah Tikva Modern restaurant', city: 'Petah Tikva' },
  { query: 'Modiin Family restaurant', city: 'Modiin' },
  { query: 'Netanya View restaurant', city: 'Netanya' },
];

module.exports = REAL_ISRAEL_RESTAURANTS;
