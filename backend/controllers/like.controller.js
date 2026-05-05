const Dish = require('../models/Dish');
const Recipe = require('../models/Recipe');
const RecipeBook = require('../models/RecipeBook');
const CommunityPost = require('../models/CommunityPost');

const TYPE_MAP = {
  dish: { Model: Dish, plural: 'dishes' },
  dishes: { Model: Dish, plural: 'dishes' },
  recipe: { Model: Recipe, plural: 'recipes' },
  recipes: { Model: Recipe, plural: 'recipes' },
  recipeBook: { Model: RecipeBook, plural: 'recipeBooks' },
  recipeBooks: { Model: RecipeBook, plural: 'recipeBooks' },
  'recipe-books': { Model: RecipeBook, plural: 'recipeBooks' },
  post: { Model: CommunityPost, plural: 'communityPosts' },
  posts: { Model: CommunityPost, plural: 'communityPosts' },
};

const resolve = (type) => TYPE_MAP[type] || null;

// POST /like/:type/:id - toggle like
exports.toggleLike = async (req, res) => {
  try {
    const { type, id } = req.params;
    const ref = resolve(type);
    if (!ref) return res.status(400).json({ message: 'Invalid type' });

    const doc = await ref.Model.findById(id);
    if (!doc) return res.status(404).json({ message: 'Resource not found' });

    if (!Array.isArray(doc.likes)) doc.likes = [];
    const userIdStr = req.userId.toString();
    const idx = doc.likes.findIndex((u) => u.toString() === userIdStr);

    let liked;
    if (idx >= 0) {
      doc.likes.splice(idx, 1);
      liked = false;
    } else {
      doc.likes.push(req.userId);
      liked = true;
    }
    await doc.save();

    res.json({ liked, likes: doc.likes.length });
  } catch (error) {
    res.status(500).json({ message: 'Error toggling like', error: error.message });
  }
};

// GET /like/check/:type/:id
exports.checkIfLiked = async (req, res) => {
  try {
    const { type, id } = req.params;
    const ref = resolve(type);
    if (!ref) return res.status(400).json({ message: 'Invalid type' });

    const doc = await ref.Model.findById(id).select('likes');
    if (!doc) return res.status(404).json({ message: 'Resource not found' });

    const userIdStr = req.userId.toString();
    const liked = (doc.likes || []).some((u) => u.toString() === userIdStr);
    res.json({ liked, likes: (doc.likes || []).length });
  } catch (error) {
    res.status(500).json({ message: 'Error checking like', error: error.message });
  }
};

// GET /like/user - all items liked by current user, grouped
exports.getUserLikes = async (req, res) => {
  try {
    const userId = req.userId;

    const [dishes, recipes, recipeBooks, communityPosts] = await Promise.all([
      Dish.find({ likes: userId }).populate('restaurantId', 'name city').lean(),
      Recipe.find({ likes: userId }).populate('bookId', 'title coverImage').lean(),
      RecipeBook.find({ likes: userId }).lean(),
      CommunityPost.find({ likes: userId }).populate('userId', 'name avatar').lean(),
    ]);

    res.json({
      dishes,
      recipes,
      recipeBooks,
      communityPosts,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user likes', error: error.message });
  }
};
