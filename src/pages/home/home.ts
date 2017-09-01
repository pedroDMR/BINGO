import { Component } from '@angular/core';
import { NavController, IonicPage, AlertController, LoadingController, ItemSliding } from 'ionic-angular';

import { VotantesProvider } from '../../providers/votantes/votantes';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public users: Array<any> = [];
  public usersQuery: Array<any> = [];
  private swiped: Boolean = false;
  searchQuery: string = '';

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, 
              public loadingCtrl: LoadingController, private votantesPrv: VotantesProvider) {
  
    // this.loadUsers();
  }

  ionViewDidEnter() {
    this.loadUsers();
  }

  loadUsers() {
    this.votantesPrv.getUsers().subscribe(response => {      
      this.users = response;
      this.usersQuery = this.users;
    });
  }

  onDrag(ev, item, slidingItem: ItemSliding) {
    let percent = ev.getSlidingPercent();
    
    if (percent > 1 && !this.swiped) {
      this.swiped = true;
      this.checkUser(item, slidingItem);
    }
  }

  checkUser(item, slidingItem: ItemSliding): void {
    let alert = this.alertCtrl.create({
      title: 'Bingo',
      message: '¿Confirmar voto?',
      buttons: [
        {
          text: 'Cancelar',
          handler: data => { slidingItem.close(); this.swiped = false; }
        },
        {
          text: 'Aceptar',
          handler: data => { 
            this.showLoading();
            var index = this.users.indexOf(item);
            console.log(this.users);
            this.users.splice(index, 1);
            console.log(this.users);
            this.swiped = false;
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

  getImage(item): string {
    return (item.genero === 'H') ? 'assets/img/user_avatar.png' : 'assets/img/user_female.png';
  }

  searchUser(ev: any) {
    this.users = this.usersQuery;
    this.searchQuery = ev.target.value;

    if (this.searchQuery && this.searchQuery.trim() != '') {
      this.users = this.users.filter((item) => {
        return (item.nombre.toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1);
      });
    }
  }
}
