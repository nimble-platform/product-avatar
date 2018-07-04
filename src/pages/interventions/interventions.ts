import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InterventionsService } from "./interventions.service";
import { AppService } from "../../app/app.service";
import { AuthService } from "../../app/auth.service";

@IonicPage()
@Component({
  selector: 'page-interventions',
  templateUrl: 'interventions.html',
})
export class InterventionsPage {

  interventionsSteps: any;
  serialNumber: any;
  currentUser: any;
  currentChannel: any;

  constructor(      public navCtrl: NavController, 
                    public navParams: NavParams, 
                    private interventionsService: InterventionsService, 
                    private App: AppService, 
                    private AuthService: AuthService) {
    this.serialNumber = this.App.getSn();
    this.currentUser = this.AuthService.getUserInfo();
    // the parameter item must has the channel property!! 
    this.currentChannel = this.navParams.get("item")["channel"];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestPage');
  }
  ngOnInit() { this.getTimelineEvents(); }

  async getTimelineEvents() {
    let fields = await this.interventionsService.getStreamAvailableFields(this.currentUser, this.currentChannel);
    let values = await this.interventionsService.getInterventionSteps(this.serialNumber, this.currentUser, this.currentChannel);
    this.interventionsSteps = this.App.constructViewObject(fields, values);
  }
}


