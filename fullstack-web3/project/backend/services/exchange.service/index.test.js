const httpStatus = require("http-status");
const { getCoinsByCurrency } = require(".")

const defaultCoinId = "bitcoin";
const defaultCurrency = "USD";

describe("Exchange Service", () => {
  test("Should get Exchange By CrpytoCurrency", async () => {
    const exchanges = await getCoinsByCurrency(defaultCoinId, defaultCurrency);
    expect(Array.isArray(exchanges)).toBe(true);
    expect(exchanges[0]).toHaveProperty("price");
    expect(exchanges[0]).toHaveProperty("exchange");
    expect(exchanges[0]).toHaveProperty("pair");
    expect(exchanges[0]).toHaveProperty("pairPrice");
    expect(exchanges[0]).toHaveProperty("volume");
  });
})