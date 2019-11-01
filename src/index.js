"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseUrl = {
    Client3DS: {
        sandbox: 'https://mpisandbox.braspag.com.br',
        production: 'https://mpi.braspag.com.br'
    },
    PagadorClient: {
        sandbox: {
            transaction: 'https://apisandbox.braspag.com.br',
            retrieval: 'https://apiquerysandbox.braspag.com.br'
        },
        production: {
            transaction: 'https://api.braspag.com.br',
            retrieval: 'https://apiquery.braspag.com.br'
        }
    }
};
const endpoints = {
    Client3DS: { auth: { method: 'POST', url: '/v2/auth/token' } },
    PagadorClient: {
        createTransaction: { method: 'POST', url: '/v2/sales/' },
        capturePaymentTransaction: { method: 'PUT', url: '/v2/sales/{PaymentId}/capture' },
        cancelTransaction: { method: 'PUT', url: '/v2/sales/{PaymentId}/void', queryString: { amount: { required: false, validator: numberValidator } } },
        updateRecurrentCustomerInfo: { method: 'PUT', url: '/v2/RecurrentPayment/{RecurrentPaymentId}/Customer' },
        updateRecurrentEndDate: { method: 'PUT', url: '/v2/RecurrentPayment/{RecurrentPaymentId}/EndDate' },
        updateRecurrentInterval: { method: 'PUT', url: '/v2/RecurrentPayment/{RecurrentPaymentId}/Interval' },
        updateRecurrentRecurrencyDay: { method: 'PUT', url: '/v2/RecurrentPayment/{RecurrentPaymentId}/RecurrencyDay' },
        updateRecurrentAmount: { method: 'PUT', url: '/v2/RecurrentPayment/{RecurrentPaymentId}/Amount' },
        updateRecurrentNextPaymentDate: { method: 'PUT', url: '/v2/RecurrentPayment/{RecurrentPaymentId}/NextPaymentDate' },
        updateRecurrentPaymentInfo: { method: 'PUT', url: '/v2/RecurrentPayment/{RecurrentPaymentId}/Payment' },
        deactivateRecurrency: { method: 'PUT', url: '/v2/RecurrentPayment/{RecurrentPaymentId}/Deactivate' },
        reactivateRecurrency: { method: 'PUT', url: '/v2/RecurrentPayment/{RecurrentPaymentId}/Reactivate' },
        applePay: { method: 'POST', url: '/1/sales/' },
        samsungPay: { method: 'POST', url: '/1/sales/' },
        androidPay: { method: 'POST', url: '/1/sales/' },
        masterPass: { method: 'POST', url: '/1/sales/' },
        visaCheckout: { method: 'POST', url: '/1/sales/' },
        confirmTransaction: { method: 'POST', url: '/v2/sales/{PaymentId}/confirm' },
    }
};
function numberValidator(value) {
}
function toBraspagDateString(value) {
    if (typeof value === 'string')
        return toBraspagDateString(new Date(Date.parse(value)));
    if (typeof value === 'number')
        return toBraspagDateString(new Date(value));
    if (Object.getPrototypeOf(value) === Date.prototype) {
        if (value.toJSON().match(/invalid/i))
            throw new Error("Invalid date");
        return `${value.getFullYear()}-${(value.getMonth() + 1).toString().padStart(2, '0')}-${(value.getDate()).toString().padStart(2, '0')}`;
    }
    else
        throw new Error('Unexpected argument data type: ' + value);
}
function parseBrasPagDateStringToDate(value) {
    return new Date(Date.parse(value));
}
const axios_1 = require("axios");
var BrasPag;
(function (BrasPag) {
    class Client3DS {
        constructor(parameters) {
        }
        auth(params) {
            return new Promise((resolve, reject) => {
            });
        }
    }
    BrasPag.Client3DS = Client3DS;
    class PagadorClient {
        constructor(parameters) {
            this.transactionRequester = axios_1.default.create({
                baseURL: baseUrl.PagadorClient[parameters.environment].transaction,
                headers: {
                    'content-type': 'application/json',
                    'MerchantId': parameters.merchantId,
                    'MerchantKey': parameters.merchantKey,
                }
            });
            this.retrievalRequester = axios_1.default.create({
                baseURL: baseUrl.PagadorClient[parameters.environment].retrieval,
                headers: {
                    'content-type': 'application/json',
                    'MerchantId': parameters.merchantId,
                    'MerchantKey': parameters.merchantKey,
                }
            });
        }
        __request(requester, parameters, data, requestId, callback) {
            return new Promise((resolve, reject) => {
                requester.request({
                    method: parameters.method,
                    url: parameters.url,
                    data,
                    headers: {}
                })
                    .then(resp => {
                    resolve(resp.data || true);
                })
                    .catch(e => {
                    if (e.response) {
                        if (e.response.data)
                            resolve({ status: e.response.status, errors: e.response.data });
                        else
                            reject(e.response);
                    }
                    else
                        reject(e);
                });
            });
        }
        createTransaction(data, requestId) {
            return this.__request(this.transactionRequester, endpoints.PagadorClient.createTransaction, data, requestId);
        }
        createCreditCardTransaction(data, requestId) {
            return this.__request(this.transactionRequester, endpoints.PagadorClient.createTransaction, data, requestId);
        }
        createRecurrentCreditCardTransaction(data, requestId) {
            return this.__request(this.transactionRequester, endpoints.PagadorClient.createTransaction, data, requestId);
        }
        createDebitCardTransaction(data, requestId) {
            return this.__request(this.transactionRequester, endpoints.PagadorClient.createTransaction, data, requestId);
        }
        createRecurrentDebitCardTransaction(data, requestId) {
            return this.__request(this.transactionRequester, endpoints.PagadorClient.createTransaction, data, requestId);
        }
        createEletronicTransferTransaction(data, requestId) {
            return this.__request(this.transactionRequester, endpoints.PagadorClient.createTransaction, data, requestId);
        }
        createEWalletTransaction(data, requestId) {
            return this.__request(this.transactionRequester, endpoints.PagadorClient.createTransaction, data, requestId);
        }
        createVoucherTransaction(data, requestId) {
            return this.__request(this.transactionRequester, endpoints.PagadorClient.createTransaction, data, requestId);
        }
        capturePaymentTransaction(data, requestId) {
            return this.__request(this.transactionRequester, endpoints.PagadorClient.capturePaymentTransaction, data, requestId);
        }
        cancelTransaction(data, requestId) {
            return this.__request(this.transactionRequester, endpoints.PagadorClient.cancelTransaction, data, requestId);
        }
        updateRecurrentCustomerInfo(data, requestId) {
            return this.__request(this.transactionRequester, endpoints.PagadorClient.updateRecurrentCustomerInfo, data, requestId);
        }
        updateRecurrentEndDate(data, requestId) {
            if (typeof data === 'number')
                data = new Date(data);
            if (typeof data === 'string')
                data = new Date(Date.parse(data));
            //return this.__request<IPagadorClient_UpdateRecurrentCustomerInfoResponse>(this.transactionRequester, endpoints.PagadorClient.updateRecurrentEndDate, data, requestId);
            return new Promise((resolve, reject) => {
            });
        }
        updateRecurrentInterval(data, requestId) {
            return this.__request(this.transactionRequester, endpoints.PagadorClient.updateRecurrentInterval, data, requestId);
        }
        updateRecurrentRecurrencyDay(data, requestId) {
            return this.__request(this.transactionRequester, endpoints.PagadorClient.updateRecurrentRecurrencyDay, data, requestId);
        }
        updateRecurrentAmount(data, requestId) {
            return this.__request(this.transactionRequester, endpoints.PagadorClient.updateRecurrentAmount, data, requestId);
        }
        updateRecurrentNextPaymentDate(data, requestId) {
            return this.__request(this.transactionRequester, endpoints.PagadorClient.updateRecurrentNextPaymentDate, data, requestId);
        }
        updateRecurrentPaymentInfo(data, requestId) {
            return this.__request(this.transactionRequester, endpoints.PagadorClient.updateRecurrentPaymentInfo, data, requestId);
        }
    }
    BrasPag.PagadorClient = PagadorClient;
})(BrasPag = exports.BrasPag || (exports.BrasPag = {}));
;
exports.default = BrasPag;
