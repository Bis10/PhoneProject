"use strict";

const PhoneRegister = require("../phoneRegister");
const defaultData = require("../phones.json");

describe("Testing constructor", () => {
  test("Test 1: missing parameter throw an exception", () => {
    expect(() => new PhoneRegister()).toThrow("phone data missing");
  });
});

describe("Testing getTypes", () => {
  test("Test 1: getTypes from the default data", () => {
    const register = new PhoneRegister(defaultData);
    expect(register.getTypes()).toEqual(["home", "work", "mobile"]);
  });

  test("Test 1: getTypes from the default data version 2", () => {
    const register = new PhoneRegister(defaultData);
    const expectedResult = ["home", "work", "mobile"];

    expect(register.getTypes()).toEqual(expectedResult);
  });

  test("Test 2. No persons", () => {
    const register = new PhoneRegister([]);
    expect(register.getTypes()).toEqual([]);
  });

  test("Test 3: persons have no phones", () => {
    const testData = [
      {
        firstname: "Leila",
        lastname: "Hökki",
        phones: [],
      },
      {
        firstname: "Matt",
        lastname: "River",
        phones: [],
      },
    ];

    const register = new PhoneRegister(testData);
    expect(register.getTypes()).toEqual([]);
  });

  test("Test 4: Only work numbers", () => {
    const testData = [
      {
        firstname: "Leila",
        lastname: "Hökki",
        phones: [
          { type: "work", number: "987654321" },
          { type: "work", number: "05040302" },
        ],
      },
      {
        firstname: "Matt",
        lastname: "River",
        phones: [{ type: "work", number: "2468159" }],
      },
    ];
    const expectedResult = ["work"];

    const register = new PhoneRegister(testData);
    expect(register.getTypes()).toEqual(expectedResult);
  });

  test("Test 5: Three persons, four types", () => {
    const testData = [
      {
        firstname: "Leila",
        lastname: "Hökki",
        phones: [
          { type: "home", number: "12345678" },
          { type: "work", number: "987654321" },
          { type: "work", number: "05040302" },
        ],
      },
      {
        firstname: "Mary",
        lastname: "Jones",
        phones: [{ type: "cottage", number: "091238456" }],
      },
      {
        firstname: "Matt",
        lastname: "River",
        phones: [
          { type: "home", number: "56743290" },
          { type: "mobile", number: "0409812345" },
          { type: "work", number: "2468159" },
        ],
      },
    ];
    const expectedResult = ["home", "work", "cottage", "mobile"];

    const register = new PhoneRegister(testData);
    expect(register.getTypes()).toEqual(expectedResult);
  });

  test("Test 6: getType with empty type", () => {
    const testData = [
      {
        firstname: "Leila",
        lastname: "Hökki",
        phones: [
          { type: "home", number: "12345678" },
          { type: "", number: "987654321" },
          { type: "work", number: "05040302" },
        ],
      },
      {
        firstname: "Matt",
        lastname: "River",
        phones: [
          { type: "home", number: "56743290" },
          { type: "mobile", number: "0409812345" },
          { type: "work", number: "2468159" },
        ],
      },
    ];
    const expectedResult = ["home", "", "work", "mobile"];

    const register = new PhoneRegister(testData);
    expect(register.getTypes()).toEqual(expectedResult);
  });

  test("Test 7: All types are empty strings", () => {
    const testData = [
      {
        firstname: "Leila",
        lastname: "Hökki",
        phones: [
          { type: "", number: "12345678" },
          { type: "", number: "987654321" },
          { type: "", number: "05040302" },
        ],
      },
      {
        firstname: "Matt",
        lastname: "River",
        phones: [
          { type: "", number: "56743290" },
          { type: "", number: "0409812345" },
          { type: "", number: "2468159" },
        ],
      },
    ];
    const expectedResult = [""];

    const register = new PhoneRegister(testData);
    expect(register.getTypes()).toEqual(expectedResult);
  });
}); //The end of getTypes describe

describe("Testing the getPersonsNumbersByType", () => {
  test("Test 1: Leila Hökki and work", () => {
    const register = new PhoneRegister(defaultData);
    const expectedResult = ["987654321", "05040302"];
    expect(register.getPersonsNumberByType("Leila", "Hökki", "work")).toEqual(
      expectedResult
    );
  });

  test("Test 2: Matt River and mobile", () => {
    const register = new PhoneRegister(defaultData);

    const expectedResult = ["0409812345"];
    expect(register.getPersonsNumberByType("Matt", "River", "mobile")).toEqual(
      expectedResult
    );
  });

  describe("Test 1-3", () => {
    const testValues = [
      //fn        ln      type    result
      ["Leila", "Hökki", "work", ["987654321", "05040302"]],
      ["Matt", "River", "mobile", ["0409812345"]],
      ["Matt", "x", "mobile", []],
      ["x", "River", "mobile", []],
      ["Matt", "River", "x", []],
    ];
    const register = new PhoneRegister(defaultData);

    test.each(testValues)("%s, %s, %s returns %s", (fn, ln, type, result) => {
      expect(register.getPersonsNumberByType(fn, ln, type)).toEqual(result);
    });
  }); // The end of getPersonsNumbersByType

  describe("Test 4: parameter missing", () => {
    const register = new PhoneRegister(defaultData);

    test("4.1: One parameter missing", () => {
      expect(() => register.getPersonsNumberByType("Matt", "River")).toThrow(
        "missing parameter"
      );
    });
    test("4.2: Two parameters missing", () => {
      expect(() => register.getPersonsNumberByType("Matt")).toThrow(
        "missing parameter"
      );
    });

    test("4.3: All parameters missing", () => {
      expect(() => register.getPersonsNumberByType()).toThrow(
        "missing parameter"
      );
    });
  }); // The end of Test 4: parameter missing

  test("Test 5: testing empty string as type", () => {
    const testData = [
      {
        firstname: "Leila",
        lastname: "Hökki",
        phones: [
          { type: "home", number: "12345678" },
          { type: "", number: "987654321" },
          { type: "work", number: "05040302" },
        ],
      },
      {
        firstname: "Matt",
        lastname: "River",
        phones: [
          { type: "home", number: "56743290" },
          { type: "mobile", number: "0409812345" },
          { type: "work", number: "2468159" },
        ],
      },
    ];

    const register = new PhoneRegister(testData);

    expect(register.getPersonsNumberByType("Leila", "Hökki", "")).toEqual([
      "987654321",
    ]);
  });
}); // The end of Test 5: testing empty string as type

describe("testing of the getAllNumbersBytype", () => {
  test("Test 1: type:mobile", () => {
    const register = new PhoneRegister(defaultData);
    const expectedResult = [
      {
        firstname: "Matt",
        lastname: "River",
        number: { type: "mobile", tel: "0409812345" },
      },
    ];
    expect(register.getAllNumbersByType("mobile")).toEqual(expectedResult);
  });

  test("Test 2: type:work", () => {
    const register = new PhoneRegister(defaultData);
    const expectedResult = [
      {
        firstname: "Leila",
        lastname: "Hökki",
        number: { type: "work", tel: "987654321" },
      },
      {
        firstname: "Leila",
        lastname: "Hökki",
        number: { type: "work", tel: "05040302" },
      },
      {
        firstname: "Matt",
        lastname: "River",
        number: { type: "work", tel: "2468159" },
      },
    ];
    expect(register.getAllNumbersByType("work")).toEqual(expectedResult);
  });

  test("Test 3: type:x", () => {
    const register = new PhoneRegister(defaultData);

    const expectedResult = [];
    expect(register.getAllNumbersByType("x")).toEqual(expectedResult);
  });

  test("Test 4: Missing parameter", () => {
    const register = new PhoneRegister(defaultData);
    expect(() => register.getAllNumbersByType()).toThrow("missing parameter");
  });

  describe('Test 5: Testing type ""', () => {
    test("Test 5.1: testing with default data", () => {
      const register = new PhoneRegister(defaultData);
      expect(register.getAllNumbersByType("")).toEqual([]);
    });

    test("Test 5.2: testing with modified data", () => {
      const testData = [
        {
          firstname: "Leila",
          lastname: "Hökki",
          phones: [
            { type: "home", number: "12345678" },
            { type: "", number: "987654321" },
            { type: "work", number: "05040302" },
          ],
        },
        {
          firstname: "Matt",
          lastname: "River",
          phones: [
            { type: "home", number: "56743290" },
            { type: "mobile", number: "0409812345" },
            { type: "work", number: "2468159" },
          ],
        },
      ];
      const expectedResult = [
        {
          firstname: "Leila",
          lastname: "Hökki",
          number: { type: "", tel: "987654321" },
        },
      ];
      const register = new PhoneRegister(testData);
      expect(register.getAllNumbersByType("")).toEqual(expectedResult);
    });
  }); // End of describe Test 5: Testing type ""
}); // The end of testing of the getAllNumbersBytype

describe("testing for the getAllNumbers", () => {
  test("Test 1: Testing with default data", () => {
    const register = new PhoneRegister(defaultData);
    expect(register.getAllNumbers()).toEqual(defaultData);
  });
  test("Test 2: some phones are missing", () => {
    const testData = [
      {
        firstname: "Leila",
        lastname: "Hökki",
        phones: [
          { type: "home", number: "12345678" },
          { type: "work", number: "987654321" },
          { type: "work", number: "05040302" },
        ],
      },
      {
        firstname: "Matt",
        lastname: "River",
        phones: [],
      },
    ];
    const expectedResult = [
      {
        firstname: "Leila",
        lastname: "Hökki",
        phones: [
          { type: "home", number: "12345678" },
          { type: "work", number: "987654321" },
          { type: "work", number: "05040302" },
        ],
      },
    ];
    const register = new PhoneRegister(testData);
    expect(register.getAllNumbers()).toEqual(expectedResult);
  });

  test("Test 3: first and third person missing phones", () => {
    const testData = [
      {
        firstname: "Mary",
        lastname: "Jones",
        phones: [],
      },
      {
        firstname: "Leila",
        lastname: "Hökki",
        phones: [
          { type: "home", number: "12345678" },
          { type: "work", number: "987654321" },
          { type: "work", number: "05040302" },
        ],
      },
      {
        firstname: "Matt",
        lastname: "River",
        phones: [],
      },
      {
        firstname: "Amanda",
        lastname: "Brown",
        phones: [{ type: "home", number: "22223333" }],
      },
    ];
    const expectedResult = [
      {
        firstname: "Leila",
        lastname: "Hökki",
        phones: [
          { type: "home", number: "12345678" },
          { type: "work", number: "987654321" },
          { type: "work", number: "05040302" },
        ],
      },
      {
        firstname: "Amanda",
        lastname: "Brown",
        phones: [{ type: "home", number: "22223333" }],
      },
    ];
    const register = new PhoneRegister(testData);
    expect(register.getAllNumbers()).toEqual(expectedResult);
  });

  test("Test 4: all phones are missing", () => {
    const testData = [
      {
        firstname: "Leila",
        lastname: "Hökki",
        phones: [],
      },
      {
        firstname: "Matt",
        lastname: "River",
        phones: [],
      },
    ];

    const register = new PhoneRegister(testData);
    expect(register.getAllNumbers()).toEqual([]);
  });

  test("Test 5: All persons missing", () => {
    const register = new PhoneRegister([]);
    expect(register.getAllNumbers()).toEqual([]);
  });
}); //End of test for the getAllNumbers

describe("test for the getName", () => {
  test('Test 1: Leila Hökki home number "12345678"', () => {
    const register = new PhoneRegister(defaultData);
    const expectedResult = {
      firstname: "Leila",
      lastname: "Hökki",
    };
    expect(register.getName("12345678")).toEqual(expectedResult);
  });

  test('Test 2: Matt River work number "2468159"', () => {
    const register = new PhoneRegister(defaultData);
    const expectedResult = {
      firstname: "Matt",
      lastname: "River",
    };
    expect(register.getName("2468159")).toEqual(expectedResult);
  });

  describe("Tests 1 and 2 combined", () => {
    const testValues = [
      // number          expected
      ["12345678", { firstname: "Leila", lastname: "Hökki" }],
      ["2468159", { firstname: "Matt", lastname: "River" }],
    ];
    const register = new PhoneRegister(defaultData);

    test.each(testValues)('number %s returns %p', (number, result) => {
      expect(register.getName(number)).toEqual(result);
    });
  }); // End of Tests 1 & 2 combined

  test('Test 3: wrong number (non-existing number)', () => {
    const register = new PhoneRegister(defaultData);
    expect(register.getName("0000")).toBeNull();
  });

  test('Test 4: missing parameter', () => {
    const register = new PhoneRegister(defaultData);
    expect(register.getName()).toBeNull();
  });
}); // End of the tests for the getName
