"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const credentials_json_1 = require("./credentials.json");
console.log('merchantId:', credentials_json_1.merchantId, 'merchantKey:', credentials_json_1.merchantKey);
let client = new index_1.BrasPag.PagadorClient({
    environment: 'sandbox',
    merchantId: credentials_json_1.merchantId, merchantKey: credentials_json_1.merchantKey
});
function createRecurrentCreditCardTransaction() {
    client.createRecurrentCreditCardTransaction({
        MerchantOrderId: '',
        Customer: {
            Name: '',
            BirthDate: '',
            Email: '',
            Identity: '',
            IdentityType: '',
            Address: {
                Street: '', Number: '',
                Complement: '', City: '', District: '', State: '', ZipCode: '',
                Country: ''
            },
            DeliveryAddress: {}
        },
        Payment: {
            Provider: '',
            Type: 'CreditCard',
            Recurrent: true,
            Installments: 1,
            Amount: 10,
            RecurrentPayment: {
                AuthorizeNow: true,
            },
            CreditCard: {
                Brand: '',
                CardNumber: '',
                ExpirationDate: '',
                Holder: '',
                SecurityCode: ''
            }
        }
    });
}
