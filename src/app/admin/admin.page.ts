import { Component, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AdminPage implements OnInit {

  constructor( private router: Router, private database: DatabaseService) {
    effect(()=>{
      console.log('USERS CHANGED',this.users());
    });
  }
  users = this.database.getUsers();
  databaseService: any;
  name: string='';

  ngOnInit(): void{
  }

  async deleteUser(name: string){
    await this.database.deleteUserByName(name);
    alert("User deleted successfully")
  }

  async deleteTable(){
    await this.database.delTable();
    alert('table deleted');
  }

  async cargarUsuarios(){
    try{
        await this.database.loadUsers();
    }catch(error: any){
           console.error('Error al actualizar el nombre:', error);
    }
  }


  enviologin(){
    this.router.navigate(['/login']);
  }
}
