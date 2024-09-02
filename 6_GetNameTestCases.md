# Test cases for the getName

## **getName(number)**

This method searches the given phone number from the registry. If the number is found, method returns the owner of that number as an object:

```json
{"firstname":"", "lastname":""}
```
If no phone with the given number is found, the method returns `null`.
If the parameter is missing, `null` is also returned.

### Test 1: leila Hökki home number "12345678"
returns 
```json
{"firstname":"Leila", "lastname":"Hökki"}
```

### Test 2: Matt River work number "2468159"
returns 
```json
{"firstname":"Matt","lastname":"River"}
```

### Tests 1 and 2 combined
```js
const testValues = [
  // number          expected
  ["12345678", { "firstname": "Leila", "lastname": "Hökki" }],
  ["2468159", { "firstname": "Matt", "lastname": "River" }]
];
```

### Test 3: wrong number (non existing number)
call with number "0000"
returns `null`

### Test 4: misiing parameter
returns `null`
