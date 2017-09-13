import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class VotantesProvider {

  private _baseUrl: string = 'https://6828f125.ngrok.io';

  constructor(private http: Http) {
    
  }

  getUsers() {
    // let url = this._baseUrl + '/servicioBingo/';
    // return this.http.get(url).map(res => res.json());
    return this.http.get('assets/bingo.json').map((res) => res.json());
  }

  updateUser(user_id: number) {
    let url = this._baseUrl + '/servicioBingo/svcBingo?id=' + user_id;
    console.log(url);
    return this.http.get(url).map(res => res.json());
  }

  registro(params) {
    let url = this._baseUrl + '/servicioBingo/svcNewBingo?clave_elector=' + params.clave_elector;
    url += '&nombre=' + params.nombre + '&ap_paterno=' + params.ap_paterno; 
    url += '&ap_materno=' + params.ap_materno + '&numero_cel=' + params.numero_cel;
    url += '&genero=' + params.genero + '&domicilio=' + params.domicilio;
    console.log(url);
    return this.http.get(url);
  }

  login(body: any) {
    let url = this._baseUrl + '/servicioBingo/svcRol';
    url += '?numero_cel=' + body.numero_cel + '&aplicacion=' + body.aplicacion;
    console.log(url);
    return this.http.get(url).map(res => res.json());
  }

}
