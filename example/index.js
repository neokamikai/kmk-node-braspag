const { PagadorClient } = require('../index').BrasPag;
const { merchantId, merchantKey } = require('./credentials.json');
console.log('merchantId:', merchantId, 'merchantKey:', merchantKey);
let client = new PagadorClient({
    environment: 'sandbox',
    merchantId, merchantKey
});
process.stdin.on('data', (e) => {
    let s = e.toString().trim();
    switch (s) {
        case 'create-transaction':
            console.log(s);
            createCreditCardTransactionTask();
            break;

        default:
            break;
    }
});
function createCreditCardTransactionTask() {
    /*
        client.createCreditCardTransaction({
            MerchantOrderId: 'teste',
            Customer: {
                Name: 'Comprador de Teste'
            },
            Payment: {
                Provider: 'Simulado',
                Type: 'CreditCard',
                Installments: 1,
                Amount: 10,
                Authenticate: false,
                CreditCard: {
                }
            }
        })
            .then(v => console.log('then:', v))
            .catch(e => console.log('catch:', e));*/
    client.createRecurrentCreditCardTransaction({
        MerchantOrderId: 'teste',
        Customer: {
            Name: 'Comprador de Teste'
        },
        Payment: {
            Type: 'CreditCard',
            Installments: 1,
            Amount: 10,
            Authenticate: true,
            CreditCard: {
            }
        }
    })
        .then(v => {
            console.log('then:', v);
        })
}
createCreditCardTransactionTask();
