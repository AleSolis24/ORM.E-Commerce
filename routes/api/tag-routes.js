const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({ include: [{ model: Product, through: ProductTag,
    },
  ],
 });
    res.json(tags);
  } catch (err) {
    res.status(500).json({ message: 'Could not find Tag' });
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try { 
    const tagId = await Tag.findByPk(req.params.id, {include: [{model: Product, through: ProductTag, 
    },
  ],
})
    res.json(tagId)
  } catch (err) {
    res.status(500).json({ message: 'There a ERROR with finding your Tag!' });
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch {
    res.status(500).json({ message: 'There is a ERROR with creating a new TAG!' })
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
 Tag.update(req.body, {
  where: {
    id: req.params.id,
  },
 });
});

router.delete('/:id',async (req, res) => {
  // delete on tag by its `id` value
  try { 
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(deleteTag)
  } catch (err){
    res.status(500).json({ message: 'Could not delete requested Tag!' })
  }
});

module.exports = router;
