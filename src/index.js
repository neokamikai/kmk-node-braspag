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
        capturePaymentTransaction: (PaymentId) => ({ method: 'PUT', url: `/v2/sales/${encodeURIComponent(PaymentId)}/capture` }),
        cancelTransaction: (PaymentId) => ({ method: 'PUT', url: `/v2/sales/${encodeURIComponent(PaymentId)}/void`, queryString: { amount: { required: false, validator: numberValidator } } }),
        updateRecurrentCustomerInfo: (RecurrentPaymentId) => ({ method: 'PUT', url: `/v2/RecurrentPayment/${encodeURIComponent(RecurrentPaymentId)}/Customer` }),
        updateRecurrentEndDate: (RecurrentPaymentId) => ({ method: 'PUT', url: `/v2/RecurrentPayment/${encodeURIComponent(RecurrentPaymentId)}/EndDate` }),
        updateRecurrentInterval: (RecurrentPaymentId) => ({ method: 'PUT', url: `/v2/RecurrentPayment/${encodeURIComponent(RecurrentPaymentId)}/Interval` }),
        updateRecurrentRecurrencyDay: (RecurrentPaymentId) => ({ method: 'PUT', url: `/v2/RecurrentPayment/${encodeURIComponent(RecurrentPaymentId)}/RecurrencyDay` }),
        updateRecurrentAmount: (RecurrentPaymentId) => ({ method: 'PUT', url: `/v2/RecurrentPayment/${encodeURIComponent(RecurrentPaymentId)}/Amount` }),
        updateRecurrentNextPaymentDate: (RecurrentPaymentId) => ({ method: 'PUT', url: `/v2/RecurrentPayment/${encodeURIComponent(RecurrentPaymentId)}/NextPaymentDate` }),
        updateRecurrentPaymentInfo: (RecurrentPaymentId) => ({ method: 'PUT', url: `/v2/RecurrentPayment/${encodeURIComponent(RecurrentPaymentId)}/Payment` }),
        deactivateRecurrency: (RecurrentPaymentId) => ({ method: 'PUT', url: `/v2/RecurrentPayment/${encodeURIComponent(RecurrentPaymentId)}/Deactivate` }),
        reactivateRecurrency: (RecurrentPaymentId) => ({ method: 'PUT', url: `/v2/RecurrentPayment/${encodeURIComponent(RecurrentPaymentId)}/Reactivate` }),
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
            if (data) {
                if (data.Payment) {
                    if (data.Payment.Recurrent !== true)
                        data.Payment.Recurrent = true;
                }
            }
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
        createBoletoTransaction(data, requestId) {
            return this.__request(this.transactionRequester, endpoints.PagadorClient.createTransaction, data, requestId);
        }
        createEWalletTransaction(data, requestId) {
            return this.__request(this.transactionRequester, endpoints.PagadorClient.createTransaction, data, requestId);
        }
        createVoucherTransaction(data, requestId) {
            return this.__request(this.transactionRequester, endpoints.PagadorClient.createTransaction, data, requestId);
        }
        capturePaymentTransaction(PaymentId, data, requestId) {
            return this.__request(this.transactionRequester, endpoints.PagadorClient.capturePaymentTransaction(PaymentId), data, requestId);
        }
        cancelTransaction(PaymentId, data, requestId) {
            return this.__request(this.transactionRequester, endpoints.PagadorClient.cancelTransaction(PaymentId), data, requestId);
        }
        updateRecurrentCustomerInfo(RecurrentPaymentId, data, requestId) {
            return this.__request(this.transactionRequester, endpoints.PagadorClient.updateRecurrentCustomerInfo(RecurrentPaymentId), data, requestId);
        }
        updateRecurrentEndDate(RecurrentPaymentId, EndDate, requestId) {
            if (typeof EndDate === 'number')
                EndDate = new Date(EndDate);
            if (typeof EndDate === 'string')
                EndDate = new Date(Date.parse(EndDate));
            return this.__request(this.transactionRequester, endpoints.PagadorClient.updateRecurrentEndDate(RecurrentPaymentId), EndDate, requestId);
        }
        /**
         *
         * @param RecurrentPaymentId
         * @param Interval 1 = Monthly; 2 = Bimonthly; 3 = Quartermonthly; 6 = Semimonthly; Annually
         * @param requestId
         */
        updateRecurrentInterval(RecurrentPaymentId, Interval, requestId) {
            return this.__request(this.transactionRequester, endpoints.PagadorClient.updateRecurrentInterval(RecurrentPaymentId), Interval, requestId);
        }
        updateRecurrentRecurrencyDay(RecurrentPaymentId, RecurrencyDay, requestId) {
            return this.__request(this.transactionRequester, endpoints.PagadorClient.updateRecurrentRecurrencyDay(RecurrentPaymentId), RecurrencyDay, requestId);
        }
        updateRecurrentAmount(RecurrentPaymentId, data, requestId) {
            return this.__request(this.transactionRequester, endpoints.PagadorClient.updateRecurrentAmount(RecurrentPaymentId), data, requestId);
        }
        updateRecurrentNextPaymentDate(RecurrentPaymentId, data, requestId) {
            return this.__request(this.transactionRequester, endpoints.PagadorClient.updateRecurrentNextPaymentDate(RecurrentPaymentId), data, requestId);
        }
        updateRecurrentPaymentInfo(RecurrentPaymentId, data, requestId) {
            return this.__request(this.transactionRequester, endpoints.PagadorClient.updateRecurrentPaymentInfo(RecurrentPaymentId), data, requestId);
        }
    }
    BrasPag.PagadorClient = PagadorClient;
})(BrasPag = exports.BrasPag || (exports.BrasPag = {}));
;
exports.default = BrasPag;
