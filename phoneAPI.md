# Phone API

## data
Data will be in a json file. A person can be in the data array only once. Names are unique so for example Leila Hökki can't exist twice in the json. Phone number is unique and can be only once in the json file. We also assume that the json file is valid and no fields are missing, the number can't be an empty string and type may not be null or undefined. 
Type may be an empty string.

### phones.json (default)

```json
[
    {
        "firstname":"Leila",
        "lastname":"Hökki",
        "phones":[
            {"type":"home", "number":"12345678"},
            {"type":"work", "number":"987654321"},
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
    },
    {
        "firstname":"Matt",
        "lastname":"River",
        "phones":[]
    }
]
```

## Class PhoneRegister

## **constructor(data)**




### **getTypes()**

returns all phone types in an array. The type is added to the result array only once. If the are no phones or no persons, an empty array [] is returned. Type may be an empty string.

For example:

```json
["home","work","mobile"]
```

### **getPersonsNumbersByType(firstname, lastname, type)**

Method returns an array of phone numbers of given `type` belonging to given person with `firstname` and `lastname`.

For example Leila Hökki and work returns
```json
["987654321","05040302"]
```

and Matt River and mobile returns
```json
["0409812345"]
```

If  no person with given name is found, an empty array [] is returned.
If no number with given type is found, an empty array [] is returned.
If at least one parameter is missing, an exception `'missing parameter'` is thrown.

### **getAllNumbersByType(type)**

Returns an array of objects consisting of names and numbers of given type. If no number of given type is found, an empty array [] is returned. If a person have multiple numbers of given type, aeach of them will be in it's own object.

If the parameter is missing, throws an exception `'missing parameter'`.

The format of the returned object is:

```json
{"firstname":"","lastname":"","number":{"type":"", "tel":""}}
```

For example `type` work:

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

### **getAllNumbers()**

Returns all phone numbers in an array, each as an object of form:
```json
{"firstname": "", "lastname": "", "phones":[]}
```
The phone object in phones array is of form:
```json
{"type":"", "number":""}
```

If the person doesn't have a phone (the phones field is an empty array), then the person is not added into the result array.

If all persons are missing, an empty array is returned.


### **getName(number)**

This method searches the given phone number from the registry. If the number is found, method returns the owner of that number as an object:

```json
{"firstname":"", "lastname":""}
```
If no phone with the given number is found, the method returns `null`.
If the parameter is missing, `null` is also returned.