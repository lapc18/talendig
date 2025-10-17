export interface ApiReponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
}