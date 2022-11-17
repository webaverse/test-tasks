const httpStatus = require("http-status");
const request = require("supertest");

const { App } = require("../../setups/backendSetup");

const defaultCurrency = "USD";
const defaultCoinId = "bitcoin";
const defaultSymbol = "BTC";

describe("Exchange Route Endpoint", () => {

  describe("/Get Exchange by cryptocurrency", () => {

    // curl http://localhost:4000/exchange-route?coinId=BTC&currency=USD
    test("Get Exchange : Should send Ok Request : httpsStatus 200", async () => {
      const res = await request(App)
        .get(`/exchange-route?coinId=${defaultCoinId}&currency=${defaultCurrency}&symbol=${defaultSymbol}`)
      expect(res.statusCode).toEqual(httpStatus.OK);
      expect(res.body).toHaveProperty("exchange");
    });

    // curl http://localhost:4000/exchange-route?&currency=USD: it takes some times becaues of the getting all data
    test("Get Exchange : Should send Ok Request : httpsStatus 200", async () => {
      const res = await request(App)
        .get(`/exchange-route?&currency=${defaultCurrency}`);
      expect(res.body).toHaveProperty("Allexchange");
      expect(Array.isArray(res.body.Allexchange)).toBe(true);
      expect(res.body.Allexchange[0]).toHaveProperty("coinId");
      expect(res.body.Allexchange[0]).toHaveProperty("exchange");
    }, 100000);


    test("Get Exchange : Should send Ok Request : httpsStatus 400", async () => {
      const res = await request(App)
        .get(`/exchange-route?coinId=${defaultCoinId}&symbol=${defaultSymbol}`)
      expect(res.statusCode).toEqual(httpStatus.BAD_REQUEST);
    });

  });
})