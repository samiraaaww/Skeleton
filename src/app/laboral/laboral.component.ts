import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-laboral',
  templateUrl: './laboral.component.html',
  styleUrls: ['./laboral.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule,  FormsModule],
})
export class LaboralComponent  implements OnInit {

  constructor() { }
  empresa: string ='';
  anoInicio: string ='';
  trabajoActual: string ='';
  anoTermino: string ='';
  cargo: string ='';

  ngOnInit() {
    console.log('init laboral');
  }

  
  LimpiarDatos(){
    console.log('limpiando');
    this.empresa = '';
    this.anoInicio = '';
    this.trabajoActual = '';
    this.anoTermino = '';
    this.cargo = '';
  }
  IngresarDatos(){
    console.log('ingresando');
  }
  ActualizarDatos(){
    console.log('actualizando');
  }


  ngOnDestroy(){
    console.log('ngOnDestroy laboral');
  }
  ionViewWillEnter(){
    console.log('ionViewWillEnter laboral');
  }
  ionViewDidEnter(){
    console.log("ionViewDidEnter laboral");
  }
  ionViewWillLeave(){
    console.log('ionViewWillLeave laboral');
  }
  ionViewDidLeave(){
    console.log('ionViewDidLeave laboral');
  }
  }
  


