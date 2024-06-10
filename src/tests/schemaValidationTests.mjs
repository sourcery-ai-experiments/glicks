import { schemaValidation } from "./schemaValidation.mjs";

describe("schemaValidation", () => {
  let schema, itemsSchema, categoriesData, itemsData;

  beforeEach(() => {
    schema = {
      type: "object",
      properties: {
        category: { type: "string", format: "custom-uri" }
      },
      required: ["category"]
    };

    itemsSchema = {
      type: "object",
      properties: {
        item: { type: "string", format: "custom-uri" }
      },
      required: ["item"]
    };

    categoriesData = { category: "/valid-category" };
    itemsData = { item: "http://valid-item.com" };
  });

  test("should validate categories and items data successfully", () => {
    // Act
    const result = schemaValidation(schema, itemsSchema, categoriesData, itemsData);

    // Assert
    expect(result.validCategories).toBe(true);
    expect(result.validItems).toBe(true);
  });

  test("should invalidate categories data with incorrect format", () => {
    // Arrange
    categoriesData = { category: "invalid-category" };

    // Act
    const result = schemaValidation(schema, itemsSchema, categoriesData, itemsData);

    // Assert
    expect(result.validCategories).toBe(false);
    expect(result.validItems).toBe(true);
  });

  test("should invalidate items data with incorrect format", () => {
    // Arrange
    itemsData = { item: "invalid-item" };

    // Act
    const result = schemaValidation(schema, itemsSchema, categoriesData, itemsData);

    // Assert
    expect(result.validCategories).toBe(true);
    expect(result.validItems).toBe(false);
  });

  test("should invalidate both categories and items data with incorrect formats", () => {
    // Arrange
    categoriesData = { category: "invalid-category" };
    itemsData = { item: "invalid-item" };

    // Act
    const result = schemaValidation(schema, itemsSchema, categoriesData, itemsData);

    // Assert
    expect(result.validCategories).toBe(false);
    expect(result.validItems).toBe(false);
  });

  test("should handle missing required properties in categories data", () => {
    // Arrange
    categoriesData = {};

    // Act
    const result = schemaValidation(schema, itemsSchema, categoriesData, itemsData);

    // Assert
    expect(result.validCategories).toBe(false);
    expect(result.validItems).toBe(true);
  });

  test("should handle missing required properties in items data", () => {
    // Arrange
    itemsData = {};

    // Act
    const result = schemaValidation(schema, itemsSchema, categoriesData, itemsData);

    // Assert
    expect(result.validCategories).toBe(true);
    expect(result.validItems).toBe(false);
  });
});
