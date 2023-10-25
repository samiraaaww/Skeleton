import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-mis-datos',
  templateUrl: './mis-datos.component.html',
  styleUrls: ['./mis-datos.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule,  FormsModule],
})
export class MisDatosComponent  implements OnInit {
    public alertButtons = ['YES'];
    @Input()
  nombreUsuario!: string;
    @Input() contrasena: string | undefined;
  
    constructor(private router: Router, private database: DatabaseService) {
    }
    nombre: string = '';
    apellido: string='';
    educacion: string='';
    nacimiento: string='';
    mostrarInputClave: boolean = false;
    newContrasena: string = '';
    newNombreUsuario: string = '';
    mostrarInputUser: boolean = false;
    
    ngOnInit() {
      console.log('ngOnInit');
     }
  
    LimpiarDatos(){
      console.log('limpiando');
      this.nombre = '';
      this.apellido = '';
      this.educacion = '';
      this.nacimiento = '';
    }
    IngresarDatos(){
      console.log('ingresando');
    }
    ActualizarDatos(){
      console.log('actualizando');
    }

    async cambioContrasena() {
      if (this.newContrasena === '') {
        alert('Debes ingresar una nueva contraseña.');
        return;
      }
      await this.database.updateUserPassword(this.nombreUsuario, this.newContrasena);
      this.mostrarInputClave = false;
      alert("Su contraseña ha sido cambiada. \nFavor ingresar con sus nuevas credenciales")
      this.router.navigate(['login']);
    }


    async cambioUsuario(){
      if (this.newNombreUsuario === '') {
        alert('Debes ingresar un nuevo usuario.');
        return;
      }
      await this.database.updateUserName(this.nombreUsuario, this.newNombreUsuario);
      this.mostrarInputUser = false;
      alert("Su usuario ha sido cambiado. \nFavor ingresar con sus nuevas credenciales")
      this.router.navigate(['login']);
    }

    async eliminarCuenta(){
      const cofirmation = confirm('¿Esta seguro que desea eliminar su cuenta?');
      if (cofirmation){
        await this.database.deleteUserByName(this.nombreUsuario);
        alert("Cuenta eliminada");
        localStorage.removeItem('token'); // Remove the token from localStorage
        this.router.navigate(['login']);
      }
    }
  
  
    ngOnDestroy(){
       console.log('ngOnDestroy misDatos');
     }
     ionViewWillEnter(){
       console.log('ionViewWillEnter misDatos');
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
  
  }
