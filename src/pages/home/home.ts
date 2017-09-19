import { Component } from '@angular/core';
import { 
  NavController, 
  IonicPage, 
  AlertController, 
  LoadingController, 
  Loading,
  ItemSliding, 
  ToastController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
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
  private load:  Loading;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, 
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              private votantesPrv: VotantesProvider,
              private storage: Storage) {
    // this.loadUsers();
  }

  ionViewDidEnter() {
    this.loadUsers();
  }

  loadUsers() {
    this.load = this.loadingCtrl.create({
      content: 'Cargando usuarios...',
    });
    this.load.present();

    let userLogin = JSON.parse(localStorage.getItem('userLogin'));

    this.storage.get('users').then((val) => {
      if (val != null) {
        this.getUsersFromStorage(userLogin, val);
      } else {
        this.getUsersFromFile(userLogin);
      }
    }).catch((err) => {
      console.log('Ocurrió un error: ' + err.message);
    });

    // if (localStorage.getItem('users')) {

    //   this.users = JSON.parse(localStorage.getItem('users'));

    //   this.users = this.users.filter((item) => {
    //     return (item.voto == 'N' && item.casilla == userLogin.casilla && item.seccion == userLogin.seccion && item.municipio == userLogin.municipio);
    //   });

    //   this.usersQuery = this.users;
    //   this.load.dismiss();

    // } else {
      
    //   this.votantesPrv.getUsers().subscribe(response => {      
    //     console.log('cargados desde el archivo..');
    //     this.users = response;
        
    //     console.log(this.users);

    //     this.users = this.users.filter((item) => {
    //       return (item.voto == 'N' && item.casilla == userLogin.casilla && item.seccion == userLogin.seccion && item.municipio == userLogin.municipio);
    //     });

    //     console.log(this.users);

    //     this.usersQuery = this.users;
    //     // localStorage.setItem('users', JSON.stringify(response));
    //     this.storage.set('users', JSON.stringify(response));
    //     this.load.dismiss();
    //   });

    // }

  }

  private getUsersFromStorage(userLogin: any, users: any) {
    console.log('cargados desde storage..');
    this.users = JSON.parse(users);
    
    this.users = this.users.filter((item) => {
      return (item.voto == 'N' && item.casilla == userLogin.casilla && item.seccion == userLogin.seccion && item.municipio == userLogin.municipio);
    });

    this.usersQuery = this.users;
    this.load.dismiss();
  }

  private getUsersFromFile(userLogin: any) {
    this.votantesPrv.getUsers().subscribe(response => {      
      console.log('cargados desde el archivo..');
      this.users = response;
      
      // console.log(this.users);

      this.users = this.users.filter((item) => {
        return (item.voto == 'N' && item.casilla == userLogin.casilla && item.seccion == userLogin.seccion && item.municipio == userLogin.municipio);
      });

      // console.log(this.users);

      this.usersQuery = this.users;
      // localStorage.setItem('users', JSON.stringify(response));
      this.storage.set('users', JSON.stringify(response));
      this.load.dismiss();
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

            /* 
              Se obtiene la lista de usuarios almacenada en Storage
              Después se procede a encontrar el index dentro de dicha lista del elemento 
              que se desea actualizar.
              Se actualiza el elemento              
              Se guarda la lista actualizada en localStorage
            */
            this.storage.get('users').then((val) => {
              if (val != null) {

                let u: Array<any> = JSON.parse(val);
                var i = u.findIndex((el) => { return el.id == item.id; });
                u[i].voto = 'S';
                this.storage.set('users', JSON.stringify(u));

                // Se procede a eliminar el elemento de la lista users
                this.users.splice(index, 1);
                // Se actualiza la lista auxiliar usada para la búsqueda
                this.usersQuery = this.users;

                this.votantesPrv.updateUser(item.id).subscribe(response => {
                  console.log(response);
                  let toast = this.toastCtrl.create({
                    message: 'El usuario ha votado',
                    duration: 2000,
                    position: 'bottom'
                  });
                  toast.present();
                });
              }
            });

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
    console.log(this.users);

    if (this.searchQuery && this.searchQuery.trim() != '') {
      this.users = this.users.filter((item) => {
        return item.consecutivo_def == this.searchQuery.toLowerCase();;
      });
    }
  }

  showMessage(message: string) {
    let toast = this.toastCtrl.create({
      duration: 2000,
      message: message
    });
    toast.present();
  }
}