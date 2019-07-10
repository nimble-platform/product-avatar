import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {NimbleService} from "../../app/nimble.service";

/**
 * Generated class for the ContractdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contractdetails',
  templateUrl: 'contractdetails.html',
})
export class ContractdetailsPage {
  group : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public nimble: NimbleService) {
    this.group = navParams.get('group');
    this.nimble.getDataChannelFromAssociatedGroups(this.group)
      .then((res) => {
        console.log(res);
      })
      .catch((res) => {
        console.log(res);
        alert("errore");
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContractdetailsPage');
  }

  goBack() {
    this.navCtrl.pop();
  }

}
