import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-bom',
  templateUrl: 'bom.html'
})
export class BomPage {
  json : any;

  constructor(public navCtrl: NavController) {
    this.json = JSON.parse('{"bom": {"productGroup":"DishWasher","productType":"Whirlpool WFO 3T123 PF","serialNumber":"SN1547896314567-0","photo":"https://www.whirlpool.it/digitalassets/Picture/web1000x1000/859991021030_1000x1000_perspective.jpg","description":"lavastoviglie Whirlpool: color inox. Classe energetica A++, per consumi ridotti di energia elettrica. Un utile timer digitale che segnala la fine del ciclo di lavaggio. Tecnologia innovativa che garantisce un funzionamento super silezioso, per un elettrodomestico senza rumori. Eccellente capacità di pulizia per risultati di lavaggio ideali.","processDuration":{"unitOfMeasure":"Hours","value":"0,3"},"processCosts":{"unitOfMeasure":"€","value":"15"},"transportCost":{"unitOfMeasure":"€","value":"10"},"energyConsumption":{"unitOfMeasure":"kWh/kg","value":"0,08"},"disposalCost":{"unitOfMeasure":"€/kg","value":"3"},"quantityIron":{"unitOfMeasure":"Kg","value":"21,991"},"quantityPlastic":{"unitOfMeasure":"Kg","value":"14,186"},"quantityCopper":{"unitOfMeasure":"Kg","value":"1,098"},"quantitySilver":{"unitOfMeasure":"Kg","value":"0,035"},"quantityGold":{"unitOfMeasure":"Kg","value":"0,0001"},"quantityPalladium":{"unitOfMeasure":"Kg","value":"0,0099"},"quantityInox":{"unitOfMeasure":"Kg","value":"2,875"},"quantityAluminium":{"unitOfMeasure":"Kg","value":"1,053"},"quantityGlass":{"unitOfMeasure":"Kg","value":"0"},"quantityGas":{"unitOfMeasure":"Kg","value":"0"},"quantityOil":{"unitOfMeasure":"Kg","value":"0"},"quantityConcreteDisposed":{"unitOfMeasure":"Kg","value":"6,935"},"quantityWasteDisposed":{"unitOfMeasure":"Kg","value":"2,355"}}}');
    this.json = this.json.bom;
    console.log(this.json);
  }
}
