import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-certificaciones',
  templateUrl: './certificaciones.component.html',
  styleUrls: ['./certificaciones.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule,  FormsModule],

})
export class CertificacionesComponent  implements OnInit {
  nombreUsuario: string = '';
  Contrasena: string = '';

  constructor(private router: Router) { }
  nombre: string = '';
  fechaObtencion: string = '';
  booleanVencimiento: string = '';
  fechaVencimiento: string = '';

  ngOnInit() {
    console.log('init certificaciones');
   }

  LimpiarDatos(){
    console.log('limpiando');
    this.nombre = '';
    this.fechaObtencion = '';
    this.booleanVencimiento = '';
    this.fechaVencimiento = '';
  }
  IngresarDatos(){
    console.log('ingresando');
  }
  ActualizarDatos(){
    console.log('actualizando');
  }


  ngOnDestroy(){
    console.log('ngOnDestroy certificaciones');
  }
  ionViewWillEnter(){
    console.log('ionViewWillEnter certificaciones');
  }
  ionViewDidEnter(){
    console.log("ionViewDidEnter certificaciones");
  }
  ionViewWillLeave(){
    console.log('ionViewWillLeave certificaciones');
  }
  ionViewDidLeave(){
    console.log('ionViewDidLeave certificaciones');
  }

}

