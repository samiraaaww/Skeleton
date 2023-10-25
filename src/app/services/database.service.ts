import { Injectable, WritableSignal, signal } from '@angular/core';
import { SQLiteConnection, CapacitorSQLite, SQLiteDBConnection } from '@capacitor-community/sqlite';


const DB_USERS = 'myuserdb';

export interface User{
  id: number;
  name: string;
  contrasena:string;
  active:number;
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;
  private users: WritableSignal<User[]> = signal<User[]>([]);

  constructor() { }
  
  async initializPlugin(){
    this.db = await this.sqlite.createConnection(
      DB_USERS,
      false,
      'no-encryption',
      1,
      false
    );

    await this.db.open();
    
    const schema = 'CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT(8) NOT NULL, contrasena TEXT NOT NULL, active INTEGER DEFAULT 1);';
      
    this.db.execute(schema);
      this.loadUsers();
      return true;
  }

  getUsers(){
    return this.users;
  }

  async getUsersbyName(name: string, password: string) {
      const query = `SELECT name, contrasena FROM users WHERE name = ? AND contrasena = ?`;
      const result = await this.db.query(query, [name, password]);
      return result;
  }
    

  async delTable(){
    const query = `DROP TABLE users`;
    const result = await this.db.query(query);
    return result;
  }

  //CRUD
  async loadUsers(){
    const users = await this.db.query('SELECT * FROM users;');
    this.users.set(users.values || []);
  }

  async addUser(name:string, contrasena:string){
    const query = `INSERT INTO users (name, contrasena) VALUES ('${name}' , '${contrasena}')`;
    const result = await this.db.query(query);

    this.loadUsers();
    return result;
  }


  async updateUserPassword(userName: string, newPassword: string) {
    const query = `UPDATE users SET contrasena='${newPassword}' WHERE name='${userName}'`;
    try{
      const result = await this.db.query(query);
      this.loadUsers();
      console.log(JSON.stringify(result));
      return result;
    }
    catch(error){
      console.error('Error al actualizar la contraseña:', error);
      return undefined;
    }
  }


  async updateUserName(nombreUsuario: string, newName: string) {
    const query = `UPDATE users SET name='${newName}' WHERE name='${nombreUsuario}'`;
    try{
      const result = await this.db.query(query);
      this.loadUsers();
      return result;
    }catch(error){
      console.error('Error al actualizar el usuario', error);
      return undefined;
    }
  }

  async deleteUserByName(name:string){
    const query = `DELETE FROM users WHERE name='${name}'`;
    try{
      const result = await this.db.query(query);
      this.loadUsers();
      return result;
    }catch(error){
      console.error('Error al eliminar la cuenta', error);
      return undefined;
    }
  }

}
