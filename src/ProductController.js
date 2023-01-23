const { Types } = require("mongoose");
const ProductModel = require("./database/models/Product");
const env = require("./env");

class ProductController {
  async getProduct(req, res, next) {
    try {
      const productId = req.params;
      const product = await ProductModel.get({ _id: Types.ObjectId(productId) });

      res.status(200).json({
        "data.product": product,
      });
    } catch (error) {
      next(error);
    }
  }
  async getPaginatedProducts(req, res, next) {
    try {
      let { limit, skip } = req.query;
      limit = +limit || 50;
      skip = +skip || 0;

      const products = await ProductModel.getPaginated(limit, skip);

      res.status(200).json({
        "data.products": products,
        total: env.MAX_PRODUCT,
        limit,
        skip,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;
