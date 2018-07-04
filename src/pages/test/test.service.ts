
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { ApiService } from "../../app/api.service";
import { AppService } from "../../app/app.service";

@Injectable()
export class TestService {

  producerId: any;

  constructor(public apiService: ApiService, public AppService: AppService) {
    this.producerId = AppService.getProducerId();
  }

  getStreamAvailableFields(user, currentChannel): any {
    return new Promise((resolve, reject) => {
      this.apiService.genericGET("/consumer/dataChannelMetadata/" + user.login + "/" + user.password + "/" + this.producerId + "/" + currentChannel).then(
        function (resp) {
          resolve(resp);
        },
        function (err) {
          reject(err);
        }
      );
    });
  }

  getTestSteps(serialNumber, currentUser, currentChannel): any {
    return new Promise((resolve, reject) => {
      this.apiService.genericGET("/consumer/filterChannel/" + currentUser.login + "/" + currentUser.password + "/" + this.producerId + "/" + currentChannel + "/serialnumber='" + serialNumber + "'").then(
        function (resp) {
          
          let rows = [];
          resp.forEach(element => {
            let js = JSON.parse(element);
            let row = js["row"]["columns"];
            rows.push(row.splice(2, row.length));
          });
          resolve(rows);
        },
        function (err) {
          reject(err);
        }
      );
    })
  }
}
