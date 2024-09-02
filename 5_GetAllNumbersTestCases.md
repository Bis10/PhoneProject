# Test cases for the getAllNumbers

## **getAllNumbers()**

Returns all phone numbers in an array, each as an object of form:

```json
{ "firstname": "", "lastname": "", "phones": [] }
```

The phone object in phones array is of form:

```json
{ "type": "", "number": "" }
```

If the person doesn't have a phone (the phones field is an empty array), then the person is not added into the result array.

If all persons are missing, an empty array is returned.

### Test 1: 
