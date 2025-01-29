import { displayLifeColor } from "./displayLifeColor";

describe("displayLifeColor function", () => {
  it("should return grey (#e0e0e0) when life is 0", () => {
    expect(displayLifeColor(0, 100)).toBe("#e0e0e0");
  });

  it("should return orange (#fa9f1a) when life is in the first third", () => {
    expect(displayLifeColor(1, 90)).toBe("#fa9f1a"); // Edge case just above 0
    expect(displayLifeColor(30, 90)).toBe("#fa9f1a"); // Exactly 1/3
  });

  it("should return yellow (#c6bc28) when life is in the second third", () => {
    expect(displayLifeColor(31, 90)).toBe("#c6bc28"); // Just above first third
    expect(displayLifeColor(60, 90)).toBe("#c6bc28"); // Exactly 2/3
  });

  it("should return light green (#52ea52) when life is between two-thirds and max", () => {
    expect(displayLifeColor(61, 90)).toBe("#52ea52"); // Just above second third
    expect(displayLifeColor(89, 90)).toBe("#52ea52"); // Just below max
  });

  it("should return dark green (#16b816) when life is at max", () => {
    expect(displayLifeColor(90, 90)).toBe("#16b816");
  });

  it("should return grey (#e0e0e0) for invalid values", () => {
    expect(displayLifeColor(-10, 90)).toBe("#e0e0e0"); // Negative life
    expect(displayLifeColor(100, 90)).toBe("#e0e0e0"); // Above max life
    expect(displayLifeColor(Number.NaN, 90)).toBe("#e0e0e0"); // NaN case
    expect(displayLifeColor(50, Number.NaN)).toBe("#e0e0e0"); // NaN max life
    expect(displayLifeColor(50, 0)).toBe("#e0e0e0"); // maxLife = 0 (division by zero case)
  });
});
