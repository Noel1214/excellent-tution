class CustomError extends Error {
    constructor(customMessage, statusCode, redirectTo = ""){
        super(customMessage);
        this.statusCode = statusCode;
        this.redirectTo = redirectTo;
        this.customMessage = customMessage;
    }
}

export default CustomError;