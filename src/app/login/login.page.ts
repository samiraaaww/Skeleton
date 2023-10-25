import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavigationExtras, Router} from '@angular/router';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage implements OnInit{

  constructor(private router: Router, private database: DatabaseService) { }

  nombreUsuario: string='';
  contrasena: string='';

  ngOnInit() {
  }

  contrasenaCounter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }

  registro(){
    this.router.navigate(['/registro']);
  }
  
  async login() {
    try{
      //entra aca siempre y funciona bien
      //si no existe devuelve: {"values": []}
      //si existe devuelve: {"values": [{"name": "camilo12", "contrasena": "1212"}]}
      const resultado =  await this.database.getUsersbyName(this.nombreUsuario, this.contrasena);
      if (resultado && resultado.values && resultado.values.length > 0) {
        const user = resultado.values[0];
        const userName = user.name;
        const userPassword = user.contrasena;
        const navigationExtras: NavigationExtras = {
          state: {
            username: user.name,
            password: user.contrasena
          }
        };
        alert("Bienvenido: "+userName);
        localStorage.setItem('token', Math.random().toString());
        if(userName!="admin12"){
          this.router.navigate(['/home'], navigationExtras);
        }else{
          if(userPassword!="1212"){
            alert("contrasena incorrecta"+ "contrasena: "+userPassword)
          }else{
            alert("hola"+ userName+ "contraseña: "+userPassword);
            this.router.navigate(['/admin']);
          }
        }
      }
      else {
        alert("Acceso denegado: Usuario y/o contraseña invalidos");
      }
    }catch(error){
      console.error(error);
    }
  }

}

