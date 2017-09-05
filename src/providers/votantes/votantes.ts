import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class VotantesProvider {

  private _baseUrl: string = 'https://c4958856.ngrok.io';

  constructor(private http: Http) {
    
  }

  getUsers() {
    // let url = this._baseUrl + '/servicioBingo/';
    // return this.http.get(url).map(res => res.json());
    return this.http.get('assets/bingo.json').map((res) => res.json());
  }

  addUser(body) {
    let url = this._baseUrl + '/servicioBingo/svcNewBingo';
    return this.http.post(url, body);
  }

  updateUser(user_id: number) {
    let url = this._baseUrl + '/servicioBingo/svcBingo?id=' + user_id;
    console.log(url);
    return this.http.get(url).map(res => res.json());
  }

}
