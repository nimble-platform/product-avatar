import { Component,  ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from "../pages/tabs/tabs";
import { LoginPage } from "../pages/login/login";
import { AuthService } from './auth.service';

@Component({
  templateUrl: 'app.html'
})
export class ProductAvatar {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = TabsPage;
  profilePicture:any = "assets/avatar_profile.jpg";

  selectedItem: any;
  bolitems: Array<{title: string,  icon: string,  page: string}>;
  molitems: Array<{title: string,  icon: string,  page: string}>;
  user: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, auth: AuthService) {
    this.bolitems=[
      {title: 'Production',icon:'construct',page:'ProductionPage'},
      {title:'Test',icon:'flask',page: 'TestPage'},
      {title:'Storing',icon:'cube',page:'StoringPage'}
    ];
    this.molitems=[
      {title:'Feedback',icon:'text', page:'FeedbackPage'},
      {title:'Issues',icon:'headset',page:'IssuesPage'},
      {title:'Interventions',icon:'build',page:'InterventionsPage'},
      {title:'Sensors values',icon:'ionitron',page:'SensorsValuesPage'}
    ];
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      if (auth.getUserInfo()) {
          console.log("Is logged in");
          console.log(auth.getUserInfo());
          this.user = auth.getUserInfo();
          this.rootPage = TabsPage;
      } else {
          console.log("Authentication required");
          console.log(auth.getUserInfo());
          this.rootPage = LoginPage;
      }
    });
  }
  
  itemTapped(event, item) {
    this.nav.push(item.page, {
      item: item
    });
  }

  logout() {
    console.log("Logout clicked... ");
  }
}
