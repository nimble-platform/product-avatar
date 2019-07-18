import { Injectable, Inject } from '@angular/core';
import {Http, Request, RequestOptions, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {HttpHeaders, HttpParams} from "@angular/common/http";
import {AuthService, User} from "./auth.service";
/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

export class NimbleClass {
  statistic: any;
  version: any;
  dataChannel: any;
  internalService: any;
  filteringService: any;
  identityService: any;
  businessProcess: any;
  url: any;
}

@Injectable(
  
)

export class NimbleService {
  public currentUser: any;
  public currentNimble: any;
  public url : any;

  constructor(public http: Http, @Inject('NIMBLE_ENDPOINT') public nimbleEndPoint: any, public auth: AuthService) {
    this.currentNimble = new NimbleClass();

  }

  retriveAllData() {

    this.currentUser = this.auth.getUserInfo();

    this.currentNimble.url = this.nimbleEndPoint[this.currentUser.idServer].url;

    this.getStatistic().then(data => this.currentNimble.statistic = data);
    this.getVersion().then(data => this.currentNimble.version = data);

    this.getDataChannel().then((data) => { this.currentNimble.dataChannel = data; })

    this.getInternalService().then(data => this.currentNimble.internalService = data);
    this.getFilteringService().then((data) => {this.currentNimble.filteringService = data});

    this.getIdentityService().then((data) => { this.currentNimble.identityService = data});
    this.getBusinessProcess().then(data => this.currentNimble.businessProcess = data)
      .catch((err) => {
        this.currentNimble.businessProcess = {version : 'Errore nel prendere i dati'};
    });

    return this.currentNimble;
  };

  public getNimble() {
    return this.currentNimble;
  }

  public getOptions() {
    this.currentUser = this.auth.getUserInfo();

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', this.currentUser.accessToken);

    return new RequestOptions({headers: headers });
  }

   public getStatistic() {
    let options = this.getOptions();

    return this.http.get(this.nimbleEndPoint[this.currentUser.idServer].url+"identity/statistics/",options)
      .map(res => {
        return res.json();
      })
      .toPromise();
  }

  public getVersion() {
    let options = this.getOptions();

    return this.http.get(this.nimbleEndPoint[this.currentUser.idServer].url+"business-process/info",options)
      .map(res => {
        return res.json();
      })
      .toPromise()
      .then(response => response.json().data)
      .catch((err) => {});
  }

  public getDataChannel() {
    let options = this.getOptions();

    return this.http.get(this.nimbleEndPoint[this.currentUser.idServer].url+"data-channel/info",options)
      .map(res => {
        return res.json();
      })
      .toPromise();
  }

  public getInternalService() {
    let options = this.getOptions();

    return this.http.get(this.nimbleEndPoint[this.currentUser.idServer].url+"data-channel/channel/hasInternalService?",options)
      .map(res => {
        return res.json();
      })
      .toPromise();
  }

  public getFilteringService() {
    let options = this.getOptions();

    return this.http.get(this.nimbleEndPoint[this.currentUser.idServer].url+"data-channel/channel/hasFilteringService?",options)
      .map(res => {
        return res.json();
      })
      .toPromise();
  }



  public getIdentityService() {
    let options = this.getOptions();

    return this.http.get(this.nimbleEndPoint[this.currentUser.idServer].url+"identity/info",options)
      .map(res => {
        return res.json();
      })
      .toPromise()
      .catch((err) => {
        alert("errore nel identity service");
      });
  }

  public getBusinessProcess() {
    let options = this.getOptions();

    return this.http.get(this.nimbleEndPoint[this.currentUser.idServer].url+"business-process/info",options)
      .map(res => {
        return res.json();
      })
      .toPromise();
  }

  public getContractList1() {
    let options = this.getOptions();

    return this.http.get(this.nimbleEndPoint[this.currentUser.idServer].url+"business-process/collaboration-groups?partyId="+this.currentUser.companyID+"&collaborationRole=BUYER&offset=0&limit=5&archived=false",options)
      .map(res => {
        return res.json();
      })
      .toPromise();
  }

  public getContractList2() {
    let options = this.getOptions();

    return this.http.get(this.nimbleEndPoint[this.currentUser.idServer].url+"business-process/collaboration-groups?partyId="+this.currentUser.companyID+"&collaborationRole=BUYER&offset=0&limit=5&archived=true",options)
      .map(res => {
        return res.json();
      })
      .toPromise();
  }

  public getProcessInstance(id) {
    let options = this.getOptions();

    return this.http.get(this.nimbleEndPoint[this.currentUser.idServer].url+"business-process/processInstance/"+id+"/details",options)
      .map(res => {
        return res.json();
      })
      .toPromise();
  }

  public getDataChannelFromAssociatedGroups(id) {
    let options = this.getOptions();

    return this.http.get(this.nimbleEndPoint[this.currentUser.idServer].url+"data-channel/channel/business-process/"+id,options)
      .map(res => {
        return res.json();
      })
      .toPromise();
  }

  public getChannelAll() {
    let options = this.getOptions();

    return this.http.get(this.nimbleEndPoint[this.currentUser.idServer].url+"data-channel/channel/all",options)
      .map(res => {
        return res.json();
      })
      .toPromise();

  }

  public getBusinessProcessFromId(id) {
    let options = this.getOptions();

    return this.http.get(this.nimbleEndPoint[this.currentUser.idServer].url+"data-channel/channel/business-process/"+id,options)
      .map(res => {
        return res.json();
      })
      .toPromise();

  }

}
