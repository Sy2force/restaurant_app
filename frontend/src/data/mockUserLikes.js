export const mockUserLikes = {
  dishes: [
    {
      _id: '701',
      name: 'Shakshuka Royale',
      image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=2787',
      price: 45,
      rating: { average: 4.8, count: 124 },
      restaurant: { name: 'Dr Shakshuka', city: 'Jaffa' },
    },
    {
      _id: '801',
      name: 'Sabich Deluxe',
      image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?q=80&w=2940',
      price: 38,
      rating: { average: 4.9, count: 250 },
      restaurant: { name: 'Sabich Frishman', city: 'Tel Aviv' },
    },
  ],
  recipes: [
    {
      _id: '101',
      title: 'Hummus Royal aux Pignons',
      image: 'https://images.unsplash.com/photo-1595855759920-86582396756a?q=80&w=2787',
      prepTime: 30,
      cookTime: 60,
      difficulty: 'moyen',
      likes: ['a', 'b', 'c'],
      category: 'Entrée',
      cacherout: 'Pareve',
      region: 'Jérusalem',
    },
  ],
  recipeBooks: [
    {
      _id: '1',
      title: 'Les Secrets de Jérusalem',
      coverImage: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=2788',
      author: { firstName: 'Yotam', lastName: 'Ottolenghi' },
      theme: 'Traditionnel',
      rating: 4.9,
    },
  ],
  communityPosts: [
    {
      _id: '1',
      description:
        'Mon premier pain de Shabbat ! Le tressage était un défi mais le résultat est tellement gratifiant.',
      photo: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2942',
      author: {
        firstName: 'Sarah',
        lastName: 'Levi',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256',
      },
      likes: ['1', '2'],
    },
  ],
};
