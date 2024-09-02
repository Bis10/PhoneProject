# Test cases for the getAllNumbersByType

## **getAllNumbersByType(type)**

Returns an array of objects consisting of names and numbers of given type. If no number of given type is found, an empty array [] is returned. If a person have multiple numbers of given type, each of them will be in it's own object.

If the parameter is missing, throws an exception `'missing parameter'`.

The format of the returned object is:

```json
{ "firstname": "", "lastname": "", "number": { "type": "", "tel": "" } }
```

For example `type` work:

```json
[
  {
    "firstname": "Leila",
    "lastname": "Hökki",
    "number": { "type": "work", "tel": "987654321" }
  },
  {
    "firstname": "Leila",
    "lastname": "Hökki",
    "number": { "type": "work", "tel": "05040302" }
  },
  {
    "firstname": "Matt",
    "lastname": "River",
    "number": { "type": "work", "tel": "2468159" }
  }
]
```

### Test 1: type:mobile

Test uses the default data

````js
const register = new PhoneRegister(defaultData);
register.getAllNumbersByType('mobile');

returns

```json
[
    { "firstname": "Matt", "lastname": "River",
"number": {"type": "mobile", "tel": "0409812345"}}
]
```

### Test 2: type:work
Test uses the default data

returns
```json
[
   {"firstname":"Leila","lastname":"Hökki",
     "number":{"type":"work", "tel":"987654321"}},
   {"firstname":"Leila","lastname":"Hökki",
     "number":{"type":"work", "tel":"05040302"}},
   {"firstname":"Matt","lastname":"River",
     "number":{"type":"work", "tel":"2468159"}}
]
```

### Test 3: type:x
Test uses the default data

```js
const register = new PhoneRegister(defaultData);
register.getAllNumbersByType('x');

returns []
```

### Test 4: Missing parameter
Test uses the default data

```js
const register = new PhoneRegister(defaultData);
register.getAllNumbersByType();
```

throws an exception `'missing parameter`

### Test 5: Testing type ""

#### 5.1: testing with default data
```js
const register = new PhoneRegister(defaultData);
register.getAllNumbersByType('');

returns []
```
#### 5.2: testing with modified data
Using modified data:
 modified test data 
 ```json
 
    {
        "firstname":"Leila",
        "lastname":"Hökki",
        "phones":[
            {"type":"home", "number":"12345678"},
            {"type":"", "number":"987654321"},
            {"type":"work", "number":"05040302"}
        ]
    },
    {
        "firstname":"Matt",
        "lastname":"River",
        "phones":[
            {"type":"home","number":"56743290"},
            {"type":"mobile","number":"0409812345"},
            {"type":"work", "number":"2468159"}
        ]
    }
    ]
 ```
 ```js
const register = new PhoneRegister(modifiedData);
register.getAllNumbersByType('');

returns 
```json
[
  {
    "firstname": "Leila",
    "lastname": "Hökki",
    "number": { "type": "", "tel": "987654321" }
  }
]
```

