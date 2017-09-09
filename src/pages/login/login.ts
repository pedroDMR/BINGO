import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    private loadingCtrl: LoadingController) {

    this.loadForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loadForm() {
    this.loginFormGroup = this.fb.group({
      numero_cel: ['', [Validators.required, Validators.minLength(10),Validators.maxLength(10)]],
    });
  }

  doLogin() {
    this.load = this.loadingCtrl.create({
      content: 'Iniciando sesión'
    });
    this.load.present();
    
    let body = this.loginFormGroup.value;
    body['aplicacion'] = this.appName;

  }

}
