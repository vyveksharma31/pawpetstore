const bcrypt = require('bcryptjs');
const { products: seedProducts, breeds: seedBreeds, categories: seedCategories, clinicServices: seedClinicServices } = require('../seed/data');
const { getDBStatus } = require('../config/db');
const Product = require('../models/Product');
const User = require('../models/User');
const Order = require('../models/Order');
const Appointment = require('../models/Appointment');

// Initialize in-memory repositories with deep clones
let memoryProducts = JSON.parse(JSON.stringify(seedProducts));
let memoryBreeds = JSON.parse(JSON.stringify(seedBreeds));
let memoryCategories = JSON.parse(JSON.stringify(seedCategories));
let memoryClinicServices = JSON.parse(JSON.stringify(seedClinicServices));
let memoryOrders = [];
let memoryAppointments = [];

// Default demo users with pre-hashed passwords
let memoryUsers = [
  {
    id: 'user-admin-01',
    _id: 'user-admin-01',
    name: 'PawPetStore Admin',
    email: 'admin@pawpetstore.com',
    password: '', // will be hashed below
    role: 'admin',
    phone: '+91 98765 43210',
    addresses: [
      {
        fullName: 'Admin Official',
        phone: '+91 98765 43210',
        street: '101 Pet Paradise Avenue',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560001',
        isDefault: true,
      }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: 'user-demo-01',
    _id: 'user-demo-01',
    name: 'Rahul Sharma',
    email: 'demo@pawpetstore.com',
    password: '', // will be hashed below
    role: 'customer',
    phone: '+91 98111 22334',
    addresses: [
      {
        fullName: 'Rahul Sharma',
        phone: '+91 98111 22334',
        street: '42 Green Valley Apartments, Indiranagar',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560038',
        isDefault: true,
      }
    ],
    createdAt: new Date().toISOString()
  }
];

// Asynchronously hash default passwords
(async () => {
  const salt = await bcrypt.genSalt(10);
  memoryUsers[0].password = await bcrypt.hash('Admin@123', salt);
  memoryUsers[1].password = await bcrypt.hash('Demo@123', salt);
})();

const store = {
  // --- PRODUCTS ---
  async getProducts({ petType, category, subCategory, breed, minPrice, maxPrice, search, sort, page = 1, limit = 12 }) {
    if (getDBStatus()) {
      try {
        const query = { isActive: true };
        if (petType && petType !== 'all') query.petType = petType;
        if (category && category !== 'all') query.category = new RegExp(category, 'i');
        if (subCategory) query.subCategory = new RegExp(subCategory, 'i');
        if (breed) query.breedSuitability = { $in: [new RegExp(breed, 'i'), 'All Breeds'] };
        if (minPrice || maxPrice) {
          query.price = {};
          if (minPrice) query.price.$gte = Number(minPrice);
          if (maxPrice) query.price.$lte = Number(maxPrice);
        }
        if (search) {
          query.$or = [
            { name: { $regex: search, $options: 'i' } },
            { brand: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } }
          ];
        }

        let sortOption = { createdAt: -1 };
        if (sort === 'price_asc') sortOption = { price: 1 };
        if (sort === 'price_desc') sortOption = { price: -1 };
        if (sort === 'rating') sortOption = { rating: -1 };

        const skip = (Number(page) - 1) * Number(limit);
        const [items, total] = await Promise.all([
          Product.find(query).sort(sortOption).skip(skip).limit(Number(limit)),
          Product.countDocuments(query)
        ]);

        return {
          products: items,
          meta: {
            total,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(total / Number(limit))
          }
        };
      } catch (err) {
        console.warn('DB query error, using in-memory store:', err.message);
      }
    }

    // In-memory fallback filtering
    let results = memoryProducts.filter(p => p.isActive !== false);

    if (petType && petType !== 'all') {
      results = results.filter(p => p.petType === petType || (petType !== 'general' && p.petType === 'general'));
    }
    if (category && category !== 'all') {
      results = results.filter(p => p.category.toLowerCase().includes(category.toLowerCase()));
    }
    if (subCategory) {
      results = results.filter(p => (p.subCategory || '').toLowerCase().includes(subCategory.toLowerCase()));
    }
    if (breed) {
      results = results.filter(p => 
        (p.breedSuitability || []).some(b => b.toLowerCase().includes(breed.toLowerCase()) || b === 'All Breeds')
      );
    }
    if (minPrice) results = results.filter(p => p.price >= Number(minPrice));
    if (maxPrice) results = results.filter(p => p.price <= Number(maxPrice));

    if (search) {
      const q = search.toLowerCase();
      results = results.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sort === 'price_asc') results.sort((a, b) => a.price - b.price);
    else if (sort === 'price_desc') results.sort((a, b) => b.price - a.price);
    else if (sort === 'rating') results.sort((a, b) => b.rating - a.rating);
    else if (sort === 'newest') results.reverse();

    const total = results.length;
    const start = (Number(page) - 1) * Number(limit);
    const paginated = results.slice(start, start + Number(limit));

    return {
      products: paginated,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit))
      }
    };
  },

  async getProductById(idOrSlug) {
    if (getDBStatus()) {
      try {
        const found = await Product.findOne({ $or: [{ _id: idOrSlug }, { slug: idOrSlug }, { id: idOrSlug }] });
        if (found) return found;
      } catch (e) {
        // Fall through
      }
    }
    return memoryProducts.find(p => p.id === idOrSlug || p.slug === idOrSlug || p._id === idOrSlug) || null;
  },

  async getRelatedProducts(productId, petType, limit = 4) {
    const all = memoryProducts.filter(p => (p.id !== productId && p._id !== productId) && (p.petType === petType || p.petType === 'general'));
    return all.slice(0, limit);
  },

  // --- BREEDS & CATEGORIES ---
  async getBreeds(petType) {
    if (!petType || petType === 'all') return memoryBreeds;
    return memoryBreeds.filter(b => b.petType === petType);
  },

  async getCategories() {
    return memoryCategories;
  },

  // --- CLINIC SERVICES ---
  async getClinicServices() {
    return memoryClinicServices;
  },

  async getClinicServiceById(idOrSlug) {
    return memoryClinicServices.find(s => s.id === idOrSlug || s.slug === idOrSlug) || null;
  },

  // --- APPOINTMENTS ---
  async createAppointment(appointmentData) {
    const newAppointment = {
      ...appointmentData,
      _id: 'apt-' + Date.now(),
      bookingReference: 'APT-' + Math.floor(100000 + Math.random() * 900000),
      createdAt: new Date().toISOString(),
      status: 'Confirmed'
    };
    memoryAppointments.unshift(newAppointment);
    return newAppointment;
  },

  async getAppointmentsByUser(userId) {
    return memoryAppointments.filter(a => a.userId === userId || a.user === userId);
  },

  // --- USERS ---
  async findUserByEmail(email) {
    return memoryUsers.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
  },

  async findUserById(id) {
    return memoryUsers.find(u => u.id === id || u._id === id) || null;
  },

  async createUser(userData) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    const newUser = {
      ...userData,
      id: 'usr-' + Date.now(),
      _id: 'usr-' + Date.now(),
      password: hashedPassword,
      role: userData.role || 'customer',
      addresses: userData.addresses || [],
      wishlist: [],
      createdAt: new Date().toISOString()
    };
    memoryUsers.push(newUser);
    return newUser;
  },

  async updateUser(userId, updateData) {
    if (getDBStatus()) {
      try {
        const u = await User.findByIdAndUpdate(userId, updateData, { new: true });
        if (u) return u;
      } catch (err) {
        console.warn('DB updateUser error:', err.message);
      }
    }
    const idx = memoryUsers.findIndex(u => u.id === userId || u._id === userId);
    if (idx !== -1) {
      if (updateData.name) memoryUsers[idx].name = updateData.name;
      if (updateData.phone !== undefined) memoryUsers[idx].phone = updateData.phone;
      if (updateData.addresses) memoryUsers[idx].addresses = updateData.addresses;
      if (updateData.wishlist !== undefined) memoryUsers[idx].wishlist = updateData.wishlist;
      return memoryUsers[idx];
    }
    return null;
  },

  // --- ORDERS ---
  async createOrder(orderData) {
    const newOrder = {
      ...orderData,
      _id: 'ord-' + Date.now(),
      orderNumber: 'ORD-' + Date.now().toString().slice(-6),
      orderStatus: 'Confirmed',
      paymentStatus: orderData.paymentMethod === 'cod' ? 'pending' : 'completed',
      createdAt: new Date().toISOString()
    };

    // Deduct stock
    if (orderData.items && orderData.items.length) {
      for (const item of orderData.items) {
        const prod = memoryProducts.find(p => p.id === item.productId || p._id === item.productId || p.id === item.id);
        if (prod && prod.stock >= item.quantity) {
          prod.stock -= item.quantity;
        }
      }
    }

    memoryOrders.unshift(newOrder);
    return newOrder;
  },

  async getOrdersByUser(userId) {
    return memoryOrders.filter(o => o.userId === userId || o.user === userId);
  },

  async getOrderById(orderId) {
    return memoryOrders.find(o => o._id === orderId || o.orderNumber === orderId) || null;
  },

  // --- ADMIN STATS ---
  async getAdminStats() {
    const totalRevenue = memoryOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
    const totalOrders = memoryOrders.length;
    const totalProducts = memoryProducts.length;
    const totalAppointments = memoryAppointments.length;
    const lowStock = memoryProducts.filter(p => p.stock < 10);

    return {
      totalRevenue,
      totalOrders,
      totalProducts,
      totalAppointments,
      lowStockCount: lowStock.length,
      recentOrders: memoryOrders.slice(0, 5),
      recentAppointments: memoryAppointments.slice(0, 5)
    };
  }
};

module.exports = store;
