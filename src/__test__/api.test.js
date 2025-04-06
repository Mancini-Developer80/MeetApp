import {
  extractLocations,
  getEvents,
  getAccessToken,
  checkToken,
  getToken,
} from "../api";
import mockData from "../mock-data";

global.fetch = jest.fn();

describe("api.js", () => {
  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test("extractLocations returns unique locations from events", () => {
    const events = [
      { location: "Berlin, Germany" },
      { location: "New York, USA" },
      { location: "Berlin, Germany" },
    ];
    const locations = extractLocations(events);
    expect(locations).toEqual(["Berlin, Germany", "New York, USA"]);
  });

  test("getEvents returns mock data when running on localhost", async () => {
    delete window.location;
    window.location = new URL("http://localhost:3000");

    const events = await getEvents();
    expect(events).toEqual(mockData);
  });

  test("getEvents fetches events from API when not on localhost", async () => {
    delete window.location;
    window.location = new URL("https://example.com");

    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ events: mockData }),
    });

    const events = await getEvents();
    expect(events).toEqual(mockData);
    expect(fetch).toHaveBeenCalledWith(
      "YOUR_GET_EVENTS_API_ENDPOINT/mock-token"
    );
  });

  test("getEvents returns an empty array when no events are found", async () => {
    delete window.location;
    window.location = new URL("https://example.com");

    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({}),
    });

    const events = await getEvents();
    expect(events).toEqual([]);
  });

  test("checkToken verifies the token validity", async () => {
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ valid: true }),
    });

    const result = await checkToken("mockAccessToken");
    expect(result).toEqual({ valid: true });
    expect(fetch).toHaveBeenCalledWith(
      "https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=mockAccessToken"
    );
  });

  test("getToken fetches access token using the provided code", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ access_token: "mockAccessToken" }),
    });

    const token = await getToken("mockCode");
    expect(token).toBe("mockAccessToken");
    expect(localStorage.getItem("access_token")).toBe("mockAccessToken");
    expect(fetch).toHaveBeenCalledWith(
      "YOUR_GET_ACCESS_TOKEN_ENDPOINT/mockCode"
    );
  });

  test("getToken handles errors when fetching access token", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    await expect(getToken("mockCode")).rejects.toThrow(
      "HTTP error! status: 500"
    );
  });

  test("getAccessToken fetches a new token when the current token is invalid", async () => {
    localStorage.setItem("access_token", "expiredToken");

    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ error: "invalid_token" }),
    });

    const token = await getAccessToken();
    expect(token).toBeUndefined();
    expect(localStorage.getItem("access_token")).toBeNull();
  });

  test("getAccessToken redirects to auth URL when no code is present", async () => {
    delete window.location;
    window.location = new URL("https://example.com");

    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ authUrl: "https://auth.example.com" }),
    });

    await getAccessToken();
    expect(window.location.href).toBe("https://auth.example.com");
  });

  test("getAccessToken fetches token using code when present", async () => {
    delete window.location;
    window.location = new URL("https://example.com?code=mockCode");

    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ access_token: "mockAccessToken" }),
    });

    const token = await getAccessToken();
    expect(token).toBe("mockAccessToken");
    expect(localStorage.getItem("access_token")).toBe("mockAccessToken");
  });
});
