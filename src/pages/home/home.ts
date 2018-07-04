import { Component } from '@angular/core';
import { ActionSheetController, NavController } from 'ionic-angular';
import { HomeService } from "./home.service";
import { AppService } from "../../app/app.service";
import { AuthService } from "../../app/auth.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  timeLine: any;
  currentUser: any;
  constructor(  public appService: AppService,
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
    this.appService.setAvailableChannelList(this.timeLine);
  }

  itemTapped(event, item) {
    this.navCtrl.push(this.appService.getPage(item.phase), {
      item: item
    });
  }

  showProductInformation() {
    this.navCtrl.push(this.appService.getPage("productInfos"), {
      "sn": this.appService.getSn() // not necessary... 
    });
  }

}
