// go pattern
export const validateBodyParams = <T>(body: T, params: Array<keyof T>): Error | null => {
    for(const param of params) {
        if(body[param] === null || body[param] === undefined) {
            return new Error(`Missing required parameter ${String(param)} is null or undefined`);
        }
    }
    return null;
}