const faker = require("faker")
const { sha256 } = require("@credify/nodejs")
const generateRandomVnPhoneNumber = require("../../utils/generateRandomVnPhoneNumber")

// This is just a random data for testing purpose so we have no responsibility or liability for any issue related to the generated data

const USER_COUNT = 5000

const PRODUCT = {
  phone: "phone",
  tv: "tv",
  laptop: "laptop",
  jewelry: "jewelry",
  book: "book",
  furniture: "furniture",
  clothes: "clothes",
  bag: "bag",
  audio: "audio",
  bike: "bike",
  car: "car",
}
const PAYMENT_METHOD = {
  cash: "cash",
  creditCard: "creditCard",
  debitCard: "debitCard",
  eWallet: "eWallet",
}
const TIER = {
  platinum: "platinum",
  gold: "gold",
  silver: "silver",
  classic: "classic",
}

const productCount = Object.keys(PRODUCT).length
const paymentMethodCount = Object.keys(PAYMENT_METHOD).length
const tierCount = Object.keys(TIER).length

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = []
    for (let i = 0; i < USER_COUNT; i++) {
      const phoneNumber = generateRandomVnPhoneNumber()
      const data = {
        id: i + 1,
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        address:
          faker.address.streetAddress() +
          faker.address.city() +
          faker.address.country(),
        phoneNumber,
        phoneCountryCode: "+84",
        hashedPhoneNumber: sha256(phoneNumber),
        creditScore: faker.datatype.number(200),
        totalPaymentAmount: faker.datatype.number(1000000),
        averageSpending: faker.datatype.number(1000000),
        paymentMethods: Object.values(PAYMENT_METHOD)[i % paymentMethodCount],
        lastPurchaseProduct: Object.values(PRODUCT)[i % productCount],
        married: faker.datatype.boolean(),
        divorced: faker.datatype.boolean(),
        tier: Object.values(TIER)[i % tierCount],
        loyaltyPoint: faker.datatype.number(10000),
        credifyId: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      users.push(data)
    }
    await queryInterface.bulkInsert("Users", users, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {})
  },
}
