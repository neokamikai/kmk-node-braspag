import { BrasPag } from '../index';

import { merchantId, merchantKey } from './credentials.json';
console.log('merchantId:', merchantId, 'merchantKey:', merchantKey);
let client = new BrasPag.PagadorClient({
	environment: 'sandbox',
	merchantId, merchantKey
});
function createRecurrentCreditCardTransaction() {
	client.createRecurrentCreditCardTransaction({
		MerchantOrderId:'',
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
			DeliveryAddress: {

			}
		},
		Payment: {
			Provider:'',
			Type:'CreditCard',
			Recurrent:true,
			Installments:1,
			Amount:10,
			RecurrentPayment: {
				AuthorizeNow:true,

			},
			CreditCard: {
				Brand:'',
				CardNumber:'',
				ExpirationDate:'',
				Holder:'',
				SecurityCode:''
			}
		}
	})
}
