import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductionService } from "./production.service";
import { AppService } from "../../app/app.service";
import { AuthService } from "../../app/auth.service";

@IonicPage()
@Component({
  selector: 'page-production',
  templateUrl: 'production.html',
})
export class ProductionPage {

  productionSteps: any;
  serialNumber: any;
  currentUser: any;
  currentChannel: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private productionService: ProductionService, public appService: AppService, private AuthService: AuthService) {
    this.currentUser = AuthService.getUserInfo();
    this.serialNumber = appService.getSn();
    this.currentChannel = navParams.get("item")["channel"];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestPage');
  }
  ngOnInit() { this.getTimelineEvents(); }

  async getTimelineEvents() {
    let fields = await this.productionService.getStreamAvailableFields(this.currentUser, this.currentChannel);
    let values = await this.productionService.getProductionSteps(this.serialNumber, this.currentUser, this.currentChannel);
    this.productionSteps = this.appService.constructViewObject(fields, values);
  }
}
