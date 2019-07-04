import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { File } from "@ionic-native/file";
import  { NavParams} from "ionic-angular";

@Component({
  selector: 'page-productmanager',
  templateUrl: 'productmanager.html'
})
export class ProductmanagerPage {
  json : any;
  tree : string = '';
  directory : any;


  constructor(public navCtrl: NavController, private file: File,public navParams: NavParams) {


    //this.json = JSON.parse('{"quality": {"productGroup":"DishWasher","productType":"Whirlpool WFO 3T123 PF","serialNumber":"SN1547896314567-0","description":"lavastoviglie Whirlpool: color inox. Classe energetica A++, per consumi ridotti di energia elettrica. Un utile timer digitale che segnala la fine del ciclo di lavaggio. Tecnologia innovativa che garantisce un funzionamento super silezioso, per un elettrodomestico senza rumori. Eccellente capacità di pulizia per risultati di lavaggio ideali.","processDuration":{"unitOfMeasure":"Hours","value":"0,3"}, "issues":0, "user": "Francesco", "note":"nessun difetto riscontrato"}}');
    //this.json = this.json.bom;
    this.json = JSON.parse(navParams.get('json'));

    this.traverse(this.json,"&nbsp;&nbsp;",1);
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
    return this.file.checkFile(this.file.applicationDirectory+"icon/",fileName)
      .then((files) => {
        true;
      })
      .catch((err) => {
        console.log("file err");
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

}
