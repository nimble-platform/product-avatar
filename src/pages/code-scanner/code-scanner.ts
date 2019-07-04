import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { HomePage } from "../home/home";
import { AppService } from "../../app/app.service";
import {LoginPage} from "../login/login";

@IonicPage()
@Component({
  selector: 'page-code-scanner',
  templateUrl: 'code-scanner.html',

})
export class CodeScannerPage {
  option: number = 1;
  isBarcode: boolean = true;
  serianNumber: number;
  constructor(public appService: AppService,
    public navCtrl: NavController,
    public navParams: NavParams,
    private barcodeScanner: BarcodeScanner,
    public appCtrl: App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CodeScannerPage');
    this.navCtrl.setRoot(LoginPage);

  }
  getProductData(barcode) {
    this.appService.setSn(barcode);
    this.appCtrl.getRootNav().push(HomePage, { codeBar: barcode });

  }

  insertedSeriailNumber() {
    this.appService.setSn(this.serianNumber + "");
    console.log(this.serianNumber);
    this.appCtrl.getRootNav().push(HomePage, { codeBar: this.serianNumber });
  }

  nimbleScanner() {
    this.barcodeScanner.scan().then((barcodeData) => {
      // Success! Barcode data is here
      this.getProductData(barcodeData);
    }, (err) => {
      // An error occurred
    });
  }
  // radio selection
  selected(option) {
    this.option = option;
    if (option === 1) {
      this.isBarcode = true;
    } else {
      this.isBarcode = false;
    }
  }
}
