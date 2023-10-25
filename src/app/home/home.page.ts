import { IonicModule } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { IonSegment } from '@ionic/angular';
import { ChangeDetectorRef } from '@angular/core';
import { MisDatosComponent } from '../mis-datos/mis-datos.component';
import { CertificacionesComponent } from '../certificaciones/certificaciones.component';
import { LaboralComponent } from '../laboral/laboral.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, MisDatosComponent, CertificacionesComponent,LaboralComponent, CommonModule],
})
export class HomePage implements OnInit{

  @ViewChild(IonSegment) segment!: IonSegment;

  constructor(private router: Router, private cdr: ChangeDetectorRef) {
    console.log('home');
  }
  ngOnInit() {
    console.log('ngOnInit');
    const currentNavigation = this.router.getCurrentNavigation();
  
    if (currentNavigation && currentNavigation.extras.state) {
      const navigationState = currentNavigation.extras.state;
      if (navigationState['username'] && navigationState['password']) {
          this.nombreUsuario = navigationState['username'];
          this.contrasena = navigationState['password'];
      }
    }
  }
  
  nombreUsuario: string = '';
  contrasena: string = '';
  public alertButtons = ['YES'];
  Nombre: string='';
  Apellido: string='';
  Educacion: string='';
  Nacimiento: string='';
  selectedSegment: string='';
  username: string='';
  password: string='';

  logout(){
    const cofirmation = confirm('Are you sure you want to log?');
    if (cofirmation){
      localStorage.removeItem('token'); // Remove the token from localStorage
      this.router.navigate(['login']);
    }
  }

  Limpiar(){
    this.Nombre = '';
    this.Apellido = '';
    this.Educacion = '';
    this.Nacimiento = '';
  }


  segmentChanged(event:any) {
    console.log(event);
    const valorSegment = event.detail.value;
    console.log(valorSegment);
    this.selectedSegment = valorSegment;
    this.cdr.detectChanges(); // Forzar la detección de cambios
    }


    ngOnDestroy(){
     console.log('ngOnDestroy');
   }
   ionViewWillEnter(){
     console.log('ionViewWillEnter');
   }
   ionViewDidEnter(){
     console.log("ionViewDidEnter");
   }
   ionViewWillLeave(){
     console.log('ionViewWillLeave');
   }
   ionViewDidLeave(){
     console.log('ionViewDidLeave');
   }
   clearContent() {
  }

  }
