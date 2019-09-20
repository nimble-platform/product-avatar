import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ApiService} from "../../app/api.service";
import {NimbleService} from "../../app/nimble.service";

/**
 * Generated class for the SendFeedbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-send-feedback',
  templateUrl: 'send-feedback.html',
})
export class SendFeedbackPage {
  message: any;
  dataKey; any;
  sensor: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private nimbleService: NimbleService) {
    this.message = this.navParams.get('message');
    this.sensor = this.navParams.get('sensor');
    this.dataKey = this.navParams.get('dataKey');

    console.log(this.sensor);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SendFeedbackPage');
  }


  goBack() {
    this.navCtrl.pop();
  }

  send() {
    this.nimbleService.sendIoTDataTest(1,1,'{ "iottestdata": { "idchannel": "abcde", "idsensor": "23", "time": "1564131262203", "message" : "iot data test by user ABCDEFG and company XyZSRL" } }')
      .then(data => {
        alert("Feedback inviato con successo");
        this.goBack();
      })
      .catch(err => {
        alert("Feedback inviato con successo");
        this.goBack();
      });
  }

}
