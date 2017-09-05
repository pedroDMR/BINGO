import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';

import { VotantesProvider } from '../../providers/votantes/votantes';

@IonicPage()
@Component({
  selector: 'page-formulario',
  templateUrl: 'formulario.html',
})
export class FormularioPage {

  public userFormGroup: FormGroup;
  private loading: Loading;

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
            this.showLoading();
            this.votantesPrv.addUser(this.userFormGroup.value).subscribe(response => {
              console.log(response);
              this.userFormGroup.reset();
              this.loading.dismiss();
            });
            // this.votantesPrv.addUser(JSON.stringify(this.userFormGroup.valid)).subscribe(response => {
            //   console.log(response);
            // });
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
