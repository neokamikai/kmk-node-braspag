export declare namespace BrasPag {
    export type BraspagEnvironment = 'sandbox' | 'production';
    export interface IParametersClient3DS {
        environment: BraspagEnvironment;
        clientId: string;
        clientSecret: string;
    }
    export interface IParametersPagadorClient {
        environment: BraspagEnvironment;
        merchantId: string;
        merchantKey: string;
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
        expires_in: number;
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
        type: "Boleto";
    }
    export interface PaymentDefaultAuthentication {
        Authenticate: true;
        ReturnUrl: string;
    }
    export interface PaymentExternalAuthentication {
        ExternalAuthentication: ExternalAuthentication;
    }
    export interface EletronicTransferRequestBeneficiary {
        Bank: string;
    }
    export interface EletronicTransferRequestShopper {
        Branch: string;
        Account: string;
    }
    export interface EletronicTransferPaymentRequest extends PaymentRequestBase {
        type: "EletronicTransfer";
        Shopper: EletronicTransferRequestShopper;
    }
    export interface RecurrentCreditCardPaymentRequest extends PaymentRequestBase {
    }
    export interface RecurrentDebitCardPaymentRequest extends PaymentRequestBase {
    }
    export interface EWalletPaymentRequest extends PaymentRequestBase {
    }
    export interface VoucherPaymentRequest extends PaymentRequestBase {
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
        Payment: TPaymentRequest;
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
        RecurrentPayment: RecurrentPaymentResponse;
    }
    export interface ExternalAuthentication {
        Cavv: string;
        Xid: string;
        Numero: number;
    }
    export interface VelocityAnalysisRejectReason {
        RuleId: number;
        Message: string;
    }
    export interface VelocityAnalysis {
        Id: string;
        ResultMessage: string;
        Score: number;
        RejectReasons: Array<VelocityAnalysisRejectReason>;
    }
    export type RecurrentPaymentInterval = "Monthly" | "Bimonthly" | "Quarterly" | "SemiAnnual" | "Annual";
    export interface RecurrentPaymentRequest {
        AuthorizeNow: string;
        EndDate: string;
        /**
         * Default: Monthly
         */
        Interval?: RecurrentPaymentInterval;
        StartDate?: string;
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
        amount?: number;
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
        Code: number;
        Message: string;
    }
    export interface IPagadorClient_RequestFailureResponse {
        status: number;
        errors: Array<IPagadorClient_RequestFailureError>;
    }
    export class Client3DS {
        constructor(parameters: IParametersClient3DS);
        auth(params: IClient3DS_AuthRequestParameters): Promise<IClient3DS_AuthResponse>;
    }
    export class PagadorClient {
        private transactionRequester;
        private retrievalRequester;
        constructor(parameters: IParametersPagadorClient);
        private __request;
        createTransaction(data: IPagadorClient_CreateTransactionRequestParameters, requestId?: string): Promise<IPagadorClient_CreateTransactionResponse | IPagadorClient_RequestFailureResponse>;
        createCreditCardTransaction(data: IPagadorClient_CreateCreditCardTransactionRequestParameters, requestId?: string): Promise<IPagadorClient_CreateTransactionResponse | IPagadorClient_RequestFailureResponse>;
        createRecurrentCreditCardTransaction(data: IPagadorClient_CreateRecurrentCreditCardTransactionRequestParameters, requestId?: string): Promise<IPagadorClient_CreateTransactionResponse | IPagadorClient_RequestFailureResponse>;
        createDebitCardTransaction(data: IPagadorClient_CreateDebitCardTransactionRequestParameters, requestId?: string): Promise<IPagadorClient_CreateTransactionResponse | IPagadorClient_RequestFailureResponse>;
        createRecurrentDebitCardTransaction(data: IPagadorClient_CreateRecurrentDebitTransactionRequestParameters, requestId?: string): Promise<IPagadorClient_CreateTransactionResponse | IPagadorClient_RequestFailureResponse>;
        createEletronicTransferTransaction(data: IPagadorClient_CreateEletronicTransferTransactionRequestParameters, requestId?: string): Promise<IPagadorClient_CreateTransactionResponse | IPagadorClient_RequestFailureResponse>;
        createEWalletTransaction(data: IPagadorClient_CreateEWalletTransactionRequestParameters, requestId?: string): Promise<IPagadorClient_CreateTransactionResponse | IPagadorClient_RequestFailureResponse>;
        createVoucherTransaction(data: IPagadorClient_CreateVoucherTransactionRequestParameters, requestId?: string): Promise<IPagadorClient_CreateTransactionResponse | IPagadorClient_RequestFailureResponse>;
        capturePaymentTransaction(data: IPagadorClient_PaymentCaptureRequestParameters, requestId?: string): Promise<IPagadorClient_PaymentCaptureResponse | IPagadorClient_RequestFailureResponse>;
        cancelTransaction(data: IPagadorClient_CancelTransactionRequestParameters, requestId?: string): Promise<IPagadorClient_CancelTransactionResponse | IPagadorClient_RequestFailureResponse>;
        updateRecurrentCustomerInfo(data: IPagadorClient_UpdateRecurrentCustomerInfoRequestParameters, requestId?: string): Promise<IPagadorClient_UpdateRecurrentCustomerInfoResponse | IPagadorClient_RequestFailureResponse>;
        updateRecurrentEndDate(data: string | Date | number, requestId?: string): Promise<boolean>;
        updateRecurrentInterval(data: 1 | 2 | 3 | 6 | 12, requestId?: string): Promise<boolean | IPagadorClient_RequestFailureResponse>;
        updateRecurrentRecurrencyDay(data: number, requestId?: string): Promise<boolean | IPagadorClient_RequestFailureResponse>;
        updateRecurrentAmount(data: number, requestId?: string): Promise<boolean | IPagadorClient_RequestFailureResponse>;
        updateRecurrentNextPaymentDate(data: string | Date | number, requestId?: string): Promise<boolean | IPagadorClient_RequestFailureResponse>;
        updateRecurrentPaymentInfo(data: string | Date | number, requestId?: string): Promise<boolean | IPagadorClient_RequestFailureResponse>;
    }
    export {};
}
export default BrasPag;
//# sourceMappingURL=index.d.ts.map