import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VotantesProvider } from '../../providers/votantes/votantes';
import { Sim } from '@ionic-native/sim';
import { AndroidPermissions } from '@ionic-native/android-permissions';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginFormGroup: FormGroup;
  private appName: string = 'BINGO';
  private load: Loading;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private fb: FormBuilder, 
    private loadingCtrl: LoadingController,
    private toasCtrl: ToastController,
    private votantes: VotantesProvider,
    private sim: Sim,
    private androidPermissions: AndroidPermissions) {

      this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_PHONE_STATE).then(
        () => this.getInfoSim(),
        (err) => this.showMessage('Permission denied: ' + err)
      );

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  private getInfoSim(): void {
    this.sim.getSimInfo().then(
      (info) => this.showMessage('Sim info: ' + info.cards[0].phoneNumber),
      (err) => this.showMessage('Unable to get sim info: ' + err)
    );
  }

  loadForm() {
    this.loginFormGroup = this.fb.group({
      numero_cel: ['', [Validators.required, Validators.minLength(10),Validators.maxLength(10)]],
    });
  }

  private showMessage(message: string): void {
    let toast = this.toasCtrl.create({
      duration: 8000,
      message: message
    });
    toast.present();
  }

  doLogin() {
    this.load = this.loadingCtrl.create({
      content: 'Iniciando sesión',
      duration: 2000
    });
    this.load.present();
    
    let body = this.loginFormGroup.value;
    body['aplicacion'] = this.appName;

    this.votantes.login(body).subscribe(response => {
      console.log(response);
      this.load.dismiss();

      if (response.login) {
        this.navCtrl.setRoot('TabsPage');
      } else {
        let toast = this.toasCtrl.create({
          duration: 2000,
          message: 'No se encuentra registrado..'
        });
        toast.present();
      }

    });
  }

}
