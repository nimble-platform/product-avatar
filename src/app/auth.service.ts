import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
export class User {
  id: number;
  name: string;
  email: string;
  company: any
  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}

@Injectable(
  
)
export class AuthService {
  public currentUser: User;

  constructor(public http: Http, @Inject('LOGIN_ENDPOINT') public loginEndPoint: string) {

  }

  public login(credentials) {
    var resource = this.loginEndPoint + "/consumer/loginConsumer/" + credentials.username + "/" + credentials.password;

    return this.http.get(resource)
      .map(res => {
        this.currentUser = res.json();
        return this.currentUser;
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

  public getUserInfo(): User {
    return this.currentUser;
  }

  public logout() {
    // return this.http.delete(this.loginEndPoint + "/logout").map(res => res.json()).toPromise();
    this.currentUser = null;
  }
}
