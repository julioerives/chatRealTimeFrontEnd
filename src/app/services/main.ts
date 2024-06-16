import { HttpClient } from "@angular/common/http";
import { enviroment } from "src/enviroments/enviroments";
import { Response } from "../models/response";
import { Observable } from "rxjs";
export class Main{
    public url = enviroment.URL_SERVICES
    
    constructor(private _http:HttpClient,ruta:string){
        this.url = enviroment.URL_SERVICES+"/"+ruta;
    }
    getById(id:number|string):Observable<Response>{
        return this._http.get<Response>(this.url+"/"+id)
    }
}