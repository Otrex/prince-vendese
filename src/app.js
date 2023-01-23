const express = require("express");
const ProductController = require("./ProductController");
const env = require("./env");

const wrapper =
  (h = () => {}) =>
  (req, res, next) => {
    h(req, res, next);
  };

class App {
  constructor() {
    this._ = express();
    this.controller = new ProductController();
  }

  registerRoutes() {
    const router = express.Router();
    router.get("/", this.controller.getPaginatedProducts);
    router.get("/:id", this.controller.getProduct);
    this._.use("/products", router);

    return this;
  }

  registerGlobalMiddlewares() {
    return this;
  }

  registerErrorMiddlewares() {
    this._.use("*", function (req, res) {
      res.status(404).send("endpoint cannot be found");
    });

    this._.use((err, _, res) => {
      if (err) {
        return res.status(500).json({
          error: true,
          message: "Something went wrong",
          trace: err.trace,
        });
      }
    });
    return this;
  }

  static start() {
    const app = new App()
      .registerGlobalMiddlewares()
      .registerRoutes()
      .registerErrorMiddlewares();

    return app._;
  }
}

module.exports = App;
