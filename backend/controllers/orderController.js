const store = require('../utils/store');

// @desc    Create a new customer order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res, next) => {
  try {
    const { items, shippingAddress, paymentMethod, subtotal, shippingFee, tax, totalAmount } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Cannot place an empty order. Cart has no items.',
      });
    }

    if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.street || !shippingAddress.city || !shippingAddress.pincode) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Please provide a complete shipping address.',
      });
    }

    const orderData = {
      userId: req.user.id || req.user._id,
      customerName: req.user.name,
      customerEmail: req.user.email,
      items,
      shippingAddress,
      paymentMethod: paymentMethod || 'cod',
      subtotal: Number(subtotal),
      shippingFee: Number(shippingFee || 0),
      tax: Number(tax || 0),
      totalAmount: Number(totalAmount),
    };

    const newOrder = await store.createOrder(orderData);

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Order placed successfully! Thank you for choosing PawPetStore.',
      data: newOrder,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user's past orders
// @route   GET /api/orders/my-orders
// @access  Private
const getMyOrders = async (req, res, next) => {
  try {
    const userId = req.user.id || req.user._id;
    const orders = await store.getOrdersByUser(userId);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'User orders retrieved successfully',
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res, next) => {
  try {
    const order = await store.getOrderById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'Order not found.',
      });
    }

    // Verify ownership or admin role
    const userId = req.user.id || req.user._id;
    if (order.userId !== userId && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        statusCode: 403,
        message: 'Unauthorized to view this order.',
      });
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Order retrieved successfully',
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
};
