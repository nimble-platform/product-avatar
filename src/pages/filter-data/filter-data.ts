import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FilteredDataRowDetailPage} from "../filtered-data-row-detail/filtered-data-row-detail";
import {SendDataRequestPage} from "../send-data-request/send-data-request";
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import {NimbleService} from "../../app/nimble.service";

/**
 * Generated class for the FilterDataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

/*advancedFiltering: "hasfeedback;hasrequest"
dataKey: "serialnumber"
description: "dati produzione"
hasFilteringData: false
id: 10
interval: 1
machine: {id: 9, name: "PROD-IT", description: "Produzione italia", ownerID: "363"}
metadata: "serialnumber varchar, iotDataProduction varchar"
name: "produzione italia"*/

@IonicPage()
@Component({
  selector: 'page-filter-data',
  templateUrl: 'filter-data.html',
})
export class FilterDataPage {
  sensor: any;
  campi: any;
  valore: any;
  nrRows: any;
  filterRows: any;
  loading = false;
  filterButton = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private barcodeScanner: BarcodeScanner,
              private nimble: NimbleService) {
    this.sensor = this.navParams.get('sensor');
    const metadata = this.sensor.metadata.split(',');
    let index = 1; //Lo 0 per il campo principale definito in DataKey
    this.campi = [];
    this.valore = [];
    this.filterRows = [];
    this.nrRows = 10;

    metadata.forEach((_item,key) => {
      console.log("_item",_item);
      const meta = _item.trim().split(' ');
      let barcode = false;
      let indexArr;
       if (meta[0] == this.sensor.dataKey) {
         barcode = true;
         indexArr = 0;
       }
       else {
         //Questo perchè è possibiche il dataKey principale non sia definito come prima parte della stringa this.sensor.metadata
         indexArr = index;
         index++;
       }
       if (!meta[0].includes('iot') && !meta[0].includes('json')) this.campi[indexArr] = { name: meta[0], type : meta[1] , barcode : barcode, value: '' }
    });
    console.log("campi");
    console.log(this.campi);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterDataPage');
  }

  goBack() {
    this.navCtrl.pop();
  }

  showRows() {
    this.filterRows = [];
    this.loading = true;
    this.filterButton = true;
    this.nimble.getNextData('', '388383-2923982-292929-9223', '25' )
      .then((data) => {
        console.log("getNextData data");
        console.log(data);
        this.filterRows = [];
        this.loading = false;
        data.messages.forEach((item, key) =>  {
          this.filterRows.push(item);
          this.filterRows.push({"full": item, "show": item.substr(0,200)});
        });
      });

    /*for(let i = 0; i< this.nrRows; i++) {
      //Questa verrà sostituita dalla chiamata vera
      const tmpRow = '{ "bom": {"productGroup":"DishWasher","productType":"Whirlpool WFO 3T123 PF","serialNumber":"SN1547896314567-0","photo":"https://www.whirlpool.it/digitalassets/Picture/web1000x1000/859991021030_1000x1000_perspective.jpg","description":"lavastoviglie Whirlpool: color inox. Classe energetica A++, per consumi ridotti di energia elettrica. Un utile timer digitale che segnala la fine del ciclo di lavaggio. Tecnologia innovativa che garantisce un funzionamento super silezioso, per un elettrodomestico senza rumori. Eccellente capacità di pulizia per risultati di lavaggio ideali.","processDuration":{"unitOfMeasure":"Hours","value":"0,3"},"processCosts":{"unitOfMeasure":"€","value":"15"},"transportCost":{"unitOfMeasure":"€","value":"10"},"energyConsumption":{"unitOfMeasure":"kWh/kg","value":"0,08"},"disposalCost":{"unitOfMeasure":"€/kg","value":"3"},"quantityIron":{"unitOfMeasure":"Kg","value":"21,991"},"quantityPlastic":{"unitOfMeasure":"Kg","value":"14,186"},"quantityCopper":{"unitOfMeasure":"Kg","value":"1,098"},"quantitySilver":{"unitOfMeasure":"Kg","value":"0,035"},"quantityGold":{"unitOfMeasure":"Kg","value":"0,0001"},"quantityPalladium":{"unitOfMeasure":"Kg","value":"0,0099"},"quantityInox":{"unitOfMeasure":"Kg","value":"2,875"},"quantityAluminium":{"unitOfMeasure":"Kg","value":"1,053"},"quantityGlass":{"unitOfMeasure":"Kg","value":"0"},"quantityGas":{"unitOfMeasure":"Kg","value":"0"},"quantityOil":{"unitOfMeasure":"Kg","value":"0"},"quantityConcreteDisposed":{"unitOfMeasure":"Kg","value":"6,935"},"quantityWasteDisposed":{"unitOfMeasure":"Kg","value":"2,355"}}}';
      this.filterRows.push({"full": tmpRow, "show": tmpRow.substr(0,200)});
    }
    */

  }

  filteredDataRowDetail(i) {
    console.log(this.campi);
    this.navCtrl.push(FilteredDataRowDetailPage,{message: JSON.parse(this.filterRows[i].full), sensor: this.sensor, dataKey : this.campi[0]})
  }

  SendDataRequest() {
    this.navCtrl.push(SendDataRequestPage,{sensor: this.sensor, dataKey : this.campi[0]})
  }

  nimbleScanner() {
    this.barcodeScanner.scan().then((barcodeData) => {
      // Success! Barcode data is here
      if (!barcodeData.cancelled) {
        this.campi[0].value = barcodeData.text;
      }
    }, (err) => {
      // An error occurred
      alert("Impossibile prendere il barcode");
      console.log(err);
    });
  }

  sendDataRequest() {
    this.nimble.sendIoTDataTest(1,1,'{"production": {"productGroup":"DishWasher","productType":"Whirlpool WFO 3T123 PF","serialNumber":"SN1547896314567-0","description":"lavastoviglie Whirlpool: color inox. Classe energetica A  , per consumi ridotti di energia elettrica. Un utile timer digitale che segnala la fine del ciclo di lavaggio. Tecnologia innovativa che garantisce un funzionamento super silezioso, per un elettrodomestico senza rumori. Eccellente capacità di pulizia per risultati di lavaggio ideali.","processDuration":{"unitOfMeasure":"Hours","value":"0,3"}}}')
      .then(data => {
        alert("Data request inviata con successo");
      })
      .catch(err => {
        alert("Data request inviata con successo");
      });
  }
}
