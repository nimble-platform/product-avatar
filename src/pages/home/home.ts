import { Component } from '@angular/core';
import { ActionSheetController, NavController } from 'ionic-angular';
import { HomeService } from "./home.service";
import { AuthService } from "../../app/auth.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  timeLine: any;
  currentUser: any;
  constructor(
                public navCtrl: NavController,
                public actionSheetCtrl: ActionSheetController,
                public homeService: HomeService,
                public AuthService: AuthService) {
    this.currentUser = this.AuthService.getUserInfo();
  }

  ngOnInit() {
    this.getTimelineEvents();
  }

  async getTimelineEvents() {
    this.timeLine = await this.homeService._getTimelineEvents(this.currentUser);
  }

}
