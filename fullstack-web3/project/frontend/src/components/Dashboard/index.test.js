import configureMockStore from "redux-mock-store";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import DashboardComponent from "./index";

const mockStore = configureMockStore([thunk]);

describe("Dashboard", () => {
  const mockGotCoinsByCurrency = jest.fn();
  const mockGotCoins = jest.fn();
  const defaultStore = {
    coin: {
      coins: [
        {
          id: "bitcoin",
          name: "Bitcoin",
          price: 18889.28389964928,
          priceBtc: 1,
          rank: 1,
          symbol: "BTC",
          totalSupply: 21000000,
        },
        {
          id: "ethereum",
          name: "Ethereum",
          price: 1304.110764622925,
          priceBtc: 0.06904981896050512,
          rank: 2,
          symbol: "ETH",
          totalSupply: 120680130.647417,
        },
        {
          id: "tether",
          name: "Tether",
          price: 0.999818537885446,
          priceBtc: 0.00005293820962693199,
          rank: 3,
          symbol: "USDT",
          totalSupply: 67954703169.0175,
        },
      ],
      gotCoins: mockGotCoins,
      gotCoinsByCurrency: mockGotCoinsByCurrency,
    },
  };

  it("should render table", () => {
    const store = mockStore(defaultStore);
    const { getByText, getAllByTestId } = render(
      <Provider store={store}>
        <DashboardComponent />
      </Provider>
    );
    expect(getByText("rank")).toBeInTheDocument(true);
    expect(getByText("icon")).toBeInTheDocument(true);
    expect(getByText("id")).toBeInTheDocument(true);
    expect(getByText("name")).toBeInTheDocument(true);
    expect(getByText("symbol")).toBeInTheDocument(true);
    expect(getByText("price")).toBeInTheDocument(true);
    expect(getByText("totalSupply")).toBeInTheDocument(true);
    expect(getByText("priceBtc")).toBeInTheDocument(true);
    expect(getByText("Exchange")).toBeInTheDocument(true);
    expect(getByText("filter by rank")).toBeInTheDocument(true);
    expect(getByText("filter by name")).toBeInTheDocument(true);
    expect(getAllByTestId("coin-row")).toHaveLength(3);
  });
});
