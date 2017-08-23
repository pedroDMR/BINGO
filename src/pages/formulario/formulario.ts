import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { VotantesProvider } from '../../providers/votantes/votantes';

@IonicPage()
@Component({
  selector: 'page-formulario',
  templateUrl: 'formulario.html',
})
export class FormularioPage {

  public userFormGroup: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public fb: FormBuilder,
              public alertCtrl: AlertController, public loadingCtrl: LoadingController,
              private votantesPrv: VotantesProvider) {
    this.loadForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormularioPage');
  }

  loadForm() {
    this.userFormGroup = this.fb.group({
      clave: ['', Validators.required],
      nombre: ['', Validators.required],
      paterno: ['', Validators.required],
      materno: ['', Validators.required],
      telefono: ['', Validators.required],
      domicilio: ['', Validators.required]
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
            this.userFormGroup.reset();
            this.showLoading();
            console.log(JSON.stringify(this.userFormGroup.value));
            this.votantesPrv.addUser(JSON.stringify(this.userFormGroup.valid)).subscribe(response => {
              console.log(response);
            });
          }
        }
      ]
    });

    alert.present();
  }

  showLoading() {
    let loading = this.loadingCtrl.create({
      content: 'Guardando...',
      duration: 1000
    });
    loading.present();
  }

}
