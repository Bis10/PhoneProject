"use strict";

module.exports = class PhoneRegister {
  #register;
  constructor(data) {
    if (!data) {
      throw new Error("phone data missing");
    }
    this.#register = data;
  }

  getTypes() {
    const foundTypes = [];
    for (const person of this.#register) {
      for (const phone of person.phones) {
        if (!foundTypes.includes(phone.type)) {
          foundTypes.push(phone.type);
        }
      }
    }
    return foundTypes;
  }
  //   getPersonsNumberByType(firstname, lastname, type) {
  //     if (arguments.length < 3) {
  //       throw new Error("missing parameter");
  //     }
  //     const numbersFound = [];
  //     for (const person of this.#register) {
  //       if (person.firstname === firstname && person.lastname === lastname) {
  //         for (const phone of person.phones) {
  //           if (phone.type === type) {
  //             numbersFound.push(phone.number);
  //           }
  //         }
  //       }
  //     }
  //     return numbersFound;
  //   }

  getPersonsNumberByType(firstname, lastname, type) {
    if (arguments.length < 3) {
      throw new Error("missing parameter");
    }
    const numbersFound = [];
    for (const person of this.#register) {
      if (person.firstname === firstname && person.lastname === lastname) {
        for (const phone of person.phones) {
          if (phone.type === type) {
            numbersFound.push(phone.number);
          }
        }
        return numbersFound;
      }
    }
    return numbersFound;
  }

  getAllNumbersByType(type) {
    if (arguments.length < 1) {
      throw new Error("missing parameter");
    }
    const numbersFound = [];
    for (const person of this.#register) {
      for (const phone of person.phones) {
        if (phone.type === type) {
          numbersFound.push({
            firstname: person.firstname,
            lastname: person.lastname,
            number: {
              type: phone.type,
              tel: phone.number,
            },
          });
        }
      }
    }
    return numbersFound;
  }

  getAllNumbers() {
    const foundPersons = []; // persons with phones
    for (const person of this.#register) {
      if (person.phones.length > 0) {
        foundPersons.push(person);
      }
    }
    return foundPersons;
  }

  //   getName(number){
  //     for(const person of this.#register){
  //         for(const phone of person.phones){
  //             if(phone.number===number){
  //                 return {
  //                     firstname: person.firstname,
  //                     lastname: person.lastname,
  //                 };
  //             }
  //         }
  //     }
  //     return null;
  //   }
  getName(number) {
    if(arguments.length<1){
        return null;
    }
    for (const person of this.#register) {
      for (const phone of person.phones) {
        if (phone.number === number) {
          return {
            firstname: person.firstname,
            lastname: person.lastname,
          };
        }
      }
    }
    return null;
  }
}; //End of the class
