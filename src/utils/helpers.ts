export const return_statement = (success: boolean, message: string, data?: unknown) => {
    if (data) {
        return {
            success,
            message,
            data
        }
    }
    return {
        success, message
    }
}