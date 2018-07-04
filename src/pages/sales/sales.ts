import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SalesService } from "./sales.service";
import { AppService } from "../../app/app.service";
import { AuthService } from "../../app/auth.service";

@IonicPage()
@Component({
  selector: 'page-sales',
  templateUrl: 'sales.html',
})
export class SalesPage {
  
  salesSteps: any;
  serialNumber: any;
  currentUser: any;
  currentChannel: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private salesService: SalesService, public AppService: AppService, private AuthService: AuthService) {
    this.serialNumber = AppService.getSn();
    this.currentUser = AuthService.getUserInfo();
    this.currentChannel = navParams.get("item")["channel"];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalesPage');
  }
  ngOnInit() { this.getTimelineEvents(); }

  async getTimelineEvents() {
    let fields = await this.salesService.getStreamAvailableFields(this.currentUser, this.currentChannel);
    let values = await this.salesService.getSalesSteps(this.serialNumber, this.currentUser, this.currentChannel);
    this.salesSteps = this.AppService.constructViewObject(fields, values);
  }
}
