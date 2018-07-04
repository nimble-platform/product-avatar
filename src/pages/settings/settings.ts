import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthService } from "../../app/auth.service";

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  currentUser: any;
  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              private alertCtrl: AlertController,
              public appCtrl: App,
              public auth: AuthService) {
    this.currentUser = auth.getUserInfo();
    console.log(this.currentUser);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  logout() {
    console.log("logout clicked... ");
    this.logoutConfirmation();
  }

  logoutConfirmation() {
    let alert = this.alertCtrl.create({
      title: 'Confirm Logout',
      message: 'Do you want to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('not sure');
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            console.log('logout confirmed...');
            // TODO delete user info from authService
            // this.auth.logout();
            this.appCtrl.getRootNav().push(LoginPage);
          }
        }
      ]
    });
    alert.present();
  }
}
