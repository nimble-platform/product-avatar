import {Component, Inject} from '@angular/core';
import { AuthService } from "../../app/auth.service";
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from "../tabs/tabs";
import { ProductmanagerPage} from "../advanced/productmanager/productmanager";
import {TranslateService} from "@ngx-translate/core";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  credential = {"username": '', "password": ''};
  nimbleServer: number;
  languageApp: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthService,@Inject('NIMBLE_ENDPOINT') public nimbleEndPoint: any,
              private translate: TranslateService) {
    this.nimbleServer = 0;
    this.languageApp = 'it';
  }

  public ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    console.log(this.nimbleEndPoint);
  }

  public async login() : Promise<any> {
    try {
      let user = await this.auth.login(this.credential,this.nimbleServer,this.languageApp);

      this.navCtrl.setRoot(TabsPage)
    } catch (error) {
      console.log(error)
    }

  }

  cambiaLingua() {
    console.log("Cambio lingua "+this.languageApp)
    this.translate.use(this.languageApp);
  }
}

