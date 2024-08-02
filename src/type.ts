export  interface GetUserResponse {
    html_message?: string;
    request_token?: string;
    status: string;
};
export  interface ScanDetails {
    scanId: number;
    scanName: string;
    scanResponseTextStatus: string;
    scanResponseImg: any;
}
