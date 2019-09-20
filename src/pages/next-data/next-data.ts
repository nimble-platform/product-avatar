import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DataRowDetailPage} from "../data-row-detail/data-row-detail";
import {NimbleService} from "../../app/nimble.service";
import {AlertController} from "ionic-angular";

/**
 * Generated class for the NextDataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-next-data',
  templateUrl: 'next-data.html',
})
export class NextDataPage {
  sensor: any;
  messages : any;
  loading = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, public nimble: NimbleService,
              public alertController: AlertController) {
    this.sensor  = this.navParams.get('sensor');

    //this.nimble.getNextData('', this.sensor.dataChannel, this.sensor.id )
    this.nimble.getNextData('', '388383-2923982-292929-9223', '25' )
      .then((data) => {
          console.log("getNextData data");
          console.log(data);
          this.messages = [];
          data.messages.forEach((item, key) =>  {
            this.messages.push(item);
            console.log(JSON.parse(item));

          });
          console.log(this.sensor);
          console.log(this.messages);
          this.loading = false;
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NextDataPage');
  }

  goDataRowDetail(i) {
    this.navCtrl.push(DataRowDetailPage,{message : JSON.parse(this.messages[i])});
  }

  goBack() {
    this.navCtrl.pop();
  }

  async sendIotDataTest() {
    //Chiamo l'invio del test
    this.nimble.sendIoTDataTest(this.sensor.dataChannel, this.sensor.id, '{ "iottestdata": { "idchannel": "abcde", "idsensor": "23", "time": "1564131262203", "message" : "iot data test by user ABCDEFG and company XyZSRL" } }')
      .then(res => {
        this.presentAlert();
      })
      .catch(res => {
        this.presentAlert();
      })
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      title: 'Invio dati di test',
      subTitle: '{ "iottestdata": { "idchannel": "abcde", "idsensor": "23", "time": "1564131262203", "message" : "iot data test by user ABCDEFG and company XyZSRL" } }',
      buttons: ['OK']
    });

    await alert.present();
  }

}
