export const mockProfileUser = {
  _id: 'user1',
  name: 'Sarah Cohen',
  pseudo: 'sarah_cohen',
  email: 'sarah.cohen@example.com',
  role: 'user',
  location: 'Tel Aviv, Israël',
  joinedDate: 'Janvier 2023',
  followers: 1250,
  following: 150,
  bio: "Passionnée de cuisine israélienne traditionnelle et moderne. J'aime revisiter les classiques de ma grand-mère.",
  specialties: ['Boulangerie', 'Cuisine Familiale', 'Végétarien'],
  avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256',
  coverImage: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=2940',
  socials: {
    instagram: 'sarahcohen_food',
    website: 'www.sarah-kitchen.com',
  },
};

export const mockUserPosts = [
  {
    _id: '1',
    title: 'Délicieux pain Challah fait maison',
    description: 'Une recette de ma grand-mère...',
    photo: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2942',
    author: {
      _id: 'user1',
      firstName: 'Sarah',
      lastName: 'Cohen',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256',
    },
    likes: ['1', '2', '3'],
    comments: ['c1'],
    createdAt: new Date().toISOString(),
  },
  {
    _id: '3',
    title: 'Falafels maison',
    description: 'Falafels verts et croustillants...',
    photo: 'https://images.unsplash.com/photo-1593252719532-347b6c86f1a6?q=80&w=2787',
    author: {
      _id: 'user1',
      firstName: 'Sarah',
      lastName: 'Cohen',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256',
    },
    likes: ['1', '2', '3', '4', '5'],
    comments: ['c2'],
    createdAt: new Date().toISOString(),
  },
];
