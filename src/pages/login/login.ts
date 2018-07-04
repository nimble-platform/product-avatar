import { Component } from '@angular/core';
import { AuthService } from "../../app/auth.service";
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from "../tabs/tabs";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  credential = {"username": "CS", "password": "pwd"}
  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthService) {}

  public ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  public async login() : Promise<any> {
    try {
      let user = await this.auth.login(this.credential);
      this.navCtrl.setRoot(TabsPage)
    } catch (error) {
      console.log(error)
    }
  }
}
