import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { 
  IonicPage, 
  NavController, 
  NavParams, 
  AlertController, 
  LoadingController, 
  Loading,
  ToastController } from 'ionic-angular';

import { VotantesProvider } from '../../providers/votantes/votantes';

@IonicPage()
@Component({
  selector: 'page-formulario',
  templateUrl: 'formulario.html',
})
export class FormularioPage {

  public userFormGroup: FormGroup;
  private loading: Loading;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public fb: FormBuilder,
              public alertCtrl: AlertController, 
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              private votantesPrv: VotantesProvider) {
    this.loadForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormularioPage');
  }

  loadForm() {
    this.userFormGroup = this.fb.group({
      clave_elector: ['', Validators.required],
      nombre: ['', Validators.required],
      ap_paterno: ['', Validators.required],
      ap_materno: ['', Validators.required],
      numero_cel: ['', Validators.required],
      domicilio: ['', Validators.required],
      genero: ['', Validators.required]
    })
  }

  saveUser() {
    let alert = this.alertCtrl.create({
      title: 'Agregar nuevo votante',
      message: '¿Está seguro de continuar?',
      buttons: [
        { text: 'Cancelar' },
        {
          text: 'Aceptar',
          handler: data => {
            
            // this.userFormGroup.reset();
            console.log(this.userFormGroup.value);
            // this.showLoading();
            this.votantesPrv.registro(this.userFormGroup.value).subscribe(response => {
              
              console.log(response);
              var message = 'Se ha registrado';

              var j = null;

              try { j = response.json(); } 
              catch (error) { } 

              console.log(j);

              if (response.status == 200 && j != null) {
                this.userFormGroup.reset();              
              } else {
                message = 'Inténtelo de nuevo';
              }

              let toast = this.toastCtrl.create({
                duration: 2000,
                message: message,
                position: 'bottom'
              })
              toast.present();

            });
            
          }
        }
      ]
    });

    alert.present();
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Guardando...',
      duration: 1000
    });
    this.loading.present();
  }

}
