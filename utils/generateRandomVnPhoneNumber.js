const faker = require("faker")

const generateRandomVnPhoneNumber = () => {
  const vnPrefixes = [
    "37",
    "38",
    "39",
    "70",
    "76",
    "77",
    "78",
    "83",
    "81",
    "82",
    "85",
  ]
  const randomPrefix =
    vnPrefixes[
      faker.datatype.number({
        min: 0,
        max: vnPrefixes.length - 1,
      })
    ]
  return randomPrefix + faker.phone.phoneNumber("#######")
}

module.exports = generateRandomVnPhoneNumber
