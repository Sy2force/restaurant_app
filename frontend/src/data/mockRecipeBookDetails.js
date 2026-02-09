export const mockRecipeBookDetails = {
  1: {
    _id: '1',
    title: 'Les Secrets de Jérusalem',
    subtitle: 'Voyage culinaire dans la ville sainte',
    description:
      'Une plongée fascinante dans les ruelles de la vieille ville, à la découverte des saveurs millénaires qui font vibrer Jérusalem. Ce livre rassemble les recettes les plus emblématiques, des petits-déjeuners traditionnels aux festins de Shabbat, en passant par les douceurs du marché.',
    author: 'Chef Yotam Ottolenghi',
    authorImage: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=2800',
    coverImage: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=2788',
    theme: 'Traditionnel',
    price: '29.99',
    rating: 4.9,
    publishedDate: '2024',
  },
  2: {
    _id: '2',
    title: 'Tel Aviv Modern',
    subtitle: 'La nouvelle cuisine israélienne',
    description:
      "Explorez la scène culinaire vibrante de Tel Aviv, où tradition et innovation se rencontrent pour créer des plats uniques. Des bars branchés aux tables gastronomiques, découvrez l'âme de la ville blanche.",
    author: 'Chef Eyal Shani',
    authorImage: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=2800',
    coverImage: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2940',
    theme: 'Moderne',
    price: '24.99',
    rating: 4.7,
    publishedDate: '2023',
  },
  3: {
    _id: '3',
    title: 'Pâtisseries du Shuk',
    subtitle: 'Douceurs et desserts',
    description:
      "Les meilleures recettes de pâtisseries inspirées des marchés d'Israël. Babka, Rugelach, Halva et autres délices sucrés à réaliser chez vous.",
    author: 'Chef Karin Goren',
    authorImage: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=2800',
    coverImage: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=2889',
    theme: 'Desserts',
    price: '19.99',
    rating: 4.8,
    publishedDate: '2023',
  },
  4: {
    _id: '4',
    title: 'Vegan Israeli Kitchen',
    subtitle: 'Plats végétaux gourmands',
    description:
      "Découvrez comment la cuisine israélienne se prête merveilleusement bien à l'alimentation végétale, sans compromis sur le goût. Des recettes saines, colorées et savoureuses.",
    author: 'Chef Ori Shavit',
    authorImage: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=2800',
    coverImage: 'https://images.unsplash.com/photo-1511690656952-34342d2c7135?q=80&w=2940',
    theme: 'Végétalien',
    price: '27.50',
    rating: 4.6,
    publishedDate: '2022',
  },
};

export const mockRecipesForBook = [
  {
    _id: '101',
    title: 'Hummus Royal aux Pignons',
    description:
      "La recette authentique du hummus crémeux, servi chaud avec des pignons grillés et de l'huile d'olive extra vierge.",
    image: 'https://images.unsplash.com/photo-1595855759920-86582396756a?q=80&w=2787',
    difficulty: 'Moyen',
    prepTime: 30,
    cookTime: 60,
    servings: 6,
  },
  {
    _id: '102',
    title: 'Shakshuka Verte',
    description: 'Une variante fraîche aux épinards, herbes fraîches et fromage feta.',
    image: 'https://images.unsplash.com/photo-1590412200988-a436970781fa?q=80&w=2787',
    difficulty: 'Facile',
    prepTime: 15,
    cookTime: 20,
    servings: 4,
  },
  {
    _id: '103',
    title: 'Babka au Chocolat',
    description:
      "Une brioche torsadée moelleuse garnie d'une riche pâte à tartiner au chocolat noir.",
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2942',
    difficulty: 'Difficile',
    prepTime: 45,
    cookTime: 40,
    servings: 8,
  },
];
