'use strict';

module.exports = class PhoneRegister{
    #register
    constructor(data){
        if(!data){
            throw new Error('phone data missing');
        }
        this.#register = data;
    }

    getTypes(){
        const foundTypes = [];
        for (const person of this.#register){
            for(const phone of person.phones){
                if(!foundTypes.includes(phone.type)){
                    foundTypes.push(phone.type);
            }
        }
    }
        return foundTypes;
    }
    
}