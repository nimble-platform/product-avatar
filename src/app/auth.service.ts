import { Injectable, Inject } from '@angular/core';
import {Http, Request, RequestOptions, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {HttpHeaders, HttpParams} from "@angular/common/http";
import { Storage } from '@ionic/storage';
/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
export class User {
  id: number;
  name: string;
  email: string;
  company: any;
  idServer: number;
  roles: any;
  companyInfo: any;
  accessToken: any;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}

@Injectable(

)
export class AuthService {
  public currentUser: any;

  constructor(public http: Http, @Inject('LOGIN_ENDPOINT') public loginEndPoint: string, @Inject('NIMBLE_ENDPOINT') public nimbleEndPoint: any,
              private storage: Storage) {
    this.storage.get('currentUser').then(data => {
      if (data === null) return;
      this.currentUser = data;
    })

  }

  public login(credentials,nimbleServer,language) {
    //var resource = this.loginEndPoint + "/consumer/loginConsumer/" + credentials.username + "/" + credentials.password;

    return this.http.post(this.nimbleEndPoint[nimbleServer].url+"identity/login",{"username":credentials.username,"password":credentials.password})
      .map(res => {
        console.log("dentro map di login");
        console.log(res);
        this.currentUser = res.json();
        this.currentUser.idServer = nimbleServer;

        var p = [];
        p.push(this.getCompanyInfo());
        p.push(this.getCompanySettings());
        return Promise.all(p).then(values => {
          this.currentUser.companyInfo = values[0];
          this.currentUser.companySettings = values[1];
          this.storage.set('currentUser',this.currentUser);
          this.currentUser.language = language;
          return this.currentUser;
        });
      })
      .toPromise();
  }

  public getSelf() {
    return this.http
      .get(this.loginEndPoint + "/self", {
        withCredentials: true
      })
      .map(res => {
        this.currentUser = res.json();
        return this.currentUser;
      })
      .toPromise();
  }

  public getUserRoles() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', this.currentUser.accessToken);

    let options = new RequestOptions({headers: headers });

    //Prendo i ruoli
    //
    //return this.http.get(this.nimbleEndPoint[this.currentUser.idServer].url,options)
    return this.http.get(this.nimbleEndPoint[this.currentUser.idServer].url+"identity/roles/user?username="+encodeURIComponent(this.currentUser.email),options)
      .map(res => {
        return res.json();
      })
      .toPromise();
  }

   getUserInfo(): User {
    console.log("auth getUserInfo");
    console.log(this.currentUser);
    return this.currentUser;
  }

  public setUserInfo(data) {
    this.currentUser = data;
  }

  public logout() {
    // return this.http.delete(this.loginEndPoint + "/logout").map(res => res.json()).toPromise();
    this.currentUser = null;
  }

  public getCompanyInfo() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', this.currentUser.accessToken);
    let options = new RequestOptions({headers: headers });

    return this.http.get(this.nimbleEndPoint[this.currentUser.idServer].url+"identity/party_by_person/"+this.currentUser.userID+"?includeRoles=false")
      .map(res => {
        return res.json();
      })
      .toPromise();
  }

  public getCompanySettings() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', this.currentUser.accessToken);
    let options = new RequestOptions({headers: headers });

    return this.http.get(this.nimbleEndPoint[this.currentUser.idServer].url+"identity/company-settings/"+this.currentUser.companyID)
      .map(res => {
        return res.json();
      })
      .toPromise();
  }

}
