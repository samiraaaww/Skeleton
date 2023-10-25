import { Component, OnInit } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { IonicModule } from '@ionic/angular';
import { DatabaseService } from './services/database.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class AppComponent implements OnInit {
  constructor(private database: DatabaseService) {
   
  }
  async ngOnInit(): Promise<void> {
    await this.database.initializPlugin();
  }

  async initApp(){
    
    SplashScreen.hide();
  }
}

