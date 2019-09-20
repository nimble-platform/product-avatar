import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {File} from "@ionic-native/file";

/**
 * Generated class for the DataRowDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-data-row-detail',
  templateUrl: 'data-row-detail.html',
})
export class DataRowDetailPage {
  message : any;
  tree : string = '';
  directory : any;


  constructor(public navCtrl: NavController, public navParams: NavParams, private file: File) {
    this.message = this.navParams.get('message');
    console.log("message");
    console.log(this.message);

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
    console.log("checkFile: "+this.file.applicationDirectory+"www/assets/icon/"+fileName);
    return this.file.checkFile(this.file.applicationDirectory+"www/assets/icon/",fileName)
      .then((files) => {
        console.log("checkfile ok");
        console.log(this.file.applicationDirectory+"www/assets/icon/"+fileName);
        true;
      })
      .catch((err) => {
        console.log("file err "+this.file.applicationDirectory+"www/assets/icon/"+fileName);
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

}
