/**
 * Created by Rabah-pc on 08/06/2017.
 */
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Constants } from "./Constants";

@Injectable()
export class AppService {
  private sn: string;
  bolitems: Map<string, Constants>;
  producerId: any;
  availableChannelList: any;
  constructor() {
    // TODO how to change this part??
    this.bolitems = new Map<string, Constants>();
    this.bolitems.set('production', { title: 'production', icon: 'construct', page: 'ProductionPage' });
    this.bolitems.set('test', { title: 'test', icon: 'flask', page: 'TestPage' });
    this.bolitems.set('sales', { title: 'sales', icon: 'logo-usd', page: 'SalesPage' });
    this.bolitems.set('storing', { title: 'storing', icon: 'cube', page: 'StoringPage' });
    this.bolitems.set('feedback', { title: 'feedback', icon: 'text', page: 'FeedbackPage' });
    this.bolitems.set('issues', { title: 'issues', icon: 'headset', page: 'IssuesPage' });
    this.bolitems.set('interventions', { title: 'interventions', icon: 'build', page: 'InterventionsPage' });
    this.bolitems.set('sensorsValues', { title: 'sensorsValues', icon: 'ionitron', page: 'SensorsValuesPage' });
    this.bolitems.set('productInfos', { title: 'productInfos', icon: 'ionitron', page: 'ProductInfoPage' });

    // for now this is pre-setted global variable 
    // once understand how to handle the data source, meaning producerId
    // the conseguent update will, need, be made
    this.producerId = 1;

  }

  getAvailableChannelList() {
    return this.availableChannelList;
  }

  setAvailableChannelList(channelList) {
    this.availableChannelList = channelList;
  }
  
  getPage(key: string): string {
    return this.bolitems.get(key).page;
  }

  getIcon(key: string): string {
    return this.bolitems.get(key).icon;
  }

  setSn(key: string) {
    return this.sn = key;
  }

  getSn(): string {
    return this.sn;
  }

  constructViewObject(fields, values){
    let events = [];

    values.forEach(element => {
      let event = [];
      let count = 0;
      fields.forEach(field => {
        let obj = {};
        obj["label"] = field["field"];
        obj["value"] = element[count];
        event.push(obj);
        count++;
      });
      events.push(event);
    });

    return events;
  }

  getProducerId() {
    return this.producerId;
  }

  setProducerId(producerId){
    this.producerId = producerId;
  }
}
