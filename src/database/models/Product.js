const { MAX_PRODUCT } = require("../../env");
const categoryFactory = require("../factories/category.factory");
const productFactory = require("../factories/product.factory");

let PRODUCT_IN_STORE = [];

async function loadUpProducts() {
  PRODUCT_IN_STORE = await Promise.all(
    Array(MAX_PRODUCT)
      .fill(undefined)
      .map((e) => {
        return createSingleProduct();
      })
  );

  console.log(`\u{1F528}:: Products have been updated!!`)
  console.log("IDS:", PRODUCT_IN_STORE.map(e => e?._id))
}

loadUpProducts();

setInterval(async () => {
  await loadUpProducts();
}, 1000 * 60 * 60 * 24);

function createSingleProduct() {
  return new Promise((resolve, reject) => {
    const category = categoryFactory();
    const subcategory = categoryFactory();
    const product = productFactory(category, subcategory);
    resolve(product);
  });
}

class ProductModel {
  static get(filter = {}) {
    return PRODUCT_IN_STORE.find((e) => {
      const fkeys = Object.keys(filter);
      return fkeys
        .map((m) => {
          if (typeof e[m] === "object") {
            return JSON.stringify(e[m]) === JSON.stringify(filter[m])
          }
          return e[m] === filter[m]
        })
        .reduce((p, c, i) => p && c, true);
    });
  }

  static async getPaginated(limit = 50, skip = 0) {
    if (skip < 0 || limit < 0) {
      throw Error("Database Error: Invalid skip or limit");
    }

    const start = limit * skip;
    const stop = start + limit;

    const products = Array(stop)
      .fill(undefined)
      .map((e, i) => {
        if (i >= start) return PRODUCT_IN_STORE[i];
      })
      .filter((e) => e !== undefined);

    return products;
  }
}

module.exports = ProductModel;
