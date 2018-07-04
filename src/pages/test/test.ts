import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TestService } from "./test.service";
import { AppService } from "../../app/app.service";
import { AuthService } from "../../app/auth.service";

@IonicPage()
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {

  testSteps: any;
  serialNumber: any;
  currentUser: any;
  currentChannel: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private testService: TestService, private App: AppService, private AuthService: AuthService) {
    this.serialNumber = App.getSn();
    this.currentUser = AuthService.getUserInfo();
    this.currentChannel = navParams.get("item")["channel"];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestPage');
  }

  ngOnInit() { this.getTimelineEvents(); }

  async getTimelineEvents() {
    let fields = await this.testService.getStreamAvailableFields(this.currentUser, this.currentChannel);
    let values = await this.testService.getTestSteps(this.serialNumber, this.currentUser, this.currentChannel);
    this.testSteps = this.App.constructViewObject(fields, values);
  }
}
