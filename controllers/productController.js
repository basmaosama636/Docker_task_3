const Product = require('../models/Product');

exports.index = async (req, res) => {
  try {
    const q = req.query.q || ''; 
    const products = await Product.find({
      name: { $regex: q, $options: 'i' } 
    }).sort({ createdAt: -1 });

    res.render('products/list', { products, q }); 
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
};

exports.showNewForm = (req, res) => {
  res.render('products/new');
};

exports.create = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    await Product.create({ name, description, price, category });
    res.redirect('/products');
  } catch (err) {
    console.error(err);
    res.redirect('/products');
  }
};

exports.delete = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/products');
  } catch (err) {
    console.error(err);
    res.redirect('/products');
  }
};

exports.show = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.redirect('/products');
    res.render('products/show', { product });
  } catch (err) {
    console.error(err);
    res.redirect('/products');
  }
};
