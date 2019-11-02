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
    export type CreditCardProvider = string;
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
        Provider: CreditCardProvider;
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
        /**
         *
         */
        CreditCard: CreditCard;
        /**
         *
         */
        Credentials: PaymentCredentials;
    }
    export type DebitCardProvider = 'Cielo';
    export interface DebitCardPaymentRequest extends PaymentRequestBase, PaymentDefaultAuthentication {
        Provider: DebitCardProvider;
        Installments: number;
        DebitCard: DebitCard;
    }
    export interface BoletoPaymentRequest extends PaymentRequestBase {
        Type: "Boleto";
        Provider: BoletoProvider;
        BoletoNumber?: string;
        Assignor?: string;
        Demonstrative?: string;
        /**
         * Format: AAAA-MM-DD
         */
        ExpirationDate?: Date | string | number;
        Identification?: string;
        Instructions?: string;
        NullifyDays?: number;
        DaysToFine?: number;
        FineRate?: number;
        FineAmount?: number;
        DaysToInterest?: number;
        InterestRate?: number;
        InterestAmount?: number;
    }
    export interface ExternalAuthentication {
        Cavv: string;
        Xid: string;
        Numero: number;
    }
    export interface PaymentDefaultAuthentication {
        Authenticate: true;
        ReturnUrl: string;
    }
    export type ExternalAuthenticationProvider = 'Cielo' | 'Banorte' | 'Global Payments';
    export interface PaymentExternalAuthentication {
        Authenticate: true;
        Provider: ExternalAuthenticationProvider;
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
    export interface RecurrentPaymentRequest {
        Recurrent: true;
    }
    export interface RecurrentCreditCardPaymentRequest extends PaymentRequestBase, RecurrentPaymentRequest {
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
        /**
         * Max Length: 16
         *
         * Required: Yes
         *
         * Número do Cartão do comprador
         */
        CardNumber: string;
        /**
         * Max Length: 25
         *
         * Required: Yes
         *
         * Nome do Comprador impresso no cartão
         */
        Holder: string;
        /**
         * Max Length: 7
         *
         * Required: Yes
         *
         * Data de validade impresso no cartão, no formato MM/AAAA
         */
        ExpirationDate: string;
        /**
         * Max Length: 4
         *
         * Required: Yes
         *
         * Código de segurança impresso no verso do cartão
         */
        SecurityCode: string;
        /**
         * Max Length: 10
         *
         * Required: Yes
         *
         * Bandeira do cartão
         */
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
    type PaymentRequestAuthentication = {
        Authenticate: false;
    } | PaymentDefaultAuthentication | PaymentExternalAuthentication;
    export interface IPagadorClient_CreateCreditCardTransactionRequestParameters extends IPagadorClient_CreateTransactionRequestBase<CreditCardPaymentRequest & {
        Recurrent?: false;
    } & PaymentRequestAuthentication> {
    }
    export interface IPagadorClient_CreateRecurrentCreditCardTransactionRequestParameters extends IPagadorClient_CreateTransactionRequestBase<RecurrentCreditCardPaymentRequest> {
    }
    export interface IPagadorClient_CreateDebitCardTransactionRequestParameters extends IPagadorClient_CreateTransactionRequestBase<DebitCardPaymentRequest & {
        Recurrent?: false;
    }> {
    }
    export interface IPagadorClient_CreateRecurrentDebitTransactionRequestParameters extends IPagadorClient_CreateTransactionRequestBase<RecurrentDebitCardPaymentRequest> {
    }
    export interface IPagadorClient_CreateEletronicTransferTransactionRequestParameters extends IPagadorClient_CreateTransactionRequestBase<EletronicTransferPaymentRequest> {
    }
    export interface IPagadorClient_CreateBoletoTransactionRequestParameters extends IPagadorClient_CreateTransactionRequestBase<BoletoPaymentRequest> {
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
        /**
         * 	Id da transação no provedor de meio de pagamento	Texto	40	Texto alfanumérico
         */
        AcquirerTransactionId: string;
        /**
         * 	Número do Comprovante de Venda	Texto	20	Texto alfanumérico
         */
        ProofOfSale: string;
        /**
         * 	Código de autorização	Texto	300	Texto alfanumérico
         */
        AuthorizationCode: string;
        /**
         * 	Campo Identificador do Pedido	Guid	36	xxxxxxxx - xxxx - xxxx - xxxx - xxxxxxxxxxxx
         */
        PaymentId: string;
        /**
         * 	Data em que a transação foi recebida pela Brapag	Texto	19	AAAA - MM - DD HH: mm: SS
         */
        ReceivedDate: string;
        /**
         * 	Data em que a transação foi capturada a transação	Texto	19	AAAA - MM - DD HH: mm: SS
         */
        CapturedDate: string;
        /**
         * 	Valor capturado(sem pontuação)	Número	15	100 equivale a R$ 1, 00
         */
        CapturedAmount: string;
        /**
         * 	Eletronic Commerce Indicator.Representa o resultado da autenticação	Texto	2	Exemplos: 5
         */
        ECI: string;
        /**
         * 	Código de retorno da Operação	Texto	32	Texto alfanumérico
         */
        ReasonCode: string;
        /**
         * 	Mensagem de retorno da Operação	Texto	512	Texto alfanumérico
         */
        ReasonMessage: string;
        /**
         * 	Status da Transação	Byte	2	Ex. 1
         */
        Status: string;
        /**
         * 	Código retornado pelo provedor do meio de pagamento(adquirente e bancos)	Texto	32	57
         */
        ProviderReturnCode: string;
        /**
         * 	Mensagem retornada pelo provedor do meio de pagamento(adquirente e bancos)	Texto	512	Transação Aprovada
         */
        ProviderReturnMessage: string;
    }
    export interface DebitCardPaymentResponse extends PaymentResponseBase {
    }
    export interface BoletoPaymentResponse extends PaymentResponseBase {
        /**
         * 	Campo Identificador do Pedido.	Guid	36	xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
         */
        PaymentId: string;
        /**
         * 	Data de expiração.	Texto	10	2014-12-25
         */
        ExpirationDate: string;
        /**
         * 	URL do Boleto gerado	string	256	https://…/pagador/reenvia.asp/8464a692-b4bd-41e7-8003-1611a2b8ef2d
         */
        Url: string;
        /**
         * 	“NossoNumero” gerado.	Texto	50	2017091101
         */
        BoletoNumber: string;
        /**
         * 	Representação numérica do código de barras.	Texto	44	00091628800000157000494250100000001200656560
         */
        BarCodeNumber: string;
        /**
         * 	Linha digitável.	Texto	256	00090.49420 50100.000004 12006.565605 1 62880000015700
         */
        DigitableLine: string;
        /**
         * 	Endereço do Loja cadastrada no banco	Texto	256	Av. Teste, 160
         */
        Address: string;
        /**
         * 	Status da Transação.	Byte	2	Ex. 1
         */
        Status: number;
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
    export interface IPagadorClient_CreateBoletoTransactionResponse {
    }
    export interface IPagadorClient_CreateCreditCardTransactionResponse extends CreditCardPaymentResponse {
        VelocityAnalysis?: VelocityAnalysisResult;
    }
    export interface IPagadorClient_CreateRecurrentCreditCardTransactionResponse extends CreditCardPaymentResponse {
        VelocityAnalysis?: VelocityAnalysisResult;
    }
    export interface IPagadorClient_CreateDebitCardTransactionResponse {
        /**
         * 	Id da transação no provedor de meio de pagamento
         *
         * Texto
         *
         * 40
         *
         * Texto alfanumérico
         */
        AcquirerTransactionId: string;
        /**
         * 	Número do Comprovante de Venda
         *
         * Texto
         *
         * 20
         *
         * Texto alfanumérico
         */
        ProofOfSale: string;
        /**
         * 	Código de autorização
         *
         * Texto
         *
         * 300
         *
         * Texto alfanumérico
         */
        AuthorizationCode: string;
        /**
         * 	Campo Identificador do Pedido
         *
         * Guid
         *
         * 36
         *
         * xxxxxxxx - xxxx - xxxx - xxxx - xxxxxxxxxxxx
         */
        PaymentId: string;
        /**
         * 	Data em que a transação foi recebida pela Brapag
         *
         * Texto
         *
         * 19
         *
         * AAAA - MM - DD HH: mm: SS
         */
        ReceivedDate: string;
        /**
         * 	Código de retorno da Operação
         *
         * Texto
         *
         * 32
         *
         * Texto alfanumérico
         */
        ReasonCode: string;
        /**
         * 	Mensagem de retorno da Operação
         *
         * Texto
         *
         * 512
         *
         * Texto alfanumérico
         */
        ReasonMessage: string;
        /**
         * 	Status da Transação
         *
         * Byte
         *
         * 2
         *
         * Ex. 1
         */
        Status: string;
        /**
         * 	Código retornado pelo provedor do meio de pagamento(adquirente e bancos)
         *
         * Texto
         *
         * 32
         *
         * 57
         */
        ProviderReturnCode: string;
        /**
         * 	Mensagem retornada pelo provedor do meio de pagamento(adquirente e bancos)
         *
         * Texto
         *
         * 512
         *
         * Transação Aprovada
         */
        ProviderReturnMessage: string;
        /**
         * 	URL para o qual o portador será redirecionado para autenticação
         *
         * Texto
         *
         * 56
         *
         * https://qasecommerce.cielo.com.br/web/index.cbmp?id=13fda1da8e3d90d3d0c9df8820b96a7f
         */
        AuthenticationUrl: string;
        VelocityAnalysis?: VelocityAnalysisResult;
    }
    export type IPagadorClient_CreateRecurrentDebitCardTransactionResponse = IPagadorClient_CreateDebitCardTransactionResponse & RecurrentPaymentResponse;
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
        Amount?: number;
        ServiceTaxAmount?: number;
    }
    export interface IPagadorClient_PaymentCaptureResponse {
        Status: number;
        ReasonCode: string;
        ReasonMessage: string;
        ProviderReasonCode?: string;
        ProviderReasonMessage?: string;
        Links?: Array<BrasPagLink>;
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
        createCreditCardTransaction(data: IPagadorClient_CreateCreditCardTransactionRequestParameters, requestId?: string): Promise<IPagadorClient_CreateCreditCardTransactionResponse | IPagadorClient_RequestFailureResponse>;
        createRecurrentCreditCardTransaction(data: IPagadorClient_CreateRecurrentCreditCardTransactionRequestParameters, requestId?: string): Promise<IPagadorClient_CreateRecurrentCreditCardTransactionResponse | IPagadorClient_RequestFailureResponse>;
        createDebitCardTransaction(data: IPagadorClient_CreateDebitCardTransactionRequestParameters, requestId?: string): Promise<IPagadorClient_CreateDebitCardTransactionResponse | IPagadorClient_RequestFailureResponse>;
        createRecurrentDebitCardTransaction(data: IPagadorClient_CreateRecurrentDebitTransactionRequestParameters, requestId?: string): Promise<IPagadorClient_RequestFailureResponse | IPagadorClient_CreateRecurrentDebitCardTransactionResponse>;
        createEletronicTransferTransaction(data: IPagadorClient_CreateEletronicTransferTransactionRequestParameters, requestId?: string): Promise<IPagadorClient_CreateTransactionResponse | IPagadorClient_RequestFailureResponse>;
        createBoletoTransaction(data: IPagadorClient_CreateBoletoTransactionRequestParameters, requestId?: string): Promise<IPagadorClient_CreateBoletoTransactionResponse | IPagadorClient_RequestFailureResponse>;
        createEWalletTransaction(data: IPagadorClient_CreateEWalletTransactionRequestParameters, requestId?: string): Promise<IPagadorClient_CreateTransactionResponse | IPagadorClient_RequestFailureResponse>;
        createVoucherTransaction(data: IPagadorClient_CreateVoucherTransactionRequestParameters, requestId?: string): Promise<IPagadorClient_CreateTransactionResponse | IPagadorClient_RequestFailureResponse>;
        capturePaymentTransaction(PaymentId: string, data: IPagadorClient_PaymentCaptureRequestParameters, requestId?: string): Promise<IPagadorClient_PaymentCaptureResponse | IPagadorClient_RequestFailureResponse>;
        cancelTransaction(PaymentId: string, data: IPagadorClient_CancelTransactionRequestParameters, requestId?: string): Promise<IPagadorClient_CancelTransactionResponse | IPagadorClient_RequestFailureResponse>;
        updateRecurrentCustomerInfo(RecurrentPaymentId: string, data: IPagadorClient_UpdateRecurrentCustomerInfoRequestParameters, requestId?: string): Promise<IPagadorClient_UpdateRecurrentCustomerInfoResponse | IPagadorClient_RequestFailureResponse>;
        updateRecurrentEndDate(RecurrentPaymentId: string, EndDate: string | Date | number, requestId?: string): Promise<IPagadorClient_UpdateRecurrentCustomerInfoResponse | IPagadorClient_RequestFailureResponse>;
        /**
         *
         * @param RecurrentPaymentId
         * @param Interval 1 = Monthly; 2 = Bimonthly; 3 = Quartermonthly; 6 = Semimonthly; Annually
         * @param requestId
         */
        updateRecurrentInterval(RecurrentPaymentId: string, Interval: 1 | 2 | 3 | 6 | 12, requestId?: string): Promise<boolean | IPagadorClient_RequestFailureResponse>;
        updateRecurrentRecurrencyDay(RecurrentPaymentId: string, RecurrencyDay: number, requestId?: string): Promise<boolean | IPagadorClient_RequestFailureResponse>;
        updateRecurrentAmount(RecurrentPaymentId: string, data: number, requestId?: string): Promise<boolean | IPagadorClient_RequestFailureResponse>;
        updateRecurrentNextPaymentDate(RecurrentPaymentId: string, data: string | Date | number, requestId?: string): Promise<boolean | IPagadorClient_RequestFailureResponse>;
        updateRecurrentPaymentInfo(RecurrentPaymentId: string, data: string | Date | number, requestId?: string): Promise<boolean | IPagadorClient_RequestFailureResponse>;
    }
    export {};
}
export default BrasPag;
//# sourceMappingURL=index.d.ts.map