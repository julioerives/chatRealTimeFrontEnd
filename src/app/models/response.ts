export interface Response<T>{
    message: string;
    error:boolean;
    data:T;
}