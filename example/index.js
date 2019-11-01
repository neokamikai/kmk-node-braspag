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
            createTransactionTask();
            break;

        default:
            break;
    }
});
function createTransactionTask() {
    client.createTransaction({
        MerchantOrderId: 'teste',
        Customer: {
            Name: 'Comprador de Teste'
        },
        Payment: {
            Provider: 'Simulado',
            Type: 'CreditCard',
            Installments: 1,
            CreditCard: {
                Alias: 'Teste'
            }
        }
    })
        .then(v => console.log('then:', v))
        .catch(e => console.log('catch:', e));
}
createTransactionTask();