export const mockBusinessStats = {
  overview: {
    totalRestaurants: 2,
    totalDishes: 12,
    totalLikes: 156,
    averageRating: 4.8,
  },
  restaurants: [
    {
      _id: '1',
      name: 'Mizlala',
      logo: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2874',
      address: { city: 'Tel Aviv' },
    },
    {
      _id: '2',
      name: 'Machneyuda',
      logo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2874',
      address: { city: 'Jérusalem' },
    },
  ],
  topDishes: [
    {
      _id: '101',
      name: 'Croissant Foie Gras',
      image: 'https://images.unsplash.com/photo-1627662236879-c29019672689?q=80&w=2874',
      rating: { average: 4.9, count: 50 },
    },
    {
      _id: '201',
      name: 'Polenta aux Champignons',
      image: 'https://images.unsplash.com/photo-1541544744-378c5d8a6b93?q=80&w=2956',
      rating: { average: 5.0, count: 120 },
    },
  ],
};

export const mockMyRestaurants = [
  {
    _id: '1',
    name: 'Mizlala',
    description: 'Une expérience culinaire moderne...',
    logo: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2874',
    address: { city: 'Tel Aviv' },
    rating: { average: 4.8 },
    cuisine: ['Israélien'],
  },
  {
    _id: '2',
    name: 'Machneyuda',
    description: "L'ambiance électrique du marché...",
    logo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2874',
    address: { city: 'Jérusalem' },
    rating: { average: 4.9 },
    cuisine: ['Marché'],
  },
];

export const mockMyDishes = [
  {
    _id: '1',
    name: 'Shakshuka Royale',
    description: 'Œufs pochés, sauce tomate...',
    price: 45,
    image: 'https://images.unsplash.com/photo-1590593162201-f67611a18b87?q=80&w=2787',
    restaurant: { _id: '1', name: 'Mizlala' },
    rating: { average: 4.8, count: 120 },
  },
  {
    _id: '5',
    name: "Carpaccio d'Aubergine",
    description: 'Aubergine brûlée...',
    price: 48,
    image: 'https://images.unsplash.com/photo-1608219992759-8d74ed8d76eb?q=80&w=2874',
    restaurant: { _id: '2', name: 'Machneyuda' },
    rating: { average: 4.9, count: 180 },
  },
];

export const mockMyRecipes = [
  {
    _id: '1',
    title: 'Challah du Shabbat',
    description: 'Pain tressé traditionnel...',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2942',
    prepTime: 45,
    cookTime: 35,
    servings: 8,
    difficulty: 'moyen',
    likes: ['1', '2', '3'],
  },
  {
    _id: '2',
    title: 'Couscous Israélien',
    description: 'Accompagnement rapide et délicieux.',
    image: 'https://images.unsplash.com/photo-1644365319888-59c44510b656?q=80&w=2864',
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    difficulty: 'facile',
    likes: ['1', '2'],
  },
];
