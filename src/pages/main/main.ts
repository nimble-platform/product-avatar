import { Component,Input } from '@angular/core';
import {AlertController, App, IonicPage, NavController, NavParams} from 'ionic-angular';
import { LoginPage } from '../login/login';
import {AuthService, User} from "../../app/auth.service";
import {NimbleService} from "../../app/nimble.service";
import {BomPage} from "../advanced/bom/bom";
import {QualityPage} from "../advanced/quality/quality";
import { ProductionPage} from "../advanced/production/production";
import {ProductPage} from "../advanced/product/product";
import {ProductmanagerPage } from "../advanced/productmanager/productmanager";

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {
  currentUser : any;
  currentNimble: any;

  json : any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public appCtrl: App,
    public auth: AuthService,
    public nimble: NimbleService) {
    this.currentUser = auth.getUserInfo();
      console.log(this.currentUser);
      this.json = [];

      this.json['bom'] = '{ "bom": {"productGroup":"DishWasher","productType":"Whirlpool WFO 3T123 PF","serialNumber":"SN1547896314567-0","photo":"https://www.whirlpool.it/digitalassets/Picture/web1000x1000/859991021030_1000x1000_perspective.jpg","description":"lavastoviglie Whirlpool: color inox. Classe energetica A++, per consumi ridotti di energia elettrica. Un utile timer digitale che segnala la fine del ciclo di lavaggio. Tecnologia innovativa che garantisce un funzionamento super silezioso, per un elettrodomestico senza rumori. Eccellente capacità di pulizia per risultati di lavaggio ideali.","processDuration":{"unitOfMeasure":"Hours","value":"0,3"},"processCosts":{"unitOfMeasure":"€","value":"15"},"transportCost":{"unitOfMeasure":"€","value":"10"},"energyConsumption":{"unitOfMeasure":"kWh/kg","value":"0,08"},"disposalCost":{"unitOfMeasure":"€/kg","value":"3"},"quantityIron":{"unitOfMeasure":"Kg","value":"21,991"},"quantityPlastic":{"unitOfMeasure":"Kg","value":"14,186"},"quantityCopper":{"unitOfMeasure":"Kg","value":"1,098"},"quantitySilver":{"unitOfMeasure":"Kg","value":"0,035"},"quantityGold":{"unitOfMeasure":"Kg","value":"0,0001"},"quantityPalladium":{"unitOfMeasure":"Kg","value":"0,0099"},"quantityInox":{"unitOfMeasure":"Kg","value":"2,875"},"quantityAluminium":{"unitOfMeasure":"Kg","value":"1,053"},"quantityGlass":{"unitOfMeasure":"Kg","value":"0"},"quantityGas":{"unitOfMeasure":"Kg","value":"0"},"quantityOil":{"unitOfMeasure":"Kg","value":"0"},"quantityConcreteDisposed":{"unitOfMeasure":"Kg","value":"6,935"},"quantityWasteDisposed":{"unitOfMeasure":"Kg","value":"2,355"}}}';
      this.json['quality'] = '{"quality": {"productGroup":"DishWasher","productType":"Whirlpool WFO 3T123 PF","serialNumber":"SN1547896314567-0","description":"lavastoviglie Whirlpool: color inox. Classe energetica A++, per consumi ridotti di energia elettrica. Un utile timer digitale che segnala la fine del ciclo di lavaggio. Tecnologia innovativa che garantisce un funzionamento super silezioso, per un elettrodomestico senza rumori. Eccellente capacità di pulizia per risultati di lavaggio ideali.","processDuration":{"unitOfMeasure":"Hours","value":"0,3"}, "issues":0, "user": "Francesco", "note":"nessun difetto riscontrato"}}';
      this.json['product'] = '{"product" : { "bom": {"productGroup":"DishWasher","productType":"Whirlpool WFO 3T123 PF","serialNumber":"SN1547896314567-0","photo":"https://www.whirlpool.it/digitalassets/Picture/web1000x1000/859991021030_1000x1000_perspective.jpg","description":"lavastoviglie Whirlpool: color inox. Classe energetica A++, per consumi ridotti di energia elettrica. Un utile timer digitale che segnala la fine del ciclo di lavaggio. Tecnologia innovativa che garantisce un funzionamento super silezioso, per un elettrodomestico senza rumori. Eccellente capacità di pulizia per risultati di lavaggio ideali.","processDuration":{"unitOfMeasure":"Hours","value":"0,3"},"processCosts":{"unitOfMeasure":"€","value":"15"},"transportCost":{"unitOfMeasure":"€","value":"10"},"energyConsumption":{"unitOfMeasure":"kWh/kg","value":"0,08"},"disposalCost":{"unitOfMeasure":"€/kg","value":"3"},"quantityIron":{"unitOfMeasure":"Kg","value":"21,991"},"quantityPlastic":{"unitOfMeasure":"Kg","value":"14,186"},"quantityCopper":{"unitOfMeasure":"Kg","value":"1,098"},"quantitySilver":{"unitOfMeasure":"Kg","value":"0,035"},"quantityGold":{"unitOfMeasure":"Kg","value":"0,0001"},"quantityPalladium":{"unitOfMeasure":"Kg","value":"0,0099"},"quantityInox":{"unitOfMeasure":"Kg","value":"2,875"},"quantityAluminium":{"unitOfMeasure":"Kg","value":"1,053"},"quantityGlass":{"unitOfMeasure":"Kg","value":"0"},"quantityGas":{"unitOfMeasure":"Kg","value":"0"},"quantityOil":{"unitOfMeasure":"Kg","value":"0"},"quantityConcreteDisposed":{"unitOfMeasure":"Kg","value":"6,935"},"quantityWasteDisposed":{"unitOfMeasure":"Kg","value":"2,355"}}, "quality": {"productGroup":"DishWasher","productType":"Whirlpool WFO 3T123 PF","serialNumber":"SN1547896314567-0","description":"lavastoviglie Whirlpool: color inox. Classe energetica A++, per consumi ridotti di energia elettrica. Un utile timer digitale che segnala la fine del ciclo di lavaggio. Tecnologia innovativa che garantisce un funzionamento super silezioso, per un elettrodomestico senza rumori. Eccellente capacità di pulizia per risultati di lavaggio ideali.","processDuration":{"unitOfMeasure":"Hours","value":"0,3"}, "issues":0, "user": "Francesco", "note":"nessun difetto riscontrato"},  "production": {"productGroup":"DishWasher","productType":"Whirlpool WFO 3T123 PF","serialNumber":"SN1547896314567-0","description":"lavastoviglie Whirlpool: color inox. Classe energetica A++, per consumi ridotti di energia elettrica. Un utile timer digitale che segnala la fine del ciclo di lavaggio. Tecnologia innovativa che garantisce un funzionamento super silezioso, per un elettrodomestico senza rumori. Eccellente capacità di pulizia per risultati di lavaggio ideali.","processDuration":{"unitOfMeasure":"Hours","value":"0,3"}}  }}';
      this.json['production'] = '{"production": {"productGroup":"DishWasher","productType":"Whirlpool WFO 3T123 PF","serialNumber":"SN1547896314567-0","description":"lavastoviglie Whirlpool: color inox. Classe energetica A++, per consumi ridotti di energia elettrica. Un utile timer digitale che segnala la fine del ciclo di lavaggio. Tecnologia innovativa che garantisce un funzionamento super silezioso, per un elettrodomestico senza rumori. Eccellente capacità di pulizia per risultati di lavaggio ideali.","processDuration":{"unitOfMeasure":"Hours","value":"0,3"}}}';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  logout() {
    console.log("logout clicked... ");
    this.logoutConfirmation();
  }

  goBom() {
    this.navCtrl.push(BomPage);
  }

  goQuality() {
    this.navCtrl.push(QualityPage);
  }

  goProduction() {
    this.navCtrl.push(ProductionPage);
  }

  goProduct() {
    this.navCtrl.push(ProductPage);
  }

  goProductManager(cosa) {
    this.navCtrl.push(ProductmanagerPage, { json : this.json[cosa]});
  }


  logoutConfirmation() {
    let alert = this.alertCtrl.create({
      title: 'Confirm Logout',
      message: 'Do you want to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('not sure');
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            console.log('logout confirmed...');
            // TODO delete user info from authService
            // this.auth.logout();
            this.appCtrl.getRootNav().push(LoginPage);
          }
        }
      ]
    });
    alert.present();
  }
}
