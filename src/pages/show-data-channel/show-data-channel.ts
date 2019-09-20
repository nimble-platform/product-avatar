import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthService} from "../../app/auth.service";
import {NimbleService} from "../../app/nimble.service";
import {NextDataPage} from "../next-data/next-data";
import {FilterDataPage} from "../filter-data/filter-data";
import {filterErrorsAndWarnings} from "@angular/compiler-cli";
import {File} from "@ionic-native/file";
import {DomSanitizer} from "@angular/platform-browser";

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
  hasFilteringData : boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,public auth: AuthService,
              public nimble: NimbleService, private file: File, public domSanitizer:DomSanitizer) {
    this.data  = this.navParams.get('data');
    this.show = true;

    //Devo cercare se i sensori hanno hasFiltering
    this.data.associatedSensors.forEach((item,key) => {
      this.data.associatedSensors[key].dataChannel = this.data.businessProcessID;
      if (item.advancedFiltering.includes('hasFilteringData')) {
        this.data.associatedSensors[key].hasFilteringData = true;
      }
      else {
        this.data.associatedSensors[key].hasFilteringData = false;
      }

      if (item.advancedFiltering.includes('hasrequest')) {
        this.data.associatedSensors[key].hasrequest = true;
      }
      else {
        this.data.associatedSensors[key].hasrequest = false;
      }

      //Le immagini per i nomi
      let filename = this.data.associatedSensors[key].name+".png";
      filename = filename.replace(" ","_");
      console.log("filename",filename);

      this.file.checkFile(this.file.applicationDirectory+"www/assets/img_sensor/",filename)
        .then((files) => {
          console.log("checkfile ok");
          console.log(this.file.applicationDirectory+"www/assets/img_sensor/"+filename);
          this.data.associatedSensors[key].img = this.file.applicationDirectory+"www/assets/img_sensor/"+filename;
          this.domSanitizer.bypassSecurityTrustUrl(this.data.associatedSensors[key].img);
        })
        .catch((err) => {
          console.log("file err "+this.file.applicationDirectory+"www/assets/img_sensor/"+filename);
          console.log(err);
          this.data.associatedSensors[key].img = '';
        })

      console.log(key);
      console.log(item);

    })
    console.log("data");

    /*this.nimble.getBusinessProcessFromId(id)
      .then((res) => {
        this.data = res;

        console.log(res);
      });
      */
    console.log(this.data);
    this.currentUser = auth.getUserInfo()

    this.nimble.getFilteringService()
      .then((code) => {
        console.log("getFilteringService");
        console.log(code);
        this.hasFilteringData = true;
    })
      .catch((err) => {
        console.log("getFilteringService KO");
        console.log(err);
        this.hasFilteringData = false;
      })
  }

  async checkFile(fileName)  {
    console.log("checkFile: "+this.file.applicationDirectory+"assets/icon/"+fileName);
    return this.file.checkFile(this.file.applicationDirectory+"assets/icon/",fileName)
      .then((files) => {
        console.log("checkfile ok");
        console.log(this.file.applicationDirectory+"assets/icon/"+fileName);
        return true;
      })
      .catch((err) => {
        console.log("file err "+this.file.applicationDirectory+"assets/icon/"+fileName);
        console.log(err);
        return false;
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowDataChannelPage');
  }

  goBack() {
    this.navCtrl.pop();
  }

  nextdata(i) {
    const sensor = this.data.associatedSensors[i];
    this.navCtrl.push(NextDataPage,{sensor : sensor, messages: []});
  }

  filterData(i) {
    this.navCtrl.push(FilterDataPage,{sensor: this.data.associatedSensors[i]});
  }

  sendIotDataTest() {
    this.nimble.sendIoTDataTest(1,1,'{ "iottestdata": { "idchannel": "abcde", "idsensor": "23", "time": "1564131262203", "message" : "iot data test by user ABCDEFG and company XyZSRL" } }')
      .then(data => {
        alert("iot test inviato con successo");
      })
      .catch(err => {
        alert("iot test inviato con successo");
      });
  }

}
