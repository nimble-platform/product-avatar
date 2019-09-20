import {Component, Inject, Input} from '@angular/core';
import {AlertController, App, IonicPage, NavController, NavParams} from 'ionic-angular';
import { LoginPage } from '../login/login';
import {AuthService, User} from "../../app/auth.service";
import {NimbleService} from "../../app/nimble.service";
import {BomPage} from "../advanced/bom/bom";
import {QualityPage} from "../advanced/quality/quality";
import { ProductionPage} from "../advanced/production/production";
import {ProductPage} from "../advanced/product/product";
import {ProductmanagerPage } from "../advanced/productmanager/productmanager";
import { ShowDataChannelPage } from "../show-data-channel/show-data-channel";
import {Storage} from "@ionic/storage";
import {SettingsPage} from "../settings/settings";
import {ContractslistPage} from "../contractslist/contractslist";

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {
  currentUser : any;
  currentNimble: any;
  showData = false;
  dataChannel : any;
  logo: any = '';

  //json : any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public appCtrl: App,
    public auth: AuthService,
    public nimble: NimbleService,
    private storage: Storage,
    @Inject('NIMBLE_ENDPOINT') public nimbleEndPoint: any,) {

      /*this.json = [];

      this.json['bom'] = '{ "bom": {"productGroup":"DishWasher","productType":"Whirlpool WFO 3T123 PF","serialNumber":"SN1547896314567-0","photo":"https://www.whirlpool.it/digitalassets/Picture/web1000x1000/859991021030_1000x1000_perspective.jpg","description":"lavastoviglie Whirlpool: color inox. Classe energetica A++, per consumi ridotti di energia elettrica. Un utile timer digitale che segnala la fine del ciclo di lavaggio. Tecnologia innovativa che garantisce un funzionamento super silezioso, per un elettrodomestico senza rumori. Eccellente capacità di pulizia per risultati di lavaggio ideali.","processDuration":{"unitOfMeasure":"Hours","value":"0,3"},"processCosts":{"unitOfMeasure":"€","value":"15"},"transportCost":{"unitOfMeasure":"€","value":"10"},"energyConsumption":{"unitOfMeasure":"kWh/kg","value":"0,08"},"disposalCost":{"unitOfMeasure":"€/kg","value":"3"},"quantityIron":{"unitOfMeasure":"Kg","value":"21,991"},"quantityPlastic":{"unitOfMeasure":"Kg","value":"14,186"},"quantityCopper":{"unitOfMeasure":"Kg","value":"1,098"},"quantitySilver":{"unitOfMeasure":"Kg","value":"0,035"},"quantityGold":{"unitOfMeasure":"Kg","value":"0,0001"},"quantityPalladium":{"unitOfMeasure":"Kg","value":"0,0099"},"quantityInox":{"unitOfMeasure":"Kg","value":"2,875"},"quantityAluminium":{"unitOfMeasure":"Kg","value":"1,053"},"quantityGlass":{"unitOfMeasure":"Kg","value":"0"},"quantityGas":{"unitOfMeasure":"Kg","value":"0"},"quantityOil":{"unitOfMeasure":"Kg","value":"0"},"quantityConcreteDisposed":{"unitOfMeasure":"Kg","value":"6,935"},"quantityWasteDisposed":{"unitOfMeasure":"Kg","value":"2,355"}}}';
      this.json['quality'] = '{"quality": {"productGroup":"DishWasher","productType":"Whirlpool WFO 3T123 PF","serialNumber":"SN1547896314567-0","description":"lavastoviglie Whirlpool: color inox. Classe energetica A++, per consumi ridotti di energia elettrica. Un utile timer digitale che segnala la fine del ciclo di lavaggio. Tecnologia innovativa che garantisce un funzionamento super silezioso, per un elettrodomestico senza rumori. Eccellente capacità di pulizia per risultati di lavaggio ideali.","processDuration":{"unitOfMeasure":"Hours","value":"0,3"}, "issues":0, "user": "Francesco", "note":"nessun difetto riscontrato"}}';
      this.json['product'] = '{"product" : { "bom": {"productGroup":"DishWasher","productType":"Whirlpool WFO 3T123 PF","serialNumber":"SN1547896314567-0","photo":"https://www.whirlpool.it/digitalassets/Picture/web1000x1000/859991021030_1000x1000_perspective.jpg","description":"lavastoviglie Whirlpool: color inox. Classe energetica A++, per consumi ridotti di energia elettrica. Un utile timer digitale che segnala la fine del ciclo di lavaggio. Tecnologia innovativa che garantisce un funzionamento super silezioso, per un elettrodomestico senza rumori. Eccellente capacità di pulizia per risultati di lavaggio ideali.","processDuration":{"unitOfMeasure":"Hours","value":"0,3"},"processCosts":{"unitOfMeasure":"€","value":"15"},"transportCost":{"unitOfMeasure":"€","value":"10"},"energyConsumption":{"unitOfMeasure":"kWh/kg","value":"0,08"},"disposalCost":{"unitOfMeasure":"€/kg","value":"3"},"quantityIron":{"unitOfMeasure":"Kg","value":"21,991"},"quantityPlastic":{"unitOfMeasure":"Kg","value":"14,186"},"quantityCopper":{"unitOfMeasure":"Kg","value":"1,098"},"quantitySilver":{"unitOfMeasure":"Kg","value":"0,035"},"quantityGold":{"unitOfMeasure":"Kg","value":"0,0001"},"quantityPalladium":{"unitOfMeasure":"Kg","value":"0,0099"},"quantityInox":{"unitOfMeasure":"Kg","value":"2,875"},"quantityAluminium":{"unitOfMeasure":"Kg","value":"1,053"},"quantityGlass":{"unitOfMeasure":"Kg","value":"0"},"quantityGas":{"unitOfMeasure":"Kg","value":"0"},"quantityOil":{"unitOfMeasure":"Kg","value":"0"},"quantityConcreteDisposed":{"unitOfMeasure":"Kg","value":"6,935"},"quantityWasteDisposed":{"unitOfMeasure":"Kg","value":"2,355"}}, "quality": {"productGroup":"DishWasher","productType":"Whirlpool WFO 3T123 PF","serialNumber":"SN1547896314567-0","description":"lavastoviglie Whirlpool: color inox. Classe energetica A++, per consumi ridotti di energia elettrica. Un utile timer digitale che segnala la fine del ciclo di lavaggio. Tecnologia innovativa che garantisce un funzionamento super silezioso, per un elettrodomestico senza rumori. Eccellente capacità di pulizia per risultati di lavaggio ideali.","processDuration":{"unitOfMeasure":"Hours","value":"0,3"}, "issues":0, "user": "Francesco", "note":"nessun difetto riscontrato"},  "production": {"productGroup":"DishWasher","productType":"Whirlpool WFO 3T123 PF","serialNumber":"SN1547896314567-0","description":"lavastoviglie Whirlpool: color inox. Classe energetica A++, per consumi ridotti di energia elettrica. Un utile timer digitale che segnala la fine del ciclo di lavaggio. Tecnologia innovativa che garantisce un funzionamento super silezioso, per un elettrodomestico senza rumori. Eccellente capacità di pulizia per risultati di lavaggio ideali.","processDuration":{"unitOfMeasure":"Hours","value":"0,3"}}  }}';
      this.json['production'] = '{"production": {"productGroup":"DishWasher","productType":"Whirlpool WFO 3T123 PF","serialNumber":"SN1547896314567-0","description":"lavastoviglie Whirlpool: color inox. Classe energetica A++, per consumi ridotti di energia elettrica. Un utile timer digitale che segnala la fine del ciclo di lavaggio. Tecnologia innovativa che garantisce un funzionamento super silezioso, per un elettrodomestico senza rumori. Eccellente capacità di pulizia per risultati di lavaggio ideali.","processDuration":{"unitOfMeasure":"Hours","value":"0,3"}}}';
      */


  }

  ionViewDidLoad() {
    this.storage.get('currentUser').then(data => {
      if (data == null) return;
      this.currentUser = data;
      if (typeof (this.currentUser.companySettings.description.logoImageId) != 'undefined') {
        //http://161.156.70.122/identity/company-settings/image/405
        this.logo = this.nimbleEndPoint[this.currentUser.idServer].url+"identity/company-settings/image/"+this.currentUser.companySettings.description.logoImageId;
      }
      else {

      }

      /**
       * Questo perchè auth potrebbe non avere ancora i dati dallo storage.
       */
      this.auth.setUserInfo(data);

      this.nimble.getChannelAll()
        .then((res) => {
          this.showData = true;
          this.dataChannel = res;
          console.log(res);
        });
    });
  }

  goInfo() {
    this.navCtrl.push(SettingsPage);
  }

  goDc() {
    this.navCtrl.push(ContractslistPage);
  }
  visualizzaDC(id) {
    this.navCtrl.push(ShowDataChannelPage, { data : this.dataChannel[id].businessProcessID});
  }
}
