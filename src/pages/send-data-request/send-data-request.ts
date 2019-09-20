import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SendDataRequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-send-data-request',
  templateUrl: 'send-data-request.html',
})
export class SendDataRequestPage {
  sensor: any;
  dataKey: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.sensor = this.navParams.get('sensor');
    this.dataKey = this.navParams.get('dataKey');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SendDataRequestPage');
  }


  goBack() {
    this.navCtrl.pop();
  }

  sendDataRequest() {
    alert("tbd");
    this.goBack();
  }
}
