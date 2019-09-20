import { Component,  ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from "../pages/tabs/tabs";
import { LoginPage } from "../pages/login/login";
import { AuthService } from './auth.service';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: 'app.html'
})
export class ProductAvatar {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = TabsPage;
  user: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, auth: AuthService,
              private storage: Storage, translate: TranslateService) {
    translate.setDefaultLang('it');
    translate.use('it');

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      //this.rootPage = LoginPage;

      this.storage.get('currentUser').then((data) => {
        if (data === null) {
          //console.log("Authentication required");
          //console.log(auth.getUserInfo());
          this.rootPage = LoginPage;
        }
        else {
          //console.log("Is logged in");
          auth.setUserInfo(data);
          //console.log(auth.getUserInfo());
          this.user = auth.getUserInfo();
          this.rootPage = TabsPage;
        }
      });
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
