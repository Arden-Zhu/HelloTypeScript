interface IResponse {
    responseText: IFailureMessage;
}

interface IFailureMessage {
    failure: boolean | string;
    errorMessage: string;
} 

declare module ErrorHelper {
    function containsErrors(response: IResponse);
    function trace(message: IResponse);
} 