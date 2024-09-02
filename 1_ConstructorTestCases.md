# Test cases for the constructor

## **constructor(data)**

The data from phones.json (or another test json file) array is passed as a parameter `data`. If the parameter is missing, throws an exception `'phone data missing'`.

### Test 1: missing parameter throw an exception

```js
new PhoneRegister();
```

expect: This will throw an exception `'phone data missing'`