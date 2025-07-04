const Product = require('../models/Product');

// ✅ Get all products - with normalized image field
exports.getAll = async (req, res) => {
  try {
    const products = await Product.find();

    const normalized = products.map((p) => ({
      ...p._doc,
      image: p.image || p.images,  // Normalize for frontend use
    }));

    res.json(normalized);
  } catch (err) {
    res.status(500).json({ message: 'Fetch failed' });
  }
};

// ✅ Create a product - auto populate 'images' if 'image' provided
exports.create = async (req, res) => {
  try {
    // Normalize: if 'image' field is sent from frontend, set it as 'images'
    if (!req.body.images && req.body.image) {
      req.body.images = req.body.image;
    }

    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ message: 'Created', product });
  } catch (err) {
    res.status(500).json({ message: 'Create failed' });
  }
};

// ✅ Update product - ensure 'images' field is also set if 'image' used
exports.update = async (req, res) => {
  try {
    if (!req.body.images && req.body.image) {
      req.body.images = req.body.image;
    }

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Updated', product });
  } catch (err) {
    res.status(500).json({ message: 'Update failed' });
  }
};

// ✅ Delete product
exports.remove = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed' });
  }
};
