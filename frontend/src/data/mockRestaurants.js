const baseMockRestaurants = [
  {
    _id: '1',
    name: 'Mizlala',
    description:
      'Une expérience culinaire moderne signée par le chef Meir Adoni. Une fusion audacieuse mariant les saveurs intenses du Moyen-Orient aux techniques de la haute cuisine européenne.',
    logo: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2874',
    coverImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2940',
    address: { city: 'Tel Aviv', street: 'Nahalat Binyamin 57' },
    phone: '03-566-5505',
    cacherout: 'Mehadrin',
    rating: { average: 4.8, count: 320 },
    cuisine: ['Israélien', 'Fusion', 'Chef'],
    tags: ['Ambiance', 'Cocktails', 'Terrasse'],
  },
  {
    _id: '2',
    name: 'Machneyuda',
    description:
      "L'effervescence du marché Mahane Yehuda transposée dans l'assiette. Une atmosphère électrique, une cuisine débridée et créative préparée sous vos yeux.",
    logo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2874',
    coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2940',
    address: { city: 'Jérusalem', street: 'Beit Yaakov 10' },
    phone: '02-533-3442',
    cacherout: 'Rabbanout',
    rating: { average: 4.9, count: 450 },
    cuisine: ['Marché', 'Méditerranéen', 'Chef'],
    tags: ['Musique', 'Vivant', 'Iconique'],
  },
  {
    _id: '3',
    name: 'Eucalyptus',
    description:
      'Une cuisine biblique réinterprétée avec modernité. Le chef Moshe Basson sublime les herbes sauvages et plantes indigènes des collines de Jérusalem.',
    logo: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2940',
    coverImage: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2940',
    address: { city: 'Jérusalem', street: 'Felt 14' },
    phone: '02-624-4331',
    cacherout: 'Mehadrin',
    rating: { average: 4.7, count: 210 },
    cuisine: ['Biblique', 'Authentique', 'Viandes'],
    tags: ['Historique', 'Romantique', 'Vue'],
  },
  {
    _id: '4',
    name: 'Herbert Samuel',
    description:
      "Restaurant gastronomique casher offrant une vue imprenable sur la mer. Une carte célébrant la fraîcheur des produits locaux, poissons et viandes d'exception.",
    logo: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2940',
    coverImage: 'https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?q=80&w=2940',
    address: { city: 'Herzliya', street: 'HaShunit 2' },
    phone: '09-955-5555',
    cacherout: 'Rabbanout',
    rating: { average: 4.6, count: 180 },
    cuisine: ['Poisson', 'Viande', 'Gastronomique'],
    tags: ['Vue Mer', 'Luxe', 'Vins'],
  },
  {
    _id: '5',
    name: 'Darya',
    description:
      "Une odyssée culinaire sur la Route de la Soie. Une fusion magistrale entre les cuisines d'Asie centrale et méditerranéenne au Hilton Tel Aviv.",
    logo: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2940',
    coverImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2940',
    address: { city: 'Tel Aviv', street: 'Hilton Hotel' },
    phone: '03-520-2222',
    cacherout: 'Mehadrin',
    rating: { average: 4.8, count: 150 },
    cuisine: ['Asiatique', 'Fusion', 'Hôtel'],
    tags: ['Élégant', 'Business', 'Luxe'],
  },
  {
    _id: '6',
    name: '1868',
    description:
      'La haute gastronomie dans un bâtiment historique aux voûtes de pierre. Une expérience intime où les techniques françaises subliment le terroir de Jérusalem.',
    logo: 'https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?q=80&w=2940',
    coverImage: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?q=80&w=2940',
    address: { city: 'Jérusalem', street: 'King David 10' },
    phone: '02-622-2312',
    cacherout: 'Mehadrin',
    rating: { average: 4.9, count: 130 },
    cuisine: ['Français', 'Gastronomique', 'Viandes'],
    tags: ['Intime', 'Historique', 'Cave à vin'],
  },
  {
    _id: '7',
    name: 'Dr Shakshuka',
    description:
      "Le spécialiste incontesté de la Shakshuka à Jaffa. Une cuisine authentique tripolitaine servie dans un cadre rustique rempli d'antiquités.",
    logo: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2940',
    coverImage: 'https://images.unsplash.com/photo-1590593162201-f67611a18b87?q=80&w=2787',
    address: { city: 'Jaffa', street: 'Beit Eshel 3' },
    phone: '03-682-2842',
    cacherout: 'Rabbanout',
    rating: { average: 4.5, count: 520 },
    cuisine: ['Tripolitain', 'Street Food', 'Authentique'],
    tags: ['Iconique', 'Rustique', 'Jaffa'],
  },
  {
    _id: '8',
    name: 'Sabich Frishman',
    description:
      "Une échoppe légendaire au cœur de Tel Aviv, connue pour servir le meilleur Sabich de la ville. Une file d'attente qui en vaut la peine.",
    logo: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?q=80&w=2940',
    coverImage: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?q=80&w=2940',
    address: { city: 'Tel Aviv', street: 'Frishman 42' },
    phone: '03-522-2222',
    cacherout: 'Mehadrin',
    rating: { average: 4.8, count: 680 },
    cuisine: ['Street Food', 'Végétarien', 'Irakien'],
    tags: ['Street Food', 'Populaire', 'Rapide'],
  },
  {
    _id: '9',
    name: 'Abu Hassan',
    description:
      'Le temple du hummus à Jaffa. Une institution familiale qui sert le hummus le plus crémeux et authentique, une référence depuis plus de 40 ans.',
    logo: 'https://images.unsplash.com/photo-1538334421852-687c439c92f4?q=80&w=2940',
    coverImage: 'https://images.unsplash.com/photo-1630151317382-042c10b42c8d?q=80&w=2806',
    address: { city: 'Jaffa', street: 'Ha-Dolfin 1' },
    phone: '03-682-0888',
    cacherout: 'Rabbanout',
    rating: { average: 4.9, count: 850 },
    cuisine: ['Hummus', 'Authentique', 'Arabe'],
    tags: ['Légendaire', 'Hummus', 'Pas cher'],
  },
  {
    _id: '10',
    name: 'HaKosem',
    description:
      'Le "Magicien" du falafel. Une adresse moderne et vibrante qui a élevé le falafel au rang d\'art culinaire. Service rapide et souriant.',
    logo: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2940',
    coverImage: 'https://images.unsplash.com/photo-1593252719532-347b6c86f1a6?q=80&w=2787',
    address: { city: 'Tel Aviv', street: 'Shlomo HaMelech 1' },
    phone: '03-525-2033',
    cacherout: 'Mehadrin',
    rating: { average: 4.8, count: 920 },
    cuisine: ['Falafel', 'Shawarma', 'Street Food'],
    tags: ['Vibrant', 'Moderne', 'Incontournable'],
  },
  {
    _id: '11',
    name: 'Miznon',
    description:
      "La street food revisitée par le chef Eyal Shani. Des pitas moelleuses garnies d'ingrédients rôtis, servies dans une ambiance survoltée.",
    logo: 'https://images.unsplash.com/photo-1563583733075-d91295a706be?q=80&w=3000',
    coverImage: 'https://images.unsplash.com/photo-1529193591176-1da79027d382?q=80&w=2940',
    address: { city: 'Tel Aviv', street: 'King George 30' },
    phone: '03-522-2222',
    cacherout: 'Rabbanout',
    rating: { average: 4.7, count: 750 },
    cuisine: ['Chef', 'Pita', 'Créatif'],
    tags: ['Eyal Shani', 'Branché', 'Festif'],
  },
];

const priceRangesById = {
  1: '₪₪₪',
  2: '₪₪₪₪',
  3: '₪₪₪',
  4: '₪₪₪₪',
  5: '₪₪₪₪',
  6: '₪₪₪₪',
  7: '₪₪',
  8: '₪',
  9: '₪',
  10: '₪₪',
  11: '₪₪',
};

export const mockRestaurants = baseMockRestaurants.map((restaurant) => {
  const mapQuery = encodeURIComponent(
    `${restaurant.address?.street || ''} ${restaurant.address?.city || ''} Israel`.trim()
  );

  return {
    ...restaurant,
    slug: restaurant.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, ''),
    imageUrl: restaurant.logo,
    imageAlt: `${restaurant.name} restaurant in ${restaurant.address?.city}`,
    imageSource: 'Unsplash',
    imageVerified: false,
    imageStatus: 'available',
    coverImageAlt: `${restaurant.name} dining room`,
    cuisineType: restaurant.cuisine?.[0],
    priceRange: priceRangesById[restaurant._id] || '₪₪',
    isKosher: restaurant.cacherout !== 'Non-Kasher',
    openingHours: {
      sunThu: '12:00 - 23:00',
      fri: '12:00 - 15:00',
      sat: '20:00 - 00:00',
    },
    website: restaurant.website || '',
    mapUrl: `https://www.google.com/maps/search/?api=1&query=${mapQuery}`,
    verified: false,
    verificationStatus: 'needs_manual_verification',
  };
});
