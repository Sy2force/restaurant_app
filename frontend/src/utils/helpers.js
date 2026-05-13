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
    1868: '1868',
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
    Fusion: 'פיוז׳ן',
    'Pas cher': 'זול',
    'Cave à vin': 'מרתף יין',
    'Une expérience culinaire moderne signée par le chef Meir Adoni. Une fusion audacieuse mariant les saveurs intenses du Moyen-Orient aux techniques de la haute cuisine européenne.':
      'חוויה קולינרית מודרנית בחתימת השף מאיר אדוני. פיוז׳ן נועז המשלב את טעמי המזרח התיכון עם טכניקות המטבח הגבוה האירופי.',
    "L'effervescence du marché Mahane Yehuda transposée dans l'assiette. Une atmosphère électrique, une cuisine débridée et créative préparée sous vos yeux.":
      'התחדשות של שוק מחנה יהודה בצלחת. אווירה חשמלית, מטבח פרוע ויצירתי המוכן מתחת לעיניך.',
    'Une cuisine biblique réinterprétée avec modernité. Le chef Moshe Basson sublime les herbes sauvages et plantes indigènes des collines de Jérusalem.':
      'מטבח מקראי מפורש מחדש במודרניות. השף משה בסון מעלה את העשבי הבר והצמחים המקומיים של גבעות ירושלים.',
    "Restaurant gastronomique casher offrant une vue imprenable sur la mer. Une carte célébrant la fraîcheur des produits locaux, poissons et viandes d'exception.":
      'מסעדה גורמה כשרה המציעה נוף מרהיב על הים. תפריט החוגג את טריות המוצרים המקומיים, דגים ובשרים יוצאי דופן.',
    "Une odyssée culinaire sur la Route de la Soie. Une fusion magistrale entre les cuisines d'Asie centrale et méditerranéenne au Hilton Tel Aviv.":
      'מסע קולינרי על דרך המשי. פיוז׳ן מרשים בין המטבחים של מרכז אסיה לים התיכון בהילטון תל אביב.',
    'La haute gastronomie dans un bâtiment historique aux voûtes de pierre. Une expérience intime où les techniques françaises subliment le terroir de Jérusalem.':
      'בישול גבוה בבניין היסטורי עם קמרונות אבן. חוויה אינטימית שבה טכניקות צרפתיות מעלים את הטרואר של ירושלים.',
    "Le spécialiste incontesté de la Shakshuka à Jaffa. Une cuisine authentique tripolitaine servie dans un cadre rustique rempli d'antiquités.":
      'המומחה הבלתי ערער של השקשוקה ביפו. מטבח טריפוליטאי אותנטי המוגש בסביבה רוסטית מלאה בעתיקות.',
    "Une échoppe légendaire au cœur de Tel Aviv, connue pour servir le meilleur Sabich de la ville. Une file d'attente qui en vaut la peine.":
      'חנות אגדית בלב תל אביב, הידועה בהגשת הסביח הטוב בעיר. תור ששווה לחכות לו.',
    'Le temple du hummus à Jaffa. Une institution familiale qui sert le hummus le plus crémeux et authentique, une référence depuis plus de 40 ans.':
      'מקדש החומוס ביפו. מוסד משפחתי המגיש את החומוס הקרמי והאותנטי ביותר, מודל למעלה מ-40 שנה.',
    'Le "Magicien" du falafel. Une adresse moderne et vibrante qui a élevé le falafel au rang d\'art culinaire. Service rapide et souriant.':
      '"הקוסם" של הפלאפל. כתובת מודרנית ותוססת שהעלתה את הפלאפל לדרגת אמנות קולינרית. שירות מהיר וחיוך.',
    "La street food revisitée par le chef Eyal Shani. Des pitas moelleuses garnies d'ingrédients rôtis, servies dans une ambiance survoltée.":
      'אוכל רחוב בגרסת השף איל שני. פיתות רכות ממולאות במרכיבים קלויים, מוגשות באווירה סועפת.',
    'Œufs fermiers pochés dans une compotée de tomates fraîches, poivrons rouges et oignons caramélisés, relevée au paprika fumé. Servie avec pain challah artisanal.':
      'ביצים חקלאיות מבושלות בקומפוטה של עגבניות טריות, פלפלים אדומים ובצל קרמל, מתובל בפפריקה מעושן. מוגש עם לחם חלה ארטיזנלי.',
    "L'alliance parfaite : aubergines fondantes, œufs durs marinés, pommes de terre rissolées, salade israélienne croquante et sauce amba onctueuse dans une pita moelleuse.":
      'השילוב המושלם: חצילים מותכים, ביצים קשה מומלחים, תפוחי אדמה מטוגנים, סלט ישראלי פריך ורוטב עמבה קטיפ בפיתה רכה.',
    "L'authentique hummus crémeux de Jaffa, couronné de bœuf haché épicé aux pignons de pin torréfiés, arrosé d'huile d'olive de Galilée et persil frais.":
      'החומוס הקרמי והאותנטי של יפו, מוכתר בבשר טחון מתובל עם צנוברים קלויים, מפוזר בשמן זית הגליל ופטרוזלי טרי.',
    'Boulettes de pois chiches croustillantes aux herbes fraîches, accompagnées de tahini velouté, sauce piquante zhug et pickles maison.':
      'כדורי חומוס פריכים עם עשבי תבלים טריים, מלווים בטחינה חלקה, רוטב חריף זהוג וחמוצים ביתיים.',
    'Aubergine brûlée à la flamme, servie avec tahini brut, silan (miel de dattes), pistaches concassées, graines de grenade et fleur de sel.':
      'חציל חרוף באש, מוגש עם טחינה גולמי, סילן (דבש תמרים), פיסטוקים חתוכים, גרעיני רימון ופלח מלח.',
    "Fines tranches d'agneau marinées aux épices orientales, grillées à la broche, servies dans une laffa chaude avec hummus, tehina et salade de chou.":
      'פרוסות דקות של טלה מומלח בתבלים מזרחיות, צלויות על שיפוד, מוגשות בלאפה חמה עם חומוס, טחינה וסלט כרוב.',
    "Un croissant pur beurre fait maison, croustillant et doré, garni d'une escalope de foie gras poêlée et d'un confit de figues violettes.":
      'קרואסון חמאה טהור ביתי, פריך ומוזהב, ממולא בשניצל כבד אווז מטוגן ובקונפיט של תאנים סגולים.',
    "Thon rouge de Méditerranée coupé au couteau, assaisonné de piment frais, coriandre et citron vert, dressé sur un lit d'avocat crémeux.":
      'טונה אדום מהים התיכון חתוך בסכין, מתובל בפלפל טרי, כוסברה וליים, מוגש על מצע של אבוקדו קרמי.',
    "La célèbre polenta crémeuse servie en bocal, agrémentée d'un ragoût de champignons sauvages, copeaux de parmesan affiné et huile de truffe noire.":
      "הפולנטה הקרמית המפורסמת המוגשת בצנצת, מעוטרת בראגו פטריות בר, צ'יפס פרמזן מיושן ושמן כמהין שחור.",
    'Le plat de fête par excellence : une tour renversée de riz parfumé aux épices, légumes rôtis et morceaux de poulet tendre, servie avec des amandes grillées.':
      'מנת החג המושלמת: מגדל הפוך של אורז מבושמ בתבלים, ירקות קלויים וחתיכות עוף רכות, מוגש עם שקדים קלויים.',
    'Filet de bar frais grillé sur peau croustillante, servi avec une purée de pommes de terre au beurre et des légumes de saison glacés.':
      'פילה לברק טרי צלוי על עור פריך, מוגש עם פירה מתפוחי אדמה בחמאה וירקות עונה קפואים.',
    "Magret de canard cuit à la perfection, laqué d'une réduction soja et miel, accompagné de figues rôties et d'une mousseline de céleri.":
      'מגרט ברווז מבושל לשלמות, מצופה ברדוקציה של סויה ודבש, מלווה בתאנים קלויים ומוסלין סלרי.',
    "L'ambiance électrique du marché Mahane Yehuda.": 'האווירה החשמלית של שוק מחנה יהודה.',
    'Une expérience culinaire moderne signée par le chef Meir Adoni.':
      'חוויה קולינרית מודרנית בחתימת השף מאיר אדוני.',
    'Une cuisine biblique interprétée avec modernité.': 'מטבח מקראי מפורש מחדש במודרניות.',
    Herzliya: 'הרצליה',
    'Tel Aviv': 'תל אביב',
    'Vue Mer': 'נוף לים',
    'Pain challah artisanal': 'לחם חלה ארטיזנלי',
    'Pommes de terre rissolées': 'תפוחי אדמה מטוגנים',
    'Salade israélienne croquante': 'סלט ישראלי פריך',
    'Sauce amba onctueuse': 'רוטב עמבה קטיפ',
    "Huile d'olive de Galilée": 'שמן זית הגליל',
    'Pignons de pin torréfiés': 'צנוברים קלויים',
    'Persil frais': 'פטרוזלי טרי',
    'Boulettes de pois chiches': 'כדורי חומוס',
    'Sauce piquante zhug': 'רוטב חריף זהוג',
    'Pickles maison': 'חמוצים ביתיים',
    'Tahini velouté': 'טחינה חלקה',
    'Tahini brut': 'טחינה גולמי',
    'Silan (miel de dattes)': 'סילן (דבש תמרים)',
    'Pistaches concassées': 'פיסטוקים חתוכים',
    'Graines de grenade': 'גרעיני רימון',
    'Fleur de sel': 'פלח מלח',
    'Épices orientales': 'תבלים מזרחיות',
    'Laffa chaude': 'לאפה חמה',
    'Salade de chou': 'סלט כרוב',
    'Croissant pur beurre': 'קרואסון חמאה טהור',
    'Escalope de foie gras poêlée': 'שניצל כבד אווז מטוגן',
    'Confit de figues violettes': 'קונפיט של תאנים סגולים',
    'Piment frais': 'פלפל טרי',
    'Citron vert': 'ליים',
    'Ragoût de champignons sauvages': 'ראגו פטריות בר',
    'Copeaux de parmesan affiné': "צ'יפס פרמזן מיושן",
    'Huile de truffe noire': 'שמן כמהין שחור',
    'Riz parfumé aux épices': 'אורז מבושם בתבלים',
    'Morceaux de poulet tendre': 'חתיכות עוף רכות',
    'Amandes grillées': 'שקדים קלויים',
    'Purée de pommes de terre au beurre': 'פירה מתפוחי אדמה בחמאה',
    'Légumes de saison glacés': 'ירקות עונה קפואים',
    'Réduction soja et miel': 'רדוקציה סויה ודבש',
    'Mousseline de céleri': 'מוסלין סלרי',
    "Une symphonie culinaire orchestrée par le chef Meir Adoni. Une fusion audacieuse où l'âme du Moyen-Orient rencontre la virtuosité de la haute cuisine européenne. Dans un cadre à la fois chic et vibrant, chaque assiette raconte une histoire de passion et de créativité.":
      'סימפוניה קולינרית בניצוח השף מאיר אדוני. פיוז׳ן נועז שבו נשמת המזרח התיכון פוגשת בווירטואוזיטה של המטבח הגבוה האירופי. בסביבה הן אלגנטית והן תוססת, כל מנה מספרת סיפור של תשוקה ויצירתיות.',
    "L'alliance sublime d'un croissant pur beurre maison, croustillant à souhait, et d'une escalope de foie gras poêlée, relevée par la douceur d'un confit de figues violettes.":
      'השילוב הנעלה של קרואסון חמאה טהור ביתי, פריך להפליא, ושל שניצל כבד אווז מטוגן, מודגש בעדינות של קונפיט תאנים סגולים.',
    "Thon rouge de Méditerranée d'une fraîcheur absolue, coupé au couteau, exalté par un piment frais et de la coriandre, dressé sur un lit d'avocat onctueux.":
      'טונה אדום מהים התיכון בטריות מוחלטת, חתוך בסכין, מוגבר בפלפל טרי וכוסברה, מוגש על מצע של אבוקדו קטיפ.',
    "L'âme vibrante du marché Mahane Yehuda capturée dans votre assiette. Une atmosphère électrique, une cuisine débridée et joyeuse, préparée sous vos yeux par une brigade de chefs passionnés au rythme de la musique.":
      'הנשמה התוססת של שוק מחנה יהודה לכוד בצלחת שלך. אווירה חשמלית, מטבח פרוע ושמח, מוכן מתחת לעיניך על ידי צוות שפים נלהבים בקצב המוזיקה.',
    "Le plat signature incontournable : une polenta crémeuse servie en bocal, couronnée d'un ragoût de champignons sauvages, de copeaux de parmesan et d'un trait d'huile de truffe envoûtante.":
      "המנת הדגל הבלתי נמנעת: פולנטה קרמית המוגשת בצנצת, מכובדת בראגו פטריות בר, צ'יפס פרמזן וטיפה של שמן כמהין משכר.",
    'Aubergine brûlée à la flamme vive, servie avec un tahini brut, du silan (miel de dattes), des pistaches croquantes, des graines de grenade et une pincée de fleur de sel.':
      'חציל חרוף באש חיה, מוגש עם טחינה גולמי, סילן (דבש תמרים), פיסטוקים פריכים, גרעיני רימון ופינק פלח מלח.',
    "Un voyage culinaire à travers les textes bibliques. Le chef Moshe Basson réinterprète avec modernité les herbes sauvages et les plantes indigènes des collines de Jérusalem pour raconter l'histoire millénaire de la terre d'Israël.":
      'מסע קולינרי דרך הטקסטים המקראיים. השף משה בסון מפרש מחדש במודרניות את העשבי הבר והצמחים המקומיים של גבעות ירושלים כדי לספר את ההיסטוריה האלפית של ארץ ישראל.',
    "Le plat de fête par excellence : une tour renversée spectaculaire de riz parfumé aux épices, légumes rôtis et morceaux de poulet tendre, parsemée d'amandes grillées.":
      'מנת החג המושלמת: מגדל הפוך מרהיב של אורז מבושם בתבלים, ירקות קלויים וחתיכות עוף רכות, מפוזר בשקדים קלויים.',
    "L'excellence gastronomique casher face à la mer. Une carte qui célèbre la fraîcheur absolue des produits locaux, des poissons de la pêche du jour aux viandes d'exception, dans un cadre élégant.":
      'מצוינות גורמה כשרה מול הים. תפריט החוגג את הטריות המוחלטת של המוצרים המקומיים, מדגי הדיג היומי ועד בשרים יוצאי דופן, בסביבה אלגנטית.',
    'Filet de bar frais saisi sur peau croustillante, accompagné dune purée de pommes de terre au beurre onctueuse et de légumes de saison glacés.':
      'פילה לברק טרי מטוגן על עור פריך, מלווה בפירה חמאה קטיפ וירקות עונה קפואים.',
    "Une odyssée culinaire envoûtante sur la Route de la Soie. Une fusion magistrale entre les cuisines d'Asie centrale et méditerranéenne, orchestrée dans le cadre luxueux de l'hôtel Hilton.":
      'מסע קולינרי מהפנט על דרך המשי. פיוז׳ן מרשים בין המטבחים של מרכז אסיה לים התיכון, המנוצח בסביבה המפוארת של מלון הילטון.',
    "Magret de canard cuit à la perfection, laqué d'une réduction soja et miel, sublimé par des figues rôties et une mousseline de céleri aérienne.":
      'מגרט ברווז מבושל לשלמות, מצופה ברדוקציה סויה ודבש, מועלה על ידי תאנים קלויות ומוסלין סלרי אוורירי.',
    "L'apogée de la gastronomie dans un écrin historique aux voûtes de pierre. Une expérience intime et raffinée où la technique française rencontre et sublime le terroir unique de Jérusalem.":
      'שיא הגורמה בגומחה היסטורית עם קמרונות אבן. חוויה אינטימית ומעודנת שבה הטכניקה הצרפתית פוגשת ומעלה את הטרואר הייחודי של ירושלים.',
    "Côte de veau d'une tendreté exceptionnelle, servie avec une purée de topinambours, une poêlée forestière de champignons sauvages et un jus corsé.":
      'צלע עגל ברכות יוצאת דופן, מוגשת עם פירה טופינמבור, פלטת יער של פטריות בר ורוטב עשיר.',
    "Le maître incontesté de la Shakshuka à Jaffa. Une cuisine tripolitaine authentique et généreuse, servie dans un cadre rustique unique, rempli d'histoire et d'antiquités.":
      'המומחה הבלתי ערער של השקשוקה ביפו. מטבח טריפוליטאי אותנטי ונדיב, המוגש בסביבה רוסטית ייחודית, מלאה בהיסטוריה ועתיקות.',
    "Œufs fermiers pochés doucement dans une compotée riche de tomates fraîches, poivrons rouges et oignons caramélisés, relevée d'une touche de paprika fumé.":
      'ביצים חקלאיות מבושלות בעדינות בקומפוטה עשירה של עגבניות טריות, פלפלים אדומים ובצל קרמל, מתובל במעט פפריקה מעושן.',
    "Une légende urbaine au cœur de Tel Aviv, célèbre pour servir le meilleur Sabich de la ville. Une pita garnie avec art qui vaut chaque minute d'attente.":
      'אגדה אורבנית בלב תל אביב, מפורסמת בהגשת הסביח הטוב בעיר. פיתה ממולאת באמנות ששווה כל דקת המתנה.',
    "L'équilibre parfait : aubergines frites fondantes, œuf dur, pommes de terre, salade fraîche et amba, le tout dans une pita moelleuse.":
      'האיזון המושלם: חצילים מטוגנים מותכים, ביצה קשה, תפוחי אדמה, סלט טרי ועמבה, הכל בפיתה רכה.',
    "Le temple sacré du hummus à Jaffa. Une institution familiale vénérée qui sert un hummus d'une onctuosité inégalée, véritable référence culinaire depuis plus de 40 ans.":
      'המקדש הקדוש של החומוס ביפו. מוסד משפחתי מכובד המגיש חומוס בקטיפות בלתי משוערת, מודל קולינרי מעל ל-40 שנה.',
    'Hummus crémeux et tiède, couronné de viande hachée épicée et de pignons grillés croquants.':
      'חומוס קרמי וחם, מוכתר בבשר טחון מתובל ובצנוברים קלויים פריכים.',
    'Le "Magicien" du falafel qui a conquis Tel Aviv. Une adresse moderne et vibrante qui a élevé le falafel au rang d\'art culinaire, avec un service rapide, généreux et toujours souriant.':
      '"הקוסם" של הפלאפל שכבש את תל אביב. כתובת מודרנית ותוססת שהעלתה את הפלאפל לדרגת אמנות קולינרית, עם שירות מהיר, נדיב ותמיד חיוך.',
    "Boulettes de falafel dorées et croustillantes, gorgées d'herbes fraîches et d'épices, servies chaudes.":
      'כדורי פלאפל מוזהבים ופריכים, ספוגים בעשבי תבלים טריים ותבלינים, מוגשים חמים.',
    "La street food réinventée par le visionnaire Eyal Shani. Des pitas moelleuses garnies d'ingrédients rôtis à la perfection, servies dans une ambiance survoltée et festive.":
      'אוכל רחוב מומצא על ידי החזון איל שני. פיתות רכות ממולאות במרכיבים קלויים לשלמות, מוגשות באווירה סועפת וחגיגית.',
    "Shawarma d'agneau juteux, grillé à la perfection, servi dans une pita avec tehina, tomates et herbes fraîches.":
      'שווארמה טלה עסיסית, צלויה לשלמות, מוגשת בפיתה עם טחינה, עגבניות ועשבי תבלים טריים.',
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
    1868: '1868',
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
  if (value == null) return '';
  const lang = language?.split('-')[0] || 'fr';

  // Handle multilingual object { fr, en, he }
  if (typeof value === 'object' && !Array.isArray(value)) {
    if (typeof value[lang] === 'string' && value[lang]) return value[lang];
    if (typeof value.fr === 'string' && value.fr) return value.fr;
    if (typeof value.en === 'string' && value.en) return value.en;
    if (typeof value.he === 'string' && value.he) return value.he;
    const first = Object.values(value).find((v) => typeof v === 'string' && v);
    return first || '';
  }

  // String → look up in shared dictionary, fallback to original
  return localizedValues[lang]?.[value] || value;
};
