import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IssuesService } from "./issues.service";
import { AppService } from "../../app/app.service";
import { AuthService } from "../../app/auth.service";

@IonicPage()
@Component({
  selector: 'page-issues',
  templateUrl: 'issues.html',
})
export class IssuesPage {

  serialNumber: any;
  issuesSteps: any;
  currentUser: any;
  currentChannel: any
  constructor(          public navCtrl: NavController, 
                        public navParams: NavParams, 
                        private issuesService: IssuesService, 
                        private app: AppService, 
                        private AuthService: AuthService) {
    this.serialNumber = app.getSn();
    this.currentUser = AuthService.getUserInfo();
    this.currentChannel = navParams.get("item")["channel"];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IssuesPage');
  }

  ngOnInit() { this.getTimelineEvents(); }

  async getTimelineEvents() {
    let fields = await this.issuesService.getStreamAvailableFields(this.currentUser, this.currentChannel);
    let values = await this.issuesService.getIssueSteps(this.serialNumber, this.currentUser, this.currentChannel);
    this.issuesSteps = this.app.constructViewObject(fields, values);
  }
}
