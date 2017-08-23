import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class VotantesProvider {

  private _baseUrl: string = 'https://2417a710.ngrok.io';

  constructor(private http: Http) {
    
  }

  getUsers() {
    let url = this._baseUrl + '/servicioBingo/';
    return this.http.get(url).map(res => res.json());
  }

  addUser(user) {
    let url = this._baseUrl + '/userAdd';
    return this.http.post(url, user).map(res => res.json());
  }

}
