import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class VotantesProvider {

  private _baseUrl: string = 'https://cc22b0ed.ngrok.io';

  constructor(private http: Http) {
    
  }

  getUsers() {
    // let url = this._baseUrl + '/servicioBingo/';
    // return this.http.get(url).map(res => res.json());
    return this.http.get('assets/bingo.json').map(res => res.json());
  }

  updateUser(user_id: number) {
    let body = {id: user_id};
    let url = this._baseUrl + '/servicioBingo/svcBingoForm.jsp';
    return this.http.post(url, body).map(res => res.json());
  }

}
