import { Component, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { DatabaseService, User } from '../services/database.service';
import { Signal } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RegistroPage implements OnInit {

  //SQLITE
  users = this.database.getUsers();
  newUserName = '';
  newContrasena ='';
  databaseService: any;

  //validaciones
  numerosRegex = /^[0-9]+$/; //verifica que sean solo numeros
  alfanumRegex = /^[a-zA-Z]/ //verifica que sean alphanumericos
  digitRegex = /\d/ //verifica que contengan al menos un digito

  constructor(private router: Router,private database: DatabaseService) {
    effect(()=>{
      console.log('USERS CHANGED',this.users());
    });
  }


  ngOnInit(): void {
  }


  async createUser(){
    if (this.newUserName.length >= 3 && this.newUserName.length <= 8 &&
      this.newContrasena.length === 4 && /^\d+$/.test(this.newContrasena) &&
      /[a-zA-Z]/.test(this.newUserName) && /\d/.test(this.newUserName)) {
              console.log('registration action');
              await this.database.addUser(this.newUserName, this.newContrasena);
              alert('Usuario creado. Favor ingresar con sus credenciales. \nNombre de usuario: '+this.newUserName+"\nContraseña: "+this.newContrasena);
              this.newUserName = '';
              this.newContrasena = '';
              this.router.navigate(['/login']);
    } else {
              if (this.newUserName.length < 3 || this.newUserName.length > 8) {
                alert('Usuario invalido, debe tener entre 3 y 8 caracteres');
              }
              //este no funciona
              else if (!this.alfanumRegex.test(this.newUserName) || !this.digitRegex.test(this.newUserName)) {
                alert('El nombre de usuario debe ser alfanumerico');
              }
              else if (this.newContrasena.length < 4 || this.newContrasena.length > 4)  {
                alert('Contraseña invalida, debe tener un largo de 4');
              }
              else if (this.numerosRegex.test(this.newContrasena)==false){
                alert ('La contraseña debe contener solo numeros');
              }else{
                console.log('no entro en el else if');
              }
      }
  }
  enviologin(){
    this.router.navigate(['/login']);
  }

}
