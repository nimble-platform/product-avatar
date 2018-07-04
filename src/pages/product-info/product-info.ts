import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductInfoService } from "./product-info.service";
import { AppService } from "../../app/app.service";
import { AuthService } from "../../app/auth.service";

@IonicPage()
@Component({
    selector: 'page-product-info',
    templateUrl: 'product-info.html',
})
export class ProductInfoPage {

    productInfos: any;
    serialNumber: any;
    currentUser: any;

    constructor(    public navCtrl: NavController,
                    public navParams: NavParams,
                    private productInfoService: ProductInfoService,
                    public appService: AppService,
                    private AuthService: AuthService,
                    public ProductInfoService: ProductInfoService) {
        this.serialNumber = appService.getSn();
        this.currentUser = AuthService.getUserInfo();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ProductInfoPage');
    }
    ngOnInit() { this.getTimelineEvents(); }

    async getTimelineEvents() {
        try {
            let metadata = await this.productInfoService.getStreamAvailableFields(this.currentUser);
            let values = await this.productInfoService.getProductInfo(this.serialNumber, this.currentUser);
            this.productInfos = this.constructViewObject(metadata, values);
        } catch (err) {
            console.log(err);
        }
    }

    constructViewObject(fields, values){
        let events = [];
        let count = 0;
        fields.forEach(field => {
            let event = {};
            event["label"] = field["field"];
            event["value"] = values[count];
            events.push(event);
            count++;
        });
        return events;
      }
}
