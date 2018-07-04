/**
 * Created by Rabah-pc on 08/06/2017.
 */
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { AppService } from "../../app/app.service";
import { ApiService } from "../../app/api.service";

@Injectable()
export class IssuesService {

  producerId: any;

  constructor(public ApiService: ApiService, public AppService: AppService) {
    this.producerId = AppService.getProducerId();
  }

  // to retrieve available Fields of the stream
  getStreamAvailableFields(currentUser, currentChannel): any {
    return new Promise((resolve, reject) => {
      this.ApiService.genericGET("/consumer/dataChannelMetadata/" + currentUser.login + "/" + currentUser.password + "/" + this.producerId+ "/" + currentChannel).then(
        function (resp) {
          resolve(resp);
        },
        function (err) {
          reject(err);
        }
      );
    });
  }

  getIssueSteps(serialNumber, currentUser, currentChannel): any {
    return new Promise((resolve, reject) => {
      this.ApiService.genericGET("/consumer/filterChannel/" + currentUser.login + "/" + currentUser.password + "/" + this.producerId + "/" + currentChannel + "/serialnumber='" + serialNumber + "'").then(
        function (resp) {
          let rows = [];
          resp.forEach(element => {
            let js = JSON.parse(element);
            let row = js["row"]["columns"];
            rows.push(row.splice(2,row.length));
          });
          resolve(rows);
        },
        function (err) {
          reject(err);
        }
      );
    })
  };
}
