
const { Category: Category } = require("../models/Category");

const categoryController = {
  createCategory: async (req, res) => { },

  createManyCategories: async (req, res) => {
    try {
      const categories = req.body; // Assuming an array of categories is sent in the request body
      const newCategories = await Category.insertMany(categories);
      res.status(201).json(newCategories);
    } catch (error) {
      res.status(500).json({ message: "Failed to create categories", error });
    }
  },

  getAllCategories: async (_, res) => {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to get categories", error });
    }
  },
}


module.exports = categoryController;
