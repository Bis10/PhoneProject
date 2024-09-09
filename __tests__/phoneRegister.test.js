'use strict';

const PhoneRegister = require('../phoneRegister');
const defaultData = require ('../phones.json');

describe('Testing constructor', ()=>{
    test('Test 1: missing parameter throw an exception', ()=>{
        expect(()=> new PhoneRegister()).toThrow('phone data missing');
    });
});

describe('Testing getTypes', ()=>{
    test('Test 1: getTypes from the default data', ()=>{
    const register = new PhoneRegister(defaultData);
    expect(register.getTypes()).toEqual(["home", "work", "mobile"]);
    });

    test('Test 1: getTypes from the default data version 2', ()=>{
        const register = new PhoneRegister(defaultData);
        const expectedResult = ["home", "work", "mobile"];

        expect(register.getTypes()).toEqual(expectedResult);
    });

    test('Test 2. No persons', ()=>{
        const register = new PhoneRegister([]);
        expect(register.getTypes()).toEqual([]);
    });

    test('Test 3: persons have no phones', ()=>{
        const testData = [
  {
    "firstname": "Leila",
    "lastname": "Hökki",
    "phones": []
  },
  {
    "firstname": "Matt",
    "lastname": "River",
    "phones": []
  }
];

const register = new PhoneRegister(testData);
expect(register.getTypes()).toEqual([]);
    });

test("Test 4: Only work numbers", ()=>{
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

test('Test 5: Three persons, four types', ()=>{
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

test("Test 6: getType with empty type", ()=>{
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

test("Test 7: All types are empty strings", ()=>{
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