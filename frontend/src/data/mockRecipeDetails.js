export const mockRecipeDetails = {
  1: {
    _id: '1',
    title: 'Challah du Shabbat',
    description:
      'Le pain tressé traditionnel du Shabbat, à la mie filante et moelleuse, et à la croûte dorée. Une recette héritée de ma grand-mère, parfaite pour célébrer le jour du repos.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2942',
    prepTime: 45,
    cookTime: 35,
    servings: 2, // 2 pains
    difficulty: 'Moyen',
    author: {
      name: 'Chef Miriam Cohen',
      image: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=2800',
    },
    ingredients: [
      { item: 'Farine T55', amount: '1', unit: 'kg' },
      { item: 'Levure boulangère sèche', amount: '2', unit: 'c.à.s' },
      { item: 'Sucre', amount: '100', unit: 'g' },
      { item: 'Eau tiède', amount: '350', unit: 'ml' },
      { item: 'Oeufs', amount: '2', unit: 'pièces' },
      { item: 'Huile végétale', amount: '120', unit: 'ml' },
      { item: 'Sel', amount: '1', unit: 'c.à.s' },
      { item: 'Graines de sésame', amount: '2', unit: 'c.à.s' },
    ],
    instructions: [
      {
        step: 1,
        text: "Dans un grand bol, mélanger la levure, une cuillère de sucre et l'eau tiède. Laisser reposer 10 minutes jusqu'à ce que le mélange mousse.",
      },
      {
        step: 2,
        text: "Ajouter le reste du sucre, le sel, l'huile et les œufs (en garder un peu pour la dorure si désiré). Mélanger vigoureusement.",
      },
      {
        step: 3,
        text: "Incorporer la farine progressivement en pétrissant jusqu'à obtenir une pâte souple, lisse et non collante (environ 10-12 minutes).",
      },
      {
        step: 4,
        text: "Couvrir d'un linge humide et laisser lever 1h30 à 2h dans un endroit tiède, jusqu'à ce que la pâte double de volume.",
      },
      {
        step: 5,
        text: 'Dégazer la pâte, la diviser en 6 boudins égaux et tresser deux pains (3 brins chacun).',
      },
      {
        step: 6,
        text: "Laisser lever à nouveau 45 minutes. Badigeonner d'œuf battu et saupoudrer de sésame. Enfourner à 180°C pendant 30-35 minutes jusqu'à belle coloration.",
      },
    ],
    tags: ['Boulangerie', 'Shabbat', 'Traditionnel', 'Parve'],
  },
  2: {
    _id: '2',
    title: 'Couscous Israélien aux Légumes',
    description:
      'Aussi appelé Ptitim, ce couscous perlé est sauté avec des oignons caramélisés, des petits légumes croquants et des herbes fraîches pour un accompagnement coloré et savoureux.',
    image: 'https://images.unsplash.com/photo-1644365319888-59c44510b656?q=80&w=2864',
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    difficulty: 'Facile',
    author: {
      name: 'Chef Ronen',
      image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=2777',
    },
    ingredients: [
      { item: 'Couscous israélien (Ptitim)', amount: '250', unit: 'g' },
      { item: 'Oignon', amount: '1', unit: 'pièce' },
      { item: 'Bouillon de légumes', amount: '500', unit: 'ml' },
      { item: 'Courgette', amount: '1', unit: 'pièce' },
      { item: 'Carotte', amount: '1', unit: 'pièce' },
      { item: 'Persil frais', amount: '1', unit: 'botte' },
      { item: "Huile d'olive", amount: '2', unit: 'c.à.s' },
    ],
    instructions: [
      {
        step: 1,
        text: "Faire revenir l'oignon finement émincé dans l'huile d'olive jusqu'à ce qu'il soit translucide et doré.",
      },
      {
        step: 2,
        text: "Ajouter le couscous israélien et le faire toscaner 2-3 minutes en remuant constamment pour qu'il dore légèrement.",
      },
      {
        step: 3,
        text: 'Incorporer les légumes coupés en petits dés (brunoise) et verser le bouillon chaud.',
      },
      {
        step: 4,
        text: "Couvrir et laisser mijoter à feu doux pendant 8-10 minutes jusqu'à absorption complète du liquide et tendreté des perles.",
      },
      {
        step: 5,
        text: 'Éteindre le feu, ajouter le persil ciselé, égrener à la fourchette et servir immédiatement.',
      },
    ],
    tags: ['Accompagnement', 'Rapide', 'Enfants', 'Végétalien'],
  },
  3: {
    _id: '3',
    title: 'Baklava Maison',
    description:
      "Des couches croustillantes de pâte phyllo beurrée, garnies d'un mélange généreux de noix et pistaches, le tout imbibé d'un sirop parfumé à l'eau de fleur d'oranger ou de rose.",
    image: 'https://images.unsplash.com/photo-1565977935492-35d64e9c7456?q=80&w=2940',
    prepTime: 40,
    cookTime: 45,
    servings: 12,
    difficulty: 'Difficile',
    author: {
      name: 'Chef Sarah Levi',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2776',
    },
    ingredients: [
      { item: 'Pâte phyllo', amount: '1', unit: 'paquet' },
      { item: 'Beurre clarifié (ou margarine)', amount: '200', unit: 'g' },
      { item: 'Pistaches non salées', amount: '200', unit: 'g' },
      { item: 'Noix', amount: '200', unit: 'g' },
      { item: 'Cannelle', amount: '1', unit: 'c.à.c' },
      { item: 'Sucre', amount: '300', unit: 'g' },
      { item: 'Eau', amount: '300', unit: 'ml' },
      { item: 'Eau de rose', amount: '1', unit: 'c.à.s' },
    ],
    instructions: [
      {
        step: 1,
        text: "Préparer le sirop : porter l'eau et le sucre à ébullition. Laisser mijoter 10 min jusqu'à légère consistance. Ajouter l'eau de rose hors du feu et laisser refroidir complètement.",
      },
      {
        step: 2,
        text: 'Mixer grossièrement les pistaches et les noix avec la cannelle dans un robot.',
      },
      {
        step: 3,
        text: 'Beurrer un plat rectangulaire. Superposer la moitié des feuilles de phyllo en badigeonnant chaque feuille de beurre fondu.',
      },
      {
        step: 4,
        text: 'Étaler uniformément le mélange de noix. Recouvrir avec le reste des feuilles de phyllo, toujours en beurrant entre chaque couche.',
      },
      {
        step: 5,
        text: "À l'aide d'un couteau bien aiguisé, couper en losanges ou carrés avant la cuisson. Enfourner à 170°C pour 45-50 min jusqu'à belle coloration dorée.",
      },
      {
        step: 6,
        text: 'Verser immédiatement le sirop froid sur le baklava brûlant dès la sortie du four (le choc thermique est crucial). Laisser reposer au moins 4h avant de déguster.',
      },
    ],
    tags: ['Dessert', 'Festif', 'Sucré', 'Moyen-Orient'],
  },
  101: {
    _id: '101',
    title: 'Hummus Royal aux Pignons',
    description:
      "La recette ultime du hummus : ultra crémeux, servi tiède, surmonté de pignons de pin torréfiés et d'un filet d'huile d'olive de qualité supérieure.",
    image: 'https://images.unsplash.com/photo-1637949385162-e416fb15b2ce?q=80&w=2787',
    prepTime: 30,
    cookTime: 60,
    servings: 6,
    difficulty: 'Moyen',
    author: {
      name: 'Chef Yotam Ottolenghi',
      image: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=2800',
    },
    ingredients: [
      { item: 'Pois chiches secs (petits)', amount: '250', unit: 'g' },
      { item: 'Tahini brut de qualité', amount: '200', unit: 'g' },
      { item: 'Jus de citron frais', amount: '4', unit: 'c.à.s' },
      { item: 'Ail', amount: '2', unit: 'gousses' },
      { item: 'Bicarbonate de soude', amount: '1', unit: 'c.à.c' },
      { item: 'Eau glacée', amount: '100', unit: 'ml' },
      { item: 'Pignons de pin', amount: '50', unit: 'g' },
      { item: "Huile d'olive", amount: '4', unit: 'c.à.s' },
    ],
    instructions: [
      {
        step: 1,
        text: "Faire tremper les pois chiches la veille dans un grand volume d'eau froide.",
      },
      {
        step: 2,
        text: "Égoutter, mélanger avec le bicarbonate et cuire à feu vif 3 min en remuant. Ajouter l'eau et cuire 30-40 min jusqu'à ce qu'ils soient très tendres et s'écrasent facilement.",
      },
      { step: 3, text: 'Égoutter et mixer les pois chiches encore chauds en purée lisse.' },
      {
        step: 4,
        text: "Ajouter le tahini, le jus de citron, l'ail écrasé et le sel. Mixer en ajoutant l'eau glacée petit à petit pour obtenir une texture très crémeuse et blanche.",
      },
      {
        step: 5,
        text: "Servir dans une assiette creuse, arroser généreusement d'huile d'olive et garnir de pignons grillés.",
      },
    ],
    tags: ['Classique', 'Végétarien', 'Sans Gluten', 'Entrée'],
  },
  102: {
    _id: '102',
    title: 'Shakshuka Verte',
    description:
      "Une variante printanière de la shakshuka : une poêlée d'épinards, blettes et herbes fraîches, parsemée de feta émiettée et d'œufs coulants.",
    image: 'https://images.unsplash.com/photo-1623855244697-5253b5e2275f?q=80&w=2787',
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    difficulty: 'Facile',
    author: {
      name: 'Chef Yotam Ottolenghi',
      image: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=2800',
    },
    ingredients: [
      { item: 'Épinards frais', amount: '300', unit: 'g' },
      { item: 'Blettes (vert et côtes)', amount: '200', unit: 'g' },
      { item: 'Oignons nouveaux', amount: '4', unit: 'pièces' },
      { item: 'Ail', amount: '2', unit: 'gousses' },
      { item: 'Oeufs', amount: '4', unit: 'pièces' },
      { item: 'Feta', amount: '100', unit: 'g' },
      { item: 'Crème fraîche', amount: '2', unit: 'c.à.s' },
    ],
    instructions: [
      {
        step: 1,
        text: "Faire revenir les oignons émincés et l'ail dans une poêle. Ajouter les côtes de blettes coupées et cuire 5 min.",
      },
      {
        step: 2,
        text: 'Ajouter les épinards et le vert des blettes, laisser tomber (réduire). Incorporer la crème et assaisonner.',
      },
      {
        step: 3,
        text: 'Former 4 petits puits dans la verdure et casser délicatement un œuf dans chaque trou.',
      },
      {
        step: 4,
        text: "Parsemer de feta émiettée autour des œufs. Couvrir et laisser cuire à feu moyen jusqu'à ce que les blancs soient pris mais les jaunes encore coulants.",
      },
    ],
    tags: ['Petit-déjeuner', 'Végétarien', 'Healthy'],
  },
  103: {
    _id: '103',
    title: 'Babka au Chocolat',
    description:
      "La fameuse brioche torsadée de New York et Jérusalem. Une pâte levée riche garnie d'une ganache au chocolat noir et noisettes, recouverte d'un sirop de sucre à la sortie du four.",
    image: 'https://images.unsplash.com/photo-1606101275249-14a584022204?q=80&w=2942',
    prepTime: 45,
    cookTime: 40,
    servings: 8,
    difficulty: 'Difficile',
    author: {
      name: 'Chef Yotam Ottolenghi',
      image: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=2800',
    },
    ingredients: [
      { item: 'Farine à pain', amount: '500', unit: 'g' },
      { item: 'Sucre en poudre', amount: '100', unit: 'g' },
      { item: 'Beurre doux', amount: '150', unit: 'g' },
      { item: 'Chocolat noir 70%', amount: '200', unit: 'g' },
      { item: 'Noisettes torréfiées', amount: '100', unit: 'g' },
    ],
    instructions: [
      {
        step: 1,
        text: 'Préparer la pâte à brioche la veille et la laisser reposer au frais toute la nuit.',
      },
      {
        step: 2,
        text: 'Étaler la pâte en rectangle, tartiner généreusement de la garniture chocolat-beurre fondus et parsemer de noisettes concassées.',
      },
      {
        step: 3,
        text: 'Rouler la pâte en un boudin serré. Couper le boudin en deux dans la longueur pour exposer les strates.',
      },
      {
        step: 4,
        text: 'Torsader les deux brins ensemble et placer dans un moule à cake. Laisser lever 1h puis cuire 35-40 min à 180°C. Badigeonner de sirop dès la sortie.',
      },
    ],
    tags: ['Dessert', 'Chocolat', 'Boulangerie'],
  },
  201: {
    _id: '201',
    title: 'Salade de Grenades',
    description:
      'Une salade vibrante et rafraîchissante, parfaite pour accompagner les plats riches. Les grains de grenade apportent une explosion de saveur acidulée.',
    image: 'https://images.unsplash.com/photo-1628108422449-31f472251fb7?q=80&w=2940',
    prepTime: 15,
    cookTime: 0,
    servings: 4,
    difficulty: 'Facile',
    author: {
      name: 'Chef Yotam Ottolenghi',
      image: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=2800',
    },
    ingredients: [
      { item: 'Grenade', amount: '1', unit: 'pièce' },
      { item: 'Concombre', amount: '2', unit: 'pièces' },
      { item: 'Tomates cerises', amount: '200', unit: 'g' },
      { item: 'Menthe fraîche', amount: '1', unit: 'botte' },
      { item: 'Oignon rouge', amount: '0.5', unit: 'pièce' },
    ],
    instructions: [
      { step: 1, text: 'Égrainer la grenade soigneusement.' },
      {
        step: 2,
        text: 'Couper les concombres et les tomates en petits dés uniformes. Ciseler la menthe.',
      },
      {
        step: 3,
        text: "Mélanger délicatement tous les ingrédients avec une vinaigrette à l'huile d'olive, jus de citron et sumac.",
      },
    ],
    tags: ['Salade', 'Frais', 'Végétarien'],
  },
  202: {
    _id: '202',
    title: 'Aubergines Brûlées',
    description:
      "La quintessence de la cuisine israélienne : l'aubergine brûlée entière pour un goût fumé incomparable, servie simplement avec de l'ail, du citron et du tahini.",
    image: 'https://images.unsplash.com/photo-1572448862529-6017b3531583?q=80&w=2835',
    prepTime: 20,
    cookTime: 40,
    difficulty: 'Moyen',
    category: 'Plat Principal',
    cacherout: 'Pareve',
    region: 'Tel Aviv',
  },
  203: {
    _id: '203',
    title: 'Riz aux Lentilles (Mejadra)',
    description:
      "Un plat réconfortant de riz et lentilles mijotés ensemble avec des épices douces (cumin, cannelle) et garnis d'oignons frits croustillants.",
    image: 'https://images.unsplash.com/photo-1640854407865-c3f25c276326?q=80&w=2787',
    prepTime: 10,
    cookTime: 30,
    difficulty: 'Facile',
    category: 'Accompagnement',
    cacherout: 'Pareve',
    region: 'Jérusalem',
  },
};
