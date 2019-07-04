import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-product',
  templateUrl: 'product.html'
})
export class ProductPage {
  json : any;

  constructor(public navCtrl: NavController) {
    this.json = JSON.parse('{"quality": {"productGroup":"DishWasher","productType":"Whirlpool WFO 3T123 PF","serialNumber":"SN1547896314567-0","description":"lavastoviglie Whirlpool: color inox. Classe energetica A++, per consumi ridotti di energia elettrica. Un utile timer digitale che segnala la fine del ciclo di lavaggio. Tecnologia innovativa che garantisce un funzionamento super silezioso, per un elettrodomestico senza rumori. Eccellente capacità di pulizia per risultati di lavaggio ideali.","processDuration":{"unitOfMeasure":"Hours","value":"0,3"}, "issues":0, "user": "Francesco", "note":"nessun difetto riscontrato"}}');
    this.json = this.json.quality;
    console.log(this.json);
  }
}
