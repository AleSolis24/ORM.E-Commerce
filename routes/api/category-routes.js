const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({include: [{model: Product, as: 'products'}],
    })
    res.json(categories)
  } catch (err) {
    res.status(500).json({message: 'Could not find Catergories!'})
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoriesId = await Category.findByPk(req.params.id, {include: [{model: Product}]})
    res.status(200).json(categoriesId); 
  } catch (err) {
    res.status(500).json({message: 'There is a ERROR finding your categoryID!'});
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  }  catch (err) {
    res.status(500).json({message: 'There a ERROR creating a new Category!'});
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
