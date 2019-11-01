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
}
const endpoints = {
    Client3DS: { auth: { method: 'POST' as Method, url: '/v2/auth/token' } },
    PagadorClient: {
        createTransaction: { method: 'POST' as Method, url: '/v2/sales/' },
        capturePaymentTransaction: { method: 'PUT' as Method, url: '/v2/sales/{PaymentId}/capture' },
        cancelTransaction: { method: 'PUT' as Method, url: '/v2/sales/{PaymentId}/void', queryString: { amount: { required: false, validator: numberValidator } } },
        updateRecurrentCustomerInfo: { method: 'PUT' as Method, url: '/v2/RecurrentPayment/{RecurrentPaymentId}/Customer' },
        updateRecurrentEndDate: { method: 'PUT' as Method, url: '/v2/RecurrentPayment/{RecurrentPaymentId}/EndDate' },
        updateRecurrentInterval: { method: 'PUT' as Method, url: '/v2/RecurrentPayment/{RecurrentPaymentId}/Interval' },
        updateRecurrentRecurrencyDay: { method: 'PUT' as Method, url: '/v2/RecurrentPayment/{RecurrentPaymentId}/RecurrencyDay' },
        updateRecurrentAmount: { method: 'PUT' as Method, url: '/v2/RecurrentPayment/{RecurrentPaymentId}/Amount' },
        updateRecurrentNextPaymentDate: { method: 'PUT' as Method, url: '/v2/RecurrentPayment/{RecurrentPaymentId}/NextPaymentDate' },
        updateRecurrentPaymentInfo: { method: 'PUT' as Method, url: '/v2/RecurrentPayment/{RecurrentPaymentId}/Payment' },
        deactivateRecurrency: { method: 'PUT' as Method, url: '/v2/RecurrentPayment/{RecurrentPaymentId}/Deactivate' },
        reactivateRecurrency: { method: 'PUT' as Method, url: '/v2/RecurrentPayment/{RecurrentPaymentId}/Reactivate' },
        applePay: { method: 'POST' as Method, url: '/1/sales/' },
        samsungPay: { method: 'POST' as Method, url: '/1/sales/' },
        androidPay: { method: 'POST' as Method, url: '/1/sales/' },
        masterPass: { method: 'POST' as Method, url: '/1/sales/' },
        visaCheckout: { method: 'POST' as Method, url: '/1/sales/' },
        confirmTransaction: { method: 'POST' as Method, url: '/v2/sales/{PaymentId}/confirm' },

    }
}
function numberValidator(value: any) {

}
function toBraspagDateString(value: string | Date | number) {
    if (typeof value === 'string') return toBraspagDateString(new Date(Date.parse(value)));
    if (typeof value === 'number') return toBraspagDateString(new Date(value));
    if (Object.getPrototypeOf(value) === Date.prototype) {
        if (value.toJSON().match(/invalid/i)) throw new Error("Invalid date");
        return `${value.getFullYear()}-${(value.getMonth() + 1).toString().padStart(2, '0')}-${(value.getDate()).toString().padStart(2, '0')}`;
    }
    else throw new Error('Unexpected argument data type: ' + value);
}
function parseBrasPagDateStringToDate(value: string) {
    return new Date(Date.parse(value));
}
import axios, { AxiosStatic, AxiosInstance, Method } from 'axios';
export namespace BrasPag {
    export type BraspagEnvironment = 'sandbox' | 'production';
    export interface IParametersClient3DS {
        environment: BraspagEnvironment,
        clientId: string,
        clientSecret: string
    }
    export interface IParametersPagadorClient {
        environment: BraspagEnvironment,
        merchantId: string,
        merchantKey: string,

    }
    /**
         * 
         * @property EstablishmentCode   Código do Estabelecimento do Cielo E-Commerce 3.0	Numérico
         * 
         * [10 posições]
         *         
         * @property MerchantName	Nome do estabelecimento registrado na Cielo	Alfanumérico 
         * 
         * [até 25 posições]
         * 
         * @property MCC	Código de Categoria do estabelecimento	Numérico 
         * 
         * [4 posições]
         */
    export interface IClient3DS_AuthRequestParameters {

        /**
         * EstablishmentCode	Código do Estabelecimento do Cielo E-Commerce 3.0
         * 
         * Numérico [10 posições]
         */
        EstablishmentCode: string | number;
        /**
         * MerchantName	Nome do estabelecimento registrado na Cielo	Alfanumérico 
         * 
         * [até 25 posições]
         */
        MerchantName: string;
        /**
         * Código de Categoria do estabelecimento
         * 
         * Numérico [4 posições]
         */
        MCC: string | number;
    }
    /**
     * access_token	Token necessário para realizar a autenticação.	Alfanumérico [tamanho variável]
     * token_type	Fixo "bearer"	Alfanumérico
     * expires_in	Tempo em minutos para expirar o token	Numérico
     */
    export interface IClient3DS_AuthResponse {
        access_token: string;
        token_type: string;
        expires_in: number
    }
    export interface Address {
        Street?: string;
        Number?: string;
        Complement?: string;
        ZipCode?: string;
        City?: string;
        State?: string;
        Country?: string;
        District?: string;
    }
    export interface Customer {
        Name: string;
        Identity?: string;
        IdentityType?: string;
        Email?: string;
        BirthDate?: string;
        Address: Address;
        DeliveryAddress: Address;
    }
    export interface PaymentCredentials {
        code: string;
        key: string;
        password: string;
        username: string;
        signature: string;
    }
    export interface ExtraData {
        Name: string;
        Value: string;
    }

    export type TransactionRequestType = "CreditCard" | "DebitCard" | "Boleto" | "EletronicTransfer";
    export type BoletoProvider = "Bradesco2" | "BancoDoBrasil2" | "ItauShopline" | "Itau2" | "Santander2" | "Caixa2" | "CitiBank2" | "BankOfAmerica";
    export type TransferenciaEletronicaProvider = "Bradesco" | "BancoDoBrasil" | "SafetyPay" | "Itau";
    export type Moeda = "BRL" | "USD" | "MXN" | "COP" | "CLP" | "ARS" | "PEN" | "EUR" | "PYN" | "UYU" | "VEB" | "VEF" | "GBP";
    export type Interest = "ByMerchant" | "ByIssuer";
    export interface PaymentRequestBase {
        /**
         * 
         */
        //Provider: string;
        Type: TransactionRequestType;
        /**
         * Valor do Pedido (deve ser enviado em centavos)
         */
        Amount: number;

    }
    export interface CreditCardPaymentRequest extends PaymentRequestBase {
        /**
         * Nome da provedora de Meio de Pagamento
         */
        Provider: string;
        /**
         * Tipo do Meio de Pagamento
         */
        Type: "CreditCard";
        /**
         * Aplicável apenas para empresas aéreas. Montante do valor da autorização que deve ser destinado à taxa de serviço. 
         * 
         * Obs.: Esse valor não é adicionado ao valor da autorização
         */
        ServiceTaxAmount?: number;
        /**
         * Moeda na qual o pagamento será feito (BRL / USD / MXN / COP / CLP / ARS / PEN / EUR / PYN / UYU / VEB / VEF / GBP)
         */
        Currency?: Moeda;
        /**
         * País na qual o pagamento será feito
         */
        Country?: string;
        /**
         * Número de Parcelas
         */
        Installments: number;
        /**
         * 	Tipo de parcelamento - Loja (ByMerchant) ou Emissor (ByIssuer)
         */
        Interest?: Interest;
        /**
         * Booleano que indica se a autorização deve ser com captura automática (true) ou não (false). 
         * 
         * Deverá verificar junto à adquirente a disponibilidade desta funcionalidade
         */
        Capture?: boolean;
        /**
         * Booleano que indica se a transação deve ser autenticada (true) ou não (false). 
         * 
         * Deverá verificar junto à adquirente a disponibilidade desta funcionalidade
         */
        Authenticate?: boolean;
        /**
         * Booleano que indica se a transação é do tipo recorrente (true) ou não (false). 
         * 
         * Este com valor true não originará uma nova Recorrência, apenas permitirá a realização de uma transação sem a necessidade de envio do CVV. 
         * 
         * Somente para transações Cielo. 
         * 
         * Authenticate deve ser false quando Recurrent é true
         */
        Recurrent?: boolean;
        /**
         * Texto que será impresso na fatura do portador
         */
        SoftDescriptor?: string;
        /**
         * Booleano que indica se a transação será dividida entre várias contas (true) ou não (false)
         */
        DoSplit: boolean;
        /**
         * Lista de Campos Extras
         */
        ExtraDataCollection: Array<ExtraData>;
    }
    export interface DebitCardPaymentRequest extends PaymentRequestBase {

    }
    export interface BoletoPaymentRequest extends PaymentRequestBase {
        type: "Boleto",
    }
    export interface PaymentDefaultAuthentication {
        Authenticate: true;
        ReturnUrl: string;
    }
    export interface PaymentExternalAuthentication {
        ExternalAuthentication: ExternalAuthentication

    }
    export interface EletronicTransferRequestBeneficiary {
        Bank: string;
    }
    export interface EletronicTransferRequestShopper {
        Branch: string,
        Account: string
    }
    export interface EletronicTransferPaymentRequest extends PaymentRequestBase {
        type: "EletronicTransfer",
        Shopper: EletronicTransferRequestShopper
    }

    export interface RecurrentCreditCardPaymentRequest extends PaymentRequestBase  {

    }
    export interface RecurrentDebitCardPaymentRequest extends PaymentRequestBase  {

    }
    export interface EWalletPaymentRequest extends PaymentRequestBase  {

    }
    export interface VoucherPaymentRequest extends PaymentRequestBase  {

    }

    export interface PaymentRequest {
        Provider: string;
        Type: string;
        Amount: number;
        Currency: string;
        Country: string;
        Installments: number;
        Interest: string;
        Capture: boolean;
        Authenticate: boolean;
        Recurrent: boolean;
        SoftDescriptor: string;
        DoSplit: boolean;
        CreditCard?: CreditCard;
        DebitCard: DebitCard;
        Credentials: PaymentCredentials;
        ExtraDataCollection: Array<ExtraData>;
        ExternalAuthentication?: ExternalAuthentication;


        RecurrentPayment: RecurrentPaymentRequest;
    }
    export interface CreditCard {
        CardNumber: string;
        Holder: string;
        ExpirationDate: string;
        SecurityCode: string;
        Brand: string;
        SaveCard: boolean;
        Alias: string;
    }
    export interface DebitCard {
        CardNumber: string;
        Holder: string;
        ExpirationDate: string;
        SecurityCode: string;
        Brand: string;
    }
    interface IPagadorClient_CreateTransactionRequestBase<TPaymentRequest> {

        RequestId: string;
        /**
         * Required!
         */
        MerchantOrderId: string;
        /**
         * Required!
         */
        Customer: Customer;
        /**
         * Required!
         */
        Payment: TPaymentRequest
    }
    export interface IPagadorClient_CreateTransactionRequestParameters {
        RequestId: string;
        /**
         * Required!
         */
        MerchantOrderId: string;
        /**
         * Required!
         */
        Customer: Customer;
        /**
         * Required!
         */
        Payment: PaymentRequest;
    }

    export interface IPagadorClient_CreateCreditCardTransactionRequestParameters extends IPagadorClient_CreateTransactionRequestBase<CreditCardPaymentRequest> {

    }
    export interface IPagadorClient_CreateRecurrentCreditCardTransactionRequestParameters extends IPagadorClient_CreateTransactionRequestBase<RecurrentCreditCardPaymentRequest> {

    }
    export interface IPagadorClient_CreateDebitCardTransactionRequestParameters extends IPagadorClient_CreateTransactionRequestBase<DebitCardPaymentRequest> {

    }
    export interface IPagadorClient_CreateRecurrentDebitTransactionRequestParameters extends IPagadorClient_CreateTransactionRequestBase<RecurrentDebitCardPaymentRequest> {

    }
    export interface IPagadorClient_CreateEletronicTransferTransactionRequestParameters extends IPagadorClient_CreateTransactionRequestBase<EletronicTransferPaymentRequest> {

    }
    export interface IPagadorClient_CreateEWalletTransactionRequestParameters extends IPagadorClient_CreateTransactionRequestBase<EWalletPaymentRequest> {

    }
    export interface IPagadorClient_CreateVoucherTransactionRequestParameters extends IPagadorClient_CreateTransactionRequestBase<VoucherPaymentRequest> {

    }
    export interface VelocityAnalysisResult {
        Id: string;
        ResultMessage: string;
        Score: number;
    }
    export interface BrasPagLink {
        Method: string;
        Rel: string;
        Href: string;
    }
    export interface RecurrentPaymentResponse {
        RecurrentPaymentId: string;
        ReasonCode: number;
        ReasonMessage: string;
        NextRecurrency: string;
        EndDate: string;
        Interval: RecurrentPaymentInterval;
    }
    export interface PaymentResponseBase {

    }
    export interface CreditCardPaymentResponse extends PaymentResponseBase {

    }
    export interface DebitCardPaymentResponse extends PaymentResponseBase {

    }
    export interface BoletoPaymentResponse extends PaymentResponseBase {

    }
    export interface PaymentResponse {
        ServiceTaxAmount: number;
        Installments: number;
        Interest: string;
        Capture: boolean;
        Authenticate: boolean;
        Recurrent: boolean;
        DoSplit: boolean;
        CreditCard: CreditCard;
        Credentials: PaymentCredentials;
        ProofOfSale: string;
        AcquirerTransactionId: string;
        AuthorizationCode: string;
        SoftDescriptor: string;
        VelocityAnalysis?: VelocityAnalysisResult;
        PaymentId: string;
        Type: string;
        Amount: number;
        ReceivedDate: string;
        CapturedAmount: number;
        CapturedDate: string;
        Currency: string;
        Country: string;
        Provider: string;
        ExtraDataCollection: Array<ExtraData>;
        ReasonCode: number;
        ReasonMessage: string;
        Status: number;
        ProviderReturnCode: string;
        ProviderReturnMessage: string;
        Links: Array<BrasPagLink>;

        RecurrentPayment: RecurrentPaymentResponse
    }
    export interface ExternalAuthentication {
        Cavv: string;
        Xid: string;
        Numero: number;
    }
    export interface VelocityAnalysisRejectReason {
        RuleId: number,
        Message: string
    }
    export interface VelocityAnalysis {
        Id: string;
        ResultMessage: string;
        Score: number;
        RejectReasons: Array<VelocityAnalysisRejectReason>;
    }
    export type RecurrentPaymentInterval = "Monthly" | "Bimonthly" | "Quarterly" | "SemiAnnual" | "Annual";
    export interface RecurrentPaymentRequest {
        AuthorizeNow: string,
        EndDate: string,
        /**
         * Default: Monthly
         */
        Interval?: RecurrentPaymentInterval,
        StartDate?: string
    }
    export interface IPagadorClient_CreateTransactionResponse {
        AcquirerTransactionId: string;
        ProofOfSale: string;
        AuthorizationCode: string;
        PaymentId: string;
        ReceivedDate: string;
        CapturedDate: string;
        CapturedAmount: number;
        ECI: string;
        ReasonCode: string;
        ReasonMessage: string;
        Status: number;
        ProviderReturnCode: string;
        ProviderReturnMessage: string;

        MerchantOrderId: string;
        Customer: Customer;
        AuthenticationUrl?: string;
        Provider: string;
        ReturnUrl: string;
        Currency: string;
        Country: string;
        VelocityAnalysis: VelocityAnalysis;

        BoletoNumber: string;
        Assignor: string;
        Demonstrative: string;
        ExpirationDate: string;
        Identification: string;
        Instructions: string;
        DaysToFine: number;
        FineRate: number;
        FineAmount: number;
        DaysToInterest: number;
        InterestRate: number;
        InterestAmount: number;

    }
    export interface IPagadorClient_PaymentCaptureRequestParameters {
        PaymentId: string;
        Amount?: number;
        ServiceTaxAmount?: number;
    }
    export interface IPagadorClient_PaymentCaptureResponse {
        Status: number;
        ReasonCode: string;
        ReasonMessage: string;
        ProviderReasonCode: string;
        ProviderReasonMessage: string;
        Links: Array<BrasPagLink>;
    }
    export interface IPagadorClient_CancelTransactionRequestParameters {
        amount?: number
    }
    export interface IPagadorClient_CancelTransactionResponse {
        Status: number;
        ReasonCode: string;
        ReasonMessage: string;
        ProviderReasonCode: string;
        ProviderReasonMessage: string;
        Links: Array<BrasPagLink>;
    }
    export interface IPagadorClient_UpdateRecurrentCustomerInfoRequestParameters extends Customer {
    }
    export interface IPagadorClient_UpdateRecurrentCustomerInfoResponse {

    }
    export interface IPagadorClient_RequestFailureError {
        Code: number,
        Message: string
    }
    export interface IPagadorClient_RequestFailureResponse {
        status: number,
        errors: Array<IPagadorClient_RequestFailureError>
    }
    export class Client3DS {
        constructor(parameters: IParametersClient3DS) {

        }
        public auth(params: IClient3DS_AuthRequestParameters) {
            return new Promise<IClient3DS_AuthResponse>((resolve, reject) => {

            });
        }
    }
    export class PagadorClient {
        private transactionRequester: AxiosInstance;
        private retrievalRequester: AxiosInstance;
        constructor(parameters: IParametersPagadorClient) {
            this.transactionRequester = axios.create({
                baseURL: baseUrl.PagadorClient[parameters.environment].transaction,
                headers: {
                    'content-type': 'application/json',
                    'MerchantId': parameters.merchantId,
                    'MerchantKey': parameters.merchantKey,
                }
            });
            this.retrievalRequester = axios.create({
                baseURL: baseUrl.PagadorClient[parameters.environment].retrieval,
                headers: {
                    'content-type': 'application/json',
                    'MerchantId': parameters.merchantId,
                    'MerchantKey': parameters.merchantKey,
                }
            });
        }
        private __request<T>(requester: AxiosInstance,
            parameters: { method: Method, url: string },
            data: any,
            requestId?: string,
            callback?: (err: any, resp: T) => void) {
            return new Promise<T | IPagadorClient_RequestFailureResponse>((resolve, reject) => {
                requester.request({
                    method: parameters.method,
                    url: parameters.url,
                    data,
                    headers: {

                    }
                })
                    .then(resp => {
                        resolve(resp.data || true);
                    })
                    .catch(e => {
                        if (e.response) {
                            if (e.response.data)
                                resolve({ status: e.response.status, errors: e.response.data } as any)
                            else
                                reject(e.response);
                        }
                        else reject(e);
                    });
            });
        }
        public createTransaction(data: IPagadorClient_CreateTransactionRequestParameters, requestId?: string) {
            return this.__request<IPagadorClient_CreateTransactionResponse>(this.transactionRequester, endpoints.PagadorClient.createTransaction, data, requestId);
        }
        public createCreditCardTransaction(data: IPagadorClient_CreateCreditCardTransactionRequestParameters, requestId?: string) {
            return this.__request<IPagadorClient_CreateTransactionResponse>(this.transactionRequester, endpoints.PagadorClient.createTransaction, data, requestId);
        }
        public createRecurrentCreditCardTransaction(data: IPagadorClient_CreateRecurrentCreditCardTransactionRequestParameters, requestId?: string) {
            return this.__request<IPagadorClient_CreateTransactionResponse>(this.transactionRequester, endpoints.PagadorClient.createTransaction, data, requestId);
        }
        public createDebitCardTransaction(data: IPagadorClient_CreateDebitCardTransactionRequestParameters, requestId?: string) {
            return this.__request<IPagadorClient_CreateTransactionResponse>(this.transactionRequester, endpoints.PagadorClient.createTransaction, data, requestId);
        }
        public createRecurrentDebitCardTransaction(data: IPagadorClient_CreateRecurrentDebitTransactionRequestParameters, requestId?: string) {
            return this.__request<IPagadorClient_CreateTransactionResponse>(this.transactionRequester, endpoints.PagadorClient.createTransaction, data, requestId);
        }
        public createEletronicTransferTransaction(data: IPagadorClient_CreateEletronicTransferTransactionRequestParameters, requestId?: string) {
            return this.__request<IPagadorClient_CreateTransactionResponse>(this.transactionRequester, endpoints.PagadorClient.createTransaction, data, requestId);
        }
        public createEWalletTransaction(data: IPagadorClient_CreateEWalletTransactionRequestParameters, requestId?: string) {
            return this.__request<IPagadorClient_CreateTransactionResponse>(this.transactionRequester, endpoints.PagadorClient.createTransaction, data, requestId);
        }
        public createVoucherTransaction(data: IPagadorClient_CreateVoucherTransactionRequestParameters, requestId?: string) {
            return this.__request<IPagadorClient_CreateTransactionResponse>(this.transactionRequester, endpoints.PagadorClient.createTransaction, data, requestId);
        }
        public capturePaymentTransaction(data: IPagadorClient_PaymentCaptureRequestParameters, requestId?: string) {
            return this.__request<IPagadorClient_PaymentCaptureResponse>(this.transactionRequester, endpoints.PagadorClient.capturePaymentTransaction, data, requestId);
        }
        public cancelTransaction(data: IPagadorClient_CancelTransactionRequestParameters, requestId?: string) {
            return this.__request<IPagadorClient_CancelTransactionResponse>(this.transactionRequester, endpoints.PagadorClient.cancelTransaction, data, requestId);
        }
        public updateRecurrentCustomerInfo(data: IPagadorClient_UpdateRecurrentCustomerInfoRequestParameters, requestId?: string) {
            return this.__request<IPagadorClient_UpdateRecurrentCustomerInfoResponse>(this.transactionRequester, endpoints.PagadorClient.updateRecurrentCustomerInfo, data, requestId);
        }
        public updateRecurrentEndDate(data: string | Date | number, requestId?: string) {
            if (typeof data === 'number') data = new Date(data);
            if (typeof data === 'string') data = new Date(Date.parse(data));
            //return this.__request<IPagadorClient_UpdateRecurrentCustomerInfoResponse>(this.transactionRequester, endpoints.PagadorClient.updateRecurrentEndDate, data, requestId);
            return new Promise<boolean>((resolve, reject) => {
            });
        }
        public updateRecurrentInterval(data: 1 | 2 | 3 | 6 | 12, requestId?: string) {
            return this.__request<boolean>(this.transactionRequester, endpoints.PagadorClient.updateRecurrentInterval, data, requestId);
        }
        public updateRecurrentRecurrencyDay(data: number, requestId?: string) {
            return this.__request<boolean>(this.transactionRequester, endpoints.PagadorClient.updateRecurrentRecurrencyDay, data, requestId);
        }
        public updateRecurrentAmount(data: number, requestId?: string) {
            return this.__request<boolean>(this.transactionRequester, endpoints.PagadorClient.updateRecurrentAmount, data, requestId);
        }
        public updateRecurrentNextPaymentDate(data: string | Date | number, requestId?: string) {
            return this.__request<boolean>(this.transactionRequester, endpoints.PagadorClient.updateRecurrentNextPaymentDate, data, requestId);
        }
        public updateRecurrentPaymentInfo(data: string | Date | number, requestId?: string) {
            return this.__request<boolean>(this.transactionRequester, endpoints.PagadorClient.updateRecurrentPaymentInfo, data, requestId);
        }

    }
};

export default BrasPag;