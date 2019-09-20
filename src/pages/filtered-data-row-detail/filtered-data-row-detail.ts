import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {File} from "@ionic-native/file";
import {SendFeedbackPage} from "../send-feedback/send-feedback";

/**
 * Generated class for the FilteredDataRowDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filtered-data-row-detail',
  templateUrl: 'filtered-data-row-detail.html',
})
export class FilteredDataRowDetailPage {
  message : any;
  tree : string = '';
  directory : any;
  sensor: any;
  dataKey: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private file: File) {
    this.message = this.navParams.get('message');
    this.sensor = this.navParams.get('sensor');
    this.dataKey = this.navParams.get('dataKey'); //{ name: meta[0], type : meta[1] , barcode : barcode }
    //Controllo se ha hasfeedback
    if (this.sensor.advancedFiltering.includes('hasfeedback')) {
      this.sensor.hasfeedback = true;
    }
    else {
      this.sensor.hasfeedback = false;
    }

    this.traverse(this.message,"&nbsp;&nbsp;",1);
    this.directory = this.file.applicationDirectory;
    console.log(this.directory);

    this.file.checkFile(this.file.applicationDirectory+"icon/","nimble.png")
      .then((files) => {
        console.log("file found");
      })
      .catch((err) => {
        console.log("file err");
        console.log(err);

      })
  }

  async checkFile(fileName)  {
    return this.file.checkFile(this.file.applicationDirectory+"icon/",fileName)
      .then((files) => {
        true;
      })
      .catch((err) => {
        console.log("file err");
        console.log(err);
        false;
      })
  }

  async traverse(obj, indent, level) {
    for (let k in obj) {

      if (obj[k] && typeof obj[k] === 'object') {
        if (level == 1) {
          this.tree = this.tree+"<h1>"+indent+k+"</h1>";
        }
        else {
          this.tree = this.tree+indent+k;
          //this.tree = this.tree+" ("+level+") "+"<br>";
          this.tree += "<br>";
        }

        let ret = await this.checkFile(k+".png");
        if (ret) {
          console.log("trovato");
          this.tree = this.tree +" <img src='"+this.file.applicationDirectory+"icon/"+k+".png'>";
        }


        this.traverse(obj[k],indent+"&nbsp;&nbsp;",level+1);
      } else {
        this.tree = this.tree+indent+k+" : "+obj[k]+"<br>";
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DataRowDetailPage');
  }

  goBack() {
    this.navCtrl.pop();
  }

  sendfeedback() {
    console.log("dentro sendfeedback");
    this.navCtrl.push(SendFeedbackPage,{sensor: this.sensor, dataKey: this.dataKey, message: this.message});
  }


}
