const { Types } = require("mongoose");
const { faker } = require("@faker-js/faker");

const discountFactory = () => ({
  discount_type: "value",
  discount_value: +faker.commerce.price(200, undefined, 2) * 10,
  _id: new Types.ObjectId(),
});

module.exports = (category = null, sub_category = null) => ({
  _id: new Types.ObjectId(),
  image: faker.image.food(),
  bulk_price: [],
  vendor_bulk_price: [],
  vendease_bulk_price: [],
  vendor_price: +faker.commerce.price(200, undefined, 2) * 10,
  vendease_price: +faker.commerce.price(200, undefined, 2) * 10 + 30,
  market_price: Math.random(),
  discount_deleted: Math.random() > 0.5 ? true : false,
  deleted: Math.random() > 0.5 ? true : false,
  name: faker.commerce.productName(),
  category_id: category._id,
  sub_category_id: sub_category._id,
  description: faker.commerce.productDescription(),
  discount: discountFactory(),
  weight: faker.datatype.number({
    min: 0.5,
    max: 10,
  }),
  weight_unit: faker.helpers.arrayElement(["pack", "carton"]),
  countryCode: faker.address.countryCode(),
  cityCode: faker.address.countryCode(),
  owner_type: faker.helpers.arrayElement(["system", "admin"]),
  owner: faker.address.countryCode(),
  createdAt: faker.date.recent(),
  updatedAt: faker.date.recent(),
  __v: 0,
  category_details: {
    name: category.name,
    tax_exempt: Math.random() > 0.5 ? true : false,
    sub_category: sub_category.name,
  },
});
