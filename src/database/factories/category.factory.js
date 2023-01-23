const { faker } = require("@faker-js/faker");
const { Types } = require("mongoose");

module.exports = () => ({
  _id: new Types.ObjectId(),
  name: faker.commerce.department(),
});
