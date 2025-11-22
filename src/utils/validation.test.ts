import {
  validateEmail,
  validatePassword,
  validatePhone,
  validateRequired,
} from "./validation";

describe("Validation Utils", () => {
  test("validateEmail", () => {
    expect(validateEmail("test@example.com")).toBe(true);
    expect(validateEmail("invalid")).toBe(false);
    expect(validateEmail("abc@xyz")).toBe(false);
    expect(validateEmail("")).toBe(false);
  });

  test("validatePassword", () => {
    expect(validatePassword("123456")).toBe(true);
    expect(validatePassword("123")).toBe(false);
    expect(validatePassword("")).toBe(false);
  });

  test("validatePhone", () => {
    expect(validatePhone("9876543210")).toBe(true);
    expect(validatePhone("abc123")).toBe(false);
    expect(validatePhone("123")).toBe(false);
  });

  test("validateRequired", () => {
    expect(validateRequired("Sai")).toBe(true);
    expect(validateRequired("")).toBe(false);
    expect(validateRequired("   ")).toBe(false);
  });
});
