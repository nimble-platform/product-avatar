import {Component, Inject} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthService} from "../../app/auth.service";
import {NimbleService} from "../../app/nimble.service";

/**
 * Generated class for the ContracstlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contracstlist',
  templateUrl: 'contracstlist.html',
})
export class ContracstlistPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthService,public nimble: NimbleService,
              @Inject('NIMBLE_ENDPOINT') public nimbleEndPoint: any) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContracstlistPage');

    this.nimble.getContractList1()
      .then((res) => {
        console.log("getContractList1");
        console.log(res);
      });

    this.nimble.getContractList2()
      .then((res) => {
        console.log("getContractList1");
        console.log(res);
      });

    //Prendo i due JSON

  }

}
