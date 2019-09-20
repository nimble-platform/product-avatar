import {Component, Inject} from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthService } from "../../app/auth.service";
import {NimbleClass, NimbleService} from "../../app/nimble.service";
import {Storage} from "@ionic/storage";

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  currentUser: any;
  currentNimble: any;
  logo : string;

  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              private alertCtrl: AlertController,
              public appCtrl: App,
              public auth: AuthService,
              public nimble: NimbleService,
              @Inject('NIMBLE_ENDPOINT') public nimbleEndPoint: any,
              private storage: Storage) {
    this.currentUser = auth.getUserInfo();
    console.log(this.currentUser);
    this.currentNimble = this.nimble.retriveAllData();
    this.getCompanyInfo();
  }

    ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
    console.log("prima di prendere nimble");

    console.log("dopo prendere nimble");
    console.log(this.currentNimble);
  }

  async getCompanyInfo() {
    this.currentUser.companyInfo = await this.auth.getCompanyInfo();
    this.currentUser.companySettings = await this.auth.getCompanySettings();
    if (typeof (this.currentUser.companySettings.description.logoImageId) != 'undefined') {
      //http://161.156.70.122/identity/company-settings/image/405
      this.logo = this.nimbleEndPoint[this.currentUser.idServer].url+"identity/company-settings/image/"+this.currentUser.companySettings.description.logoImageId;
      console.log("logo");
      console.log(this.logo);
    }
    else {
      console.log("no logo");
    }

    console.log("------------- current user -----------");
    console.log(this.currentUser);
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
            this.storage.remove('currentUser')
              .then(data => {
                // TODO delete user info from authService
                // this.auth.logout();
                this.appCtrl.getRootNav().setRoot(LoginPage);
              });
          }
        }
      ]
    });
    alert.present();
  }

  async getNimbleData() {
    this.currentNimble.statistics = this.nimble.getStatistic();
  }
}
