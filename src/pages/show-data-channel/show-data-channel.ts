import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthService} from "../../app/auth.service";
import {NimbleService} from "../../app/nimble.service";

/**
 * Generated class for the ShowDataChannelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-show-data-channel',
  templateUrl: 'show-data-channel.html',
})
export class ShowDataChannelPage {

  data : any;
  currentUser : any;
  show: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,public auth: AuthService,
              public nimble: NimbleService) {
    this.data  = this.navParams.get('data');
    this.show = true;
    console.log("data");
    /*this.nimble.getBusinessProcessFromId(id)
      .then((res) => {
        this.data = res;

        console.log(res);
      });
      */
    console.log(this.data);
    this.currentUser = auth.getUserInfo()
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowDataChannelPage');
  }

  goBack() {
    this.navCtrl.pop();
  }
}
