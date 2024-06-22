export interface login{
    correo:string;
    contraseña:string;
}
export interface Register extends login{
    nombreUsuario:string;
}