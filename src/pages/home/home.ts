import { Component } from '@angular/core';
import { NavController, IonicPage, AlertController, LoadingController, ItemSliding } from 'ionic-angular';

import { VotantesProvider } from '../../providers/votantes/votantes';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public users: Array<any> = [
    {name: 'Aarón López Sosa', img: 'assets/img/user_avatar.png'},
    {name: 'Aarón López Sosa', img: 'assets/img/user_avatar.png'},
    {name: 'Aarón López Sosa', img: 'assets/img/user_avatar.png'},
    {name: 'Aarón López Sosa', img: 'assets/img/user_avatar.png'},
    {name: 'Aarón López Sosa', img: 'assets/img/user_avatar.png'},
    {name: 'Aarón López Sosa', img: 'assets/img/user_avatar.png'},
    {name: 'Aarón López Sosa', img: 'assets/img/user_avatar.png'},
    {name: 'Aarón López Sosa', img: 'assets/img/user_avatar.png'},
    // {name: 'Aarón López Sosa', img: 'assets/img/user_avatar.png'},
    // {name: 'Aarón López Sosa', img: 'assets/img/user_avatar.png'},
    // {name: 'Aarón López Sosa', img: 'assets/img/user_avatar.png'},
  ]

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, 
              public loadingCtrl: LoadingController, private votantesPrv: VotantesProvider) {

  }

  loadUsers() {
    this.votantesPrv.getUsers().subscribe(response => {
      console.log(response);
    });
  }

  checkUser(item, slidingItem: ItemSliding): void {
    let alert = this.alertCtrl.create({
      title: 'Bingo',
      message: '¿Confirmar voto?',
      buttons: [
        {
          text: 'Cancelar',
          handler: data => { slidingItem.close(); }
        },
        {
          text: 'Aceptar',
          handler: data => { 
            this.showLoading();
            var index = this.users.indexOf(item);
            console.log(this.users);
            this.users.splice(index, 1);
            console.log(this.users);
          }
        }
      ]
    });
    alert.present();
  }

  private showLoading() {
    let loading = this.loadingCtrl.create({
      content: 'Cargando...',
      duration: 1000
    });
    loading.present();
  }
}
