const store = require('../utils/store');

// @desc    Get products with filtering, search, pagination, and sorting
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res, next) => {
  try {
    const { petType, category, subCategory, breed, minPrice, maxPrice, search, sort, page = 1, limit = 12 } = req.query;

    const result = await store.getProducts({
      petType,
      category,
      subCategory,
      breed,
      minPrice,
      maxPrice,
      search,
      sort,
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    });

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Products retrieved successfully',
      data: result.products,
      meta: result.meta,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product by ID or Slug
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res, next) => {
  try {
    const product = await store.getProductById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: `Product with ID '${req.params.id}' was not found.`,
      });
    }

    const related = await store.getRelatedProducts(product.id || product._id, product.petType, 4);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Product retrieved successfully',
      data: {
        product,
        related,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
const getCategories = async (req, res, next) => {
  try {
    const categories = await store.getCategories();
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Categories retrieved successfully',
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get breeds (filtered by petType)
// @route   GET /api/breeds
// @access  Public
const getBreeds = async (req, res, next) => {
  try {
    const { petType } = req.query;
    const breeds = await store.getBreeds(petType);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Breeds retrieved successfully',
      data: breeds,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductById,
  getCategories,
  getBreeds,
};
