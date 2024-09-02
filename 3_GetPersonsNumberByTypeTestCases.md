# Test cases for the getPersonsNumbersByType

### **getPersonsNumbersByType(firstname, lastname, type)**

Method returns an array of phone numbers of given `type` belonging to given person with `firstname` and `lastname`.

For example Leila Hökki and work returns

```json
["987654321", "05040302"]
```

and Matt River and mobile returns

```json
["0409812345"]
```

If no person with given name is found, an empty array [] is returned.
If no number with given type is found, an empty array [] is returned.
If at least one parameter is missing, an exception `'missing parameter'` is thrown.

### Test 1: Leila Hökki and work

Test uses the default data

Create register with default data.

````js
const register = new PhoneRegister(defaultData);
register.getPersonsNumbersByType('Leila', 'Hökki', 'work');

expect
```json
["987654321","05040302"]
````

to be returned

### Test 2: Matt River and mobile

Test uses the default data

```js
const register = new PhoneRegister(defaultData);
register.getPersonsNumbersByType("Matt", "River", "mobile");
```

and Matt River and mobile returns

```json
["04009812345"]
```

to be returned

### Test 3: Wrong name or type

Test uses the default data

test with values

#### 3.1: firstname Matt, lastname x, type

mobile

```js
const register = new PhoneRegister(defaultData);
register.getPersonsNumbersByType("Matt", "x", "mobile");
```

#### 3.2: firstname x, lastname River, type mobile

```js
const register = new PhoneRegister(defaultData);
register.getPersonsNumbersByType("", "River", "mobile");
```

#### 3.3: firstname Matt, lastname River, type x

```js
const register = new PhoneRegister(defaultData);
register.getPersonsNumbersByType("Matt", "River", "x");
```

returns []

### Test 4: parameter missing

Test uses the default data

#### 4.1: One parameter missing: `Matt`, `river`

```js
const register = new PhoneRegister(defaultData);
register.getPersonsNumbersByType("Matt", "River");
```

#### 4.1:Two parameters missing: `Matt`

```js
const register = new PhoneRegister(defaultData);
register.getPersonsNumbersByType("Matt");
```

#### 4.3: All parameters missing:

```js
const register = new PhoneRegister(defaultData);
register.getPersonsNumbersByType();
```

expect to throw an exception `'missing parameter'`

### Test 5: testing empty string as type

test data

```json
[
  {
    "firstname": "Leila",
    "lastname": "Hökki",
    "phones": [
      { "type": "home", "number": "12345678" },
      { "type": "", "number": "987654321" },
      { "type": "work", "number": "05040302" }
    ]
  },
  {
    "firstname": "Matt",
    "lastname": "River",
    "phones": [
      { "type": "home", "number": "56743290" },
      { "type": "mobile", "number": "0409812345" },
      { "type": "work", "number": "2468159" }
    ]
  }
]
```

#### Get Leila Hökki ""

expect this to return

```json
["987654321"]
```
