import { Component, ViewChild } from '@angular/core';
import {
  IonicPage, 
  NavController, 
  NavParams, 
  LoadingController, 
  Loading, 
  ToastController, 
  TextInput } from 'ionic-angular';
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

  @ViewChild('tel') tel : TextInput;
  loginFormGroup: FormGroup;
  private appName: string = 'BINGO';
  private load: Loading;
  public municipios: Array<any> = [
    {id: 1, municipio: 'Balancan'},
    {id: 1, municipio: 'Cárdenas'},
    {id: 1, municipio: 'Centla'},
    {id: 1, municipio: 'Centro'},
    {id: 1, municipio: 'Comalcalco'},
    {id: 1, municipio: 'Cunduacán'},
    {id: 1, municipio: 'Emiliano Zapata'},
    {id: 1, municipio: 'Huimanguillo'},
    {id: 1, municipio: 'Jalapa'},
    {id: 1, municipio: 'Jalpa de Méndez'},
    {id: 1, municipio: 'Jonuta'},
    {id: 1, municipio: 'Macuspana'},
    {id: 1, municipio: 'Nacajuca'},
    {id: 1, municipio: 'Paraíso'},
    {id: 1, municipio: 'Tacotalpa'},
    {id: 1, municipio: 'Teapa'},
    {id: 1, municipio: 'Tenosique'}
  ]

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private fb: FormBuilder, 
    private loadingCtrl: LoadingController,
    private toasCtrl: ToastController,
    private votantes: VotantesProvider,
    private sim: Sim,
    private androidPermissions: AndroidPermissions) {

      this.loadForm();

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
      (info) => {
        if (info.cards[0].phoneNumber != null && info.cards[0].phoneNumber != '') {
          
          let infoNumber: string = info.cards[0].phoneNumber;
          infoNumber = infoNumber.slice(2);

          this.loginFormGroup.patchValue({numero_cel: infoNumber});
          this.loginFormGroup.get('numero_cel').disable();
        }
      },
      (err) => this.showMessage('Unable to get sim info: ' + err)
    );
  }

  loadForm() {
    this.loginFormGroup = this.fb.group({
      numero_cel: ['', [Validators.required, Validators.minLength(10),Validators.maxLength(10)]],
      seccion: ['', Validators.required],
      casilla: ['', Validators.required],
      municipio: ['', Validators.required]
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
    body['numero_cel'] = this.tel.value;

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
