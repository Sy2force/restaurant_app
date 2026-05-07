export const mockFavorites = {
  restaurants: [
    {
      _id: '11',
      name: 'Miznon',
      description: 'La street food revisitée par le chef Eyal Shani.',
      coverImage: 'https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?q=80&w=2940',
      address: { city: 'Tel Aviv', street: 'King George 30' },
      rating: { average: 4.7, count: 750 },
      cacherout: 'Rabbanout',
      priceRange: '₪₪',
    },
    {
      _id: '2',
      name: 'Machneyuda',
      description: "L'ambiance électrique du marché Mahane Yehuda dans votre assiette.",
      coverImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2874',
      address: { city: 'Jérusalem', street: 'Beit Yaakov 10' },
      rating: { average: 4.9, count: 450 },
      cacherout: 'Rabbanout',
      priceRange: '₪₪₪₪',
    },
  ],
  dishes: [
    {
      _id: '5',
      name: "Carpaccio d'Aubergine",
      image: 'https://images.unsplash.com/photo-1518779578993-ec3579fee397?q=80&w=2835',
      price: 48,
      rating: { average: 4.9, count: 180 },
      restaurant: { name: 'Machneyuda', city: 'Jérusalem' },
    },
  ],
  recipes: [
    {
      _id: '102',
      title: 'Shakshuka Verte',
      image: 'https://images.unsplash.com/photo-1590412200988-a436970781fa?q=80&w=2787',
      prepTime: 15,
      cookTime: 20,
      difficulty: 'facile',
      likes: ['a', 'b'],
      category: 'Petit-déjeuner',
      cacherout: 'Pareve',
      region: 'Tel Aviv',
    },
  ],
  recipeBooks: [
    {
      _id: '2',
      title: 'Tel Aviv Modern',
      coverImage: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2940',
      author: { firstName: 'Eyal', lastName: 'Shani' },
      theme: 'Moderne',
      rating: 4.7,
    },
  ],
};
