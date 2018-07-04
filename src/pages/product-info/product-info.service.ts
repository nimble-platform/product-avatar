import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { AppService } from "../../app/app.service";
import { ApiService } from "../../app/api.service";

@Injectable()
export class ProductInfoService {

    productInfoStream: string = "IT_WHIRPOOL_STREAMS_DC_PRODUCTDATA";

    constructor(private http: Http,
        private appService: AppService,
        public apiService: ApiService,
        @Inject('ID_PRODUCER') public IDProducer: number) {
    }

    getStreamAvailableFields(user): any {
        return new Promise((resolve, reject) => {
            this.apiService.genericGET("/consumer/dataChannelMetadata/" + user.login + "/" + user.password + "/1/" + this.productInfoStream).then(
                function (resp) {
                    resolve(resp);
                },
                function (err) {
                    reject(err);
                }
            );
        });
    }

    getProductInfo(serialNumber, currentUser): any {
        return new Promise((resolve, reject) => {
            this.apiService.genericGET("/consumer/filterChannel/" + currentUser.login + "/" + currentUser.password + "/1/" + this.productInfoStream + "/serialnumber='" + serialNumber + "'").then(
                function (resp) {
                    let rows = [];
                    resp.forEach(element => {
                        let j = JSON.parse(element);
                        rows.push(j);
                    });
                    if (rows.length >= 1)
                        resolve(rows[0].row.columns.slice(2, rows[0].row.columns.length));
                    else
                        reject("Error... ");
                },
                function (err) {
                    reject(err);
                }
            );
        })
    }

}
