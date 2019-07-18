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
import { ShowDataChannelPage } from "../show-data-channel/show-data-channel";

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

  json : any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public appCtrl: App,
    public auth: AuthService,
    public nimble: NimbleService) {
    this.currentUser = auth.getUserInfo();
      this.json = [];

      this.json['bom'] = '{ "bom": {"productGroup":"DishWasher","productType":"Whirlpool WFO 3T123 PF","serialNumber":"SN1547896314567-0","photo":"https://www.whirlpool.it/digitalassets/Picture/web1000x1000/859991021030_1000x1000_perspective.jpg","description":"lavastoviglie Whirlpool: color inox. Classe energetica A++, per consumi ridotti di energia elettrica. Un utile timer digitale che segnala la fine del ciclo di lavaggio. Tecnologia innovativa che garantisce un funzionamento super silezioso, per un elettrodomestico senza rumori. Eccellente capacità di pulizia per risultati di lavaggio ideali.","processDuration":{"unitOfMeasure":"Hours","value":"0,3"},"processCosts":{"unitOfMeasure":"€","value":"15"},"transportCost":{"unitOfMeasure":"€","value":"10"},"energyConsumption":{"unitOfMeasure":"kWh/kg","value":"0,08"},"disposalCost":{"unitOfMeasure":"€/kg","value":"3"},"quantityIron":{"unitOfMeasure":"Kg","value":"21,991"},"quantityPlastic":{"unitOfMeasure":"Kg","value":"14,186"},"quantityCopper":{"unitOfMeasure":"Kg","value":"1,098"},"quantitySilver":{"unitOfMeasure":"Kg","value":"0,035"},"quantityGold":{"unitOfMeasure":"Kg","value":"0,0001"},"quantityPalladium":{"unitOfMeasure":"Kg","value":"0,0099"},"quantityInox":{"unitOfMeasure":"Kg","value":"2,875"},"quantityAluminium":{"unitOfMeasure":"Kg","value":"1,053"},"quantityGlass":{"unitOfMeasure":"Kg","value":"0"},"quantityGas":{"unitOfMeasure":"Kg","value":"0"},"quantityOil":{"unitOfMeasure":"Kg","value":"0"},"quantityConcreteDisposed":{"unitOfMeasure":"Kg","value":"6,935"},"quantityWasteDisposed":{"unitOfMeasure":"Kg","value":"2,355"}}}';
      this.json['quality'] = '{"quality": {"productGroup":"DishWasher","productType":"Whirlpool WFO 3T123 PF","serialNumber":"SN1547896314567-0","description":"lavastoviglie Whirlpool: color inox. Classe energetica A++, per consumi ridotti di energia elettrica. Un utile timer digitale che segnala la fine del ciclo di lavaggio. Tecnologia innovativa che garantisce un funzionamento super silezioso, per un elettrodomestico senza rumori. Eccellente capacità di pulizia per risultati di lavaggio ideali.","processDuration":{"unitOfMeasure":"Hours","value":"0,3"}, "issues":0, "user": "Francesco", "note":"nessun difetto riscontrato"}}';
      this.json['product'] = '{"product" : { "bom": {"productGroup":"DishWasher","productType":"Whirlpool WFO 3T123 PF","serialNumber":"SN1547896314567-0","photo":"https://www.whirlpool.it/digitalassets/Picture/web1000x1000/859991021030_1000x1000_perspective.jpg","description":"lavastoviglie Whirlpool: color inox. Classe energetica A++, per consumi ridotti di energia elettrica. Un utile timer digitale che segnala la fine del ciclo di lavaggio. Tecnologia innovativa che garantisce un funzionamento super silezioso, per un elettrodomestico senza rumori. Eccellente capacità di pulizia per risultati di lavaggio ideali.","processDuration":{"unitOfMeasure":"Hours","value":"0,3"},"processCosts":{"unitOfMeasure":"€","value":"15"},"transportCost":{"unitOfMeasure":"€","value":"10"},"energyConsumption":{"unitOfMeasure":"kWh/kg","value":"0,08"},"disposalCost":{"unitOfMeasure":"€/kg","value":"3"},"quantityIron":{"unitOfMeasure":"Kg","value":"21,991"},"quantityPlastic":{"unitOfMeasure":"Kg","value":"14,186"},"quantityCopper":{"unitOfMeasure":"Kg","value":"1,098"},"quantitySilver":{"unitOfMeasure":"Kg","value":"0,035"},"quantityGold":{"unitOfMeasure":"Kg","value":"0,0001"},"quantityPalladium":{"unitOfMeasure":"Kg","value":"0,0099"},"quantityInox":{"unitOfMeasure":"Kg","value":"2,875"},"quantityAluminium":{"unitOfMeasure":"Kg","value":"1,053"},"quantityGlass":{"unitOfMeasure":"Kg","value":"0"},"quantityGas":{"unitOfMeasure":"Kg","value":"0"},"quantityOil":{"unitOfMeasure":"Kg","value":"0"},"quantityConcreteDisposed":{"unitOfMeasure":"Kg","value":"6,935"},"quantityWasteDisposed":{"unitOfMeasure":"Kg","value":"2,355"}}, "quality": {"productGroup":"DishWasher","productType":"Whirlpool WFO 3T123 PF","serialNumber":"SN1547896314567-0","description":"lavastoviglie Whirlpool: color inox. Classe energetica A++, per consumi ridotti di energia elettrica. Un utile timer digitale che segnala la fine del ciclo di lavaggio. Tecnologia innovativa che garantisce un funzionamento super silezioso, per un elettrodomestico senza rumori. Eccellente capacità di pulizia per risultati di lavaggio ideali.","processDuration":{"unitOfMeasure":"Hours","value":"0,3"}, "issues":0, "user": "Francesco", "note":"nessun difetto riscontrato"},  "production": {"productGroup":"DishWasher","productType":"Whirlpool WFO 3T123 PF","serialNumber":"SN1547896314567-0","description":"lavastoviglie Whirlpool: color inox. Classe energetica A++, per consumi ridotti di energia elettrica. Un utile timer digitale che segnala la fine del ciclo di lavaggio. Tecnologia innovativa che garantisce un funzionamento super silezioso, per un elettrodomestico senza rumori. Eccellente capacità di pulizia per risultati di lavaggio ideali.","processDuration":{"unitOfMeasure":"Hours","value":"0,3"}}  }}';
      this.json['production'] = '{"production": {"productGroup":"DishWasher","productType":"Whirlpool WFO 3T123 PF","serialNumber":"SN1547896314567-0","description":"lavastoviglie Whirlpool: color inox. Classe energetica A++, per consumi ridotti di energia elettrica. Un utile timer digitale che segnala la fine del ciclo di lavaggio. Tecnologia innovativa che garantisce un funzionamento super silezioso, per un elettrodomestico senza rumori. Eccellente capacità di pulizia per risultati di lavaggio ideali.","processDuration":{"unitOfMeasure":"Hours","value":"0,3"}}}';

  }

  ionViewDidLoad() {

  }

  ionViewDidLoadNo() {
    if (typeof this.auth.getUserInfo() != 'undefined') {
      this.nimble.getChannelAll()
        .then((res) =>{
          this.showData = true;
          this.dataChannel = res;
          console.log(res);

          Object.keys(this.dataChannel).forEach((val,key) => {
            this.nimble.getBusinessProcessFromId(this.dataChannel[key].businessProcessID)
              .then((res) => {
                if (res == '') {
                  this.dataChannel[key].DataChannelShow = false;
                  this.dataChannel[key].DataChannelType = "No data chanel";
                }
                else {
                  if (res.startDateTime == null) {
                    this.dataChannel[key].DataChannelShow = false;
                    this.dataChannel[key].DataChannelType = "Negotiating";
                  }
                  else if (res.startDateTime != null && res.endDateTime == null) {
                    this.dataChannel[key].DataChannelShow = true;
                    this.dataChannel[key].DataChannelType = "Started";
                  }
                  else if (res.endDateTime != null) {
                    this.dataChannel[key].DataChannelShow = false;
                    this.dataChannel[key].DataChannelType = "Closed";
                  }

                  if (this.dataChannel[key].usePrivateServers) {
                    this.dataChannel[key].DataChannelType += " private";
                  }
                  else {
                    this.dataChannel[key].DataChannelType += " internal";
                  }
                }




              });

            //else if ()
            /*
            FATTO dati riciclatore 21353 eb7e1aa6-04e3-42dd-9a09-8c3d83309850 -> void -> NON HA IL DATACHANNEL, non faccio nulla
FATTO dati riciclatore 2 33937  4c4c91ed-6ecd-49d4-a982-d425c338916f -> "not started"(negotiationStepcounter==0) -> non faccio nulla
???? dati fst negoziazione 2 33849 c3c3806d-76e9-47ac-adae-fa64ded22456 ->  "closed" -> non faccio nulla
???? dati ciclo di vita completo 1 33893 5d7cc493-3162-46d5-b440-679c83757b59 -> "open" -> non faccio nulla

dati fst negoziazione 33915 7e73269f-dfa9-4861-a90b-82f12ec5945c -> "private" e "started" -> datachannelView
dati ciclo di vita completo 2 33871 7d3b9561-2e19-4289-b433-99f13188f042 -> "internal" e "started"  -> datachannelView

             */
          });
        })
    }
  }

  /*
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
  }*/

  visualizzaDC(id) {
    this.navCtrl.push(ShowDataChannelPage, { data : this.dataChannel[id].businessProcessID});
  }
}
