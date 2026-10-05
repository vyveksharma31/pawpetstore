const store = require('../utils/store');

// @desc    Get administrative dashboard statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
const getStats = async (req, res, next) => {
  try {
    const stats = await store.getAdminStats();
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Admin metrics retrieved successfully',
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStats,
};
