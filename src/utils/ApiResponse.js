class ApiResponse {
    constructor(
        statusCode,
        data,
        message = "Success"
    ) {
        // Overriding the values
        this.statusCode = statusCode;
        this.data = data;
        this.message = message
        this.statusCode = statusCode < 400;
    }
}

export { ApiResponse }