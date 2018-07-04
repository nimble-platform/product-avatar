/**
 * Created by Rabah-pc on 08/06/2017.
 */
import { Injectable, Inject } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { ApiService } from "../../app/api.service";
import { AuthService } from "../../app/auth.service";

@Injectable()
export class HomeService {

  constructor(
    public ApiService: ApiService,
    @Inject('ID_PRODUCER') public IDProducer: number,
    public AuthService: AuthService) {
  }

  async _getTimelineEvents(currentUser) {
    let availableChannelList = await this.ApiService.genericGET("/consumer/listAvaiableDataChannel/" + currentUser.login + "/" + currentUser.password + "/1");
    let channels = {
      "IT_WHIRPOOL_STREAMS_DC_PRODUCTIONDATA": "production",
      "IT_WHIRPOOL_STREAMS_DC_QUALITYDATA": "test",
      "IT_WHIRPOOL_STREAMS_DC_CUSTOMERDATA": "sales",
      "IT_WHIRPOOL_STREAMS_DC_INTERVENTDATA":"interventions",
      "IT_WHIRPOOL_STREAMS_DC_ISSUEDATA": "issues"
    };
    let productDataString = "IT_WHIRPOOL_STREAMS_DC_PRODUCTDATA";
    let acs = [];
    availableChannelList.forEach(ch => {
      if (ch !== productDataString) {
        acs.push({
          "date": new Date().toISOString(),
          "phase": channels[ch],
          "channel": ch
        })
      }
    });
    return acs;
  }

  async getProductInformation(sn, currentUser, IDProducer) {
    let resource = "/consumer/filterChannel/" + currentUser.login + "/" + currentUser.password + "/" + IDProducer + "IT_WHIRPOOL_STREAMS_DC_PRODUCTDATA/serialnumber/" + sn;
    console.log(resource);
    let tmp = await this.ApiService.genericGET(resource);
    return tmp;
  }
}
