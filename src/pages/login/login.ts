import {Component, Inject} from '@angular/core';
import { AuthService } from "../../app/auth.service";
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from "../tabs/tabs";
import { ProductmanagerPage} from "../advanced/productmanager/productmanager";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  credential = {"username": 'yourNimbleUsernameHere', "password": '*****'};
  nimbleServer: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthService,@Inject('NIMBLE_ENDPOINT') public nimbleEndPoint: any) {}

  public ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    console.log(this.nimbleEndPoint);
  }

  public async login() : Promise<any> {
    /*this.navCtrl.setRoot(ProductmanagerPage);

    return;
    */
    try {
      let user = await this.auth.login(this.credential,this.nimbleServer);

      user.roles = await this.auth.getUserRoles();
      console.log(user.roles);

      this.navCtrl.setRoot(TabsPage)
    } catch (error) {
      console.log(error)
    }

  }
}
/*
<ion-item>
            <ion-label>nimble Server</ion-label>
            <ion-select ok-text="seleziona il server nimble" >
              <ion-select-option *ngFor="let server of nimbleEndPoint">{{server.name}}></ion-select-option>
            </ion-select>
          </ion-item>
 */
