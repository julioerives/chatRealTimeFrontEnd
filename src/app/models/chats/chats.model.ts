export interface Chats{
    id: string | number;
    fecha_creacion:string;
    id_chat:string |number;
    id_user:string | number;
    last_message:LastMessage;
    nombre:string;   
}
export interface LastMessage{
    id_usuario:string;
    message:string;
}