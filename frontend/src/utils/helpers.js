export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

export const formatTime = (minutes) => {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
};

export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const getImageUrl = (path) => {
  if (!path) return '/placeholder.jpg';
  if (path.startsWith('http') || path.startsWith('data:')) return path;
  return `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}${path}`;
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone) => {
  const re = /^[0-9]{10}$/;
  return re.test(phone.replace(/\s/g, ''));
};

export const formatPrice = (price) => {
  return new Intl.NumberFormat('he-IL', {
    style: 'currency',
    currency: 'ILS',
  }).format(price);
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

export const getErrorMessage = (error) => {
  if (error.response?.data?.error) {
    return error.response.data.error;
  }
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.message) {
    return error.message;
  }
  return 'Une erreur est survenue';
};

const localizedValues = {
  he: {
    All: 'הכל',
    Traditionnel: 'מסורתי',
    Moderne: 'מודרני',
    Desserts: 'קינוחים',
    Végétalien: 'טבעוני',
    Végétarien: 'צמחוני',
    Populaires: 'פופולריים',
    Nouveautés: 'חדשים',
    Populaire: 'פופולרי',
    Rapide: 'מהיר',
    Mehadrin: 'מהדרין',
    Rabbanout: 'רבנות',
    Israélien: 'ישראלי',
    Marché: 'שוק',
    Méditerranéen: 'ים תיכוני',
    Biblique: 'מקראי',
    Authentique: 'אותנטי',
    Viandes: 'בשרים',
    Poisson: 'דגים',
    Viande: 'בשר',
    Gastronomique: 'גורמה',
    Asiatique: 'אסייתי',
    Hôtel: 'מלון',
    Français: 'צרפתי',
    Tripolitain: 'טריפוליטאי',
    Irakien: 'עיראקי',
    Créatif: 'יצירתי',
    Arabe: 'ערבי',
    Branché: 'טרנדי',
    Chef: 'שף',
    Cocktails: 'קוקטיילים',
    Festif: 'חגיגי',
    Historique: 'היסטורי',
    Hummus: 'חומוס',
    Iconique: 'אייקוני',
    Incontournable: 'בלתי נמנע',
    Intime: 'אינטימי',
    Luxe: 'יוקרה',
    Légendaire: 'אגדי',
    Musique: 'מוזיקה',
    Pita: 'פיתה',
    Romantique: 'רומנטי',
    Rustique: 'רוסטי',
    Shawarma: 'שווארמה',
    Falafel: 'פלאפל',
    Terrasse: 'מרפסת',
    Vibrant: 'תוסס',
    Vins: 'יינות',
    Vivant: 'חי',
    Vue: 'נוף',
    Ambiance: 'אווירה',
    Business: 'עסקים',
    Élégant: 'אלגנטי',
    Végétal: 'צמחי',
    'Street Food': 'אוכל רחוב',
    'Petit-déjeuner': 'ארוחת בוקר',
    'Plat Principal': 'מנה עיקרית',
    Entrée: 'מנה ראשונה',
    Été: 'קיץ',
    Hiver: 'חורף',
    "Toute l'année": 'כל השנה',
    'Les Secrets de Jérusalem': 'הסודות של ירושלים',
    'Voyage culinaire dans la ville sainte': 'מסע קולינרי בעיר הקודש',
    'Une plongée fascinante dans les ruelles de la vieille ville, à la découverte des saveurs millénaires qui font vibrer Jérusalem.':
      'צלילה מרתקת לסמטאות העיר העתיקה, בעקבות טעמים עתיקים שמחיים את ירושלים.',
    'Tel Aviv Modern': 'תל אביב מודרנית',
    'La nouvelle cuisine israélienne': 'המטבח הישראלי החדש',
    'Explorez la scène culinaire vibrante de Tel Aviv, où tradition et innovation se rencontrent pour créer des plats uniques.':
      'גלו את הסצנה הקולינרית התוססת של תל אביב, שבה מסורת וחדשנות נפגשות ליצירת מנות ייחודיות.',
    'Pâtisseries du Shuk': 'מאפי השוק',
    'Douceurs et desserts': 'מתוקים וקינוחים',
    "Les meilleures recettes de pâtisseries inspirées des marchés d'Israël. Babka, Rugelach et autres délices sucrés.":
      'מתכוני המאפים הטובים ביותר בהשראת שווקי ישראל: בבקה, רוגלך ועוד פינוקים מתוקים.',
    'Vegan Israeli Kitchen': 'מטבח ישראלי טבעוני',
    'Plats végétaux gourmands': 'מנות צמחיות עשירות',
    "Découvrez comment la cuisine israélienne se prête merveilleusement bien à l'alimentation végétale, sans compromis sur le goût.":
      'גלו איך המטבח הישראלי מתאים באופן נפלא לתזונה צמחית, בלי להתפשר על הטעם.',
    'Shakshuka Royale': 'שקשוקה מלכותית',
    'Sabich Deluxe': 'סביח דלוקס',
    'Hummus Bassar': 'חומוס בשר',
    'Falafel Doré': 'פלאפל זהוב',
    "Carpaccio d'Aubergine": 'קרפצ׳יו חציל',
    'Shawarma Agneau': 'שווארמה טלה',
    'Croissant Foie Gras': 'קרואסון כבד אווז',
    'Tartare de Thon Épicé': 'טרטר טונה פיקנטי',
    'Polenta aux Champignons': 'פולנטה פטריות',
    'Maqluba au Poulet': 'מקלובה עוף',
    'Filet de Bar': 'פילה לברק',
    'Canard Laqué aux Figues': 'ברווז מזוגג בתאנים',
    'Côte de Veau': 'צלע עגל',
    'Chef Pâtissière': 'שף קונדיטורית',
    'Restaurateur à Tel Aviv': 'מסעדן בתל אביב',
    'Exploratrice Culinaire': 'חוקרת קולינרית',
    'Shakshuka Traditionnelle': 'שקשוקה מסורתית',
    'Hummus Maison': 'חומוס ביתי',
    'Falafel Croustillant': 'פלאפל פריך',
    'Sabich Authentique': 'סביח אותנטי',
    Mizlala: 'מזללה',
    Machneyuda: 'מחניודה',
    Eucalyptus: 'אקליפטוס',
    'Herbert Samuel': 'הרברט סמואל',
    Darya: 'דריה',
    '1868': '1868',
    'Dr Shakshuka': 'ד״ר שקשוקה',
    'Sabich Frishman': 'סביח פרישמן',
    'Abu Hassan': 'אבו חסן',
    HaKosem: 'הקוסם',
    Miznon: 'מזנון',
    Jérusalem: 'ירושלים',
    'Kasher Mehadrin': 'כשר מהדרין',
    'Kasher Rabbanout': 'כשר רבנות',
    'Haute Cuisine Israélienne': 'בישול ישראלי גבוה',
    'Fusion Méditerranéenne Créative': 'פיוז׳ן ים תיכוני יצירתי',
    'Saveurs Bibliques Authentiques': 'טעמים מקראיים אותנטיים',
    'Cuisine française authentique au cœur de Tel Aviv.': 'מטבח צרפתי אותנטי בלב תל אביב.',
    'Solutions informatiques pour entreprises.': 'פתרונות מחשוב לעסקים.',
    'Le Petit Bistro': 'הביסטרו הקטן',
    'Tech Solutions': 'טק סולושנס',
  },
  en: {
    All: 'All',
    Traditionnel: 'Traditional',
    Moderne: 'Modern',
    Desserts: 'Desserts',
    Végétalien: 'Vegan',
    Végétarien: 'Vegetarian',
    Populaires: 'Popular',
    Nouveautés: 'New Arrivals',
    Populaire: 'Popular',
    Rapide: 'Fast',
    Mehadrin: 'Mehadrin',
    Rabbanout: 'Rabbanut',
    Israélien: 'Israeli',
    Marché: 'Market',
    Méditerranéen: 'Mediterranean',
    Biblique: 'Biblical',
    Authentique: 'Authentic',
    Viandes: 'Meats',
    Poisson: 'Fish',
    Viande: 'Meat',
    Gastronomique: 'Gourmet',
    Asiatique: 'Asian',
    Hôtel: 'Hotel',
    Français: 'French',
    Tripolitain: 'Tripolitan',
    Irakien: 'Iraqi',
    Créatif: 'Creative',
    Arabe: 'Arabic',
    Branché: 'Trendy',
    Chef: 'Chef',
    Cocktails: 'Cocktails',
    Festif: 'Festive',
    Historique: 'Historic',
    Hummus: 'Hummus',
    Iconique: 'Iconic',
    Incontournable: 'Must-visit',
    Intime: 'Intimate',
    Luxe: 'Luxury',
    Légendaire: 'Legendary',
    Musique: 'Music',
    Pita: 'Pita',
    Romantique: 'Romantic',
    Rustique: 'Rustic',
    Shawarma: 'Shawarma',
    Falafel: 'Falafel',
    Terrasse: 'Terrace',
    Vibrant: 'Vibrant',
    Vins: 'Wines',
    Vivant: 'Lively',
    Vue: 'View',
    Ambiance: 'Atmosphere',
    Business: 'Business',
    Élégant: 'Elegant',
    Végétal: 'Plant-based',
    'Street Food': 'Street Food',
    'Petit-déjeuner': 'Breakfast',
    'Plat Principal': 'Main Course',
    Entrée: 'Starter',
    Été: 'Summer',
    Hiver: 'Winter',
    "Toute l'année": 'All year round',
    'Shakshuka Traditionnelle': 'Traditional Shakshuka',
    'Hummus Maison': 'Homemade Hummus',
    'Falafel Croustillant': 'Crispy Falafel',
    'Sabich Authentique': 'Authentic Sabich',
    Mizlala: 'Mizlala',
    Machneyuda: 'Machneyuda',
    Eucalyptus: 'Eucalyptus',
    'Herbert Samuel': 'Herbert Samuel',
    Darya: 'Darya',
    '1868': '1868',
    'Dr Shakshuka': 'Dr Shakshuka',
    'Sabich Frishman': 'Sabich Frishman',
    'Abu Hassan': 'Abu Hassan',
    HaKosem: 'HaKosem',
    Miznon: 'Miznon',
    'Shawarma Agneau': 'Lamb Shawarma',
    Jérusalem: 'Jerusalem',
    'Kasher Mehadrin': 'Kasher Mehadrin',
    'Kasher Rabbanout': 'Kasher Rabbanut',
    'Haute Cuisine Israélienne': 'Israeli Haute Cuisine',
    'Fusion Méditerranéenne Créative': 'Creative Mediterranean Fusion',
    'Saveurs Bibliques Authentiques': 'Authentic Biblical Flavors',
    'Côte de Veau': 'Veal Chop',
    'Chef Pâtissière': 'Pastry Chef',
    'Restaurateur à Tel Aviv': 'Restaurateur in Tel Aviv',
    'Exploratrice Culinaire': 'Culinary Explorer',
    'Cuisine française authentique au cœur de Tel Aviv.':
      'Authentic French cuisine in the heart of Tel Aviv.',
    'Solutions informatiques pour entreprises.': 'IT solutions for businesses.',
    'Le Petit Bistro': 'The Little Bistro',
    'Tech Solutions': 'Tech Solutions',
  },
};

export const localizeValue = (value, language) => {
  const lang = language?.split('-')[0];
  return localizedValues[lang]?.[value] || value;
};
