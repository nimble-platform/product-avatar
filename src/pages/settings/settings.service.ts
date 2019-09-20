import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { AuthService } from "../../app/auth.service";

@Injectable()
export class SettingsService {

  constructor(private http: Http, public auth: AuthService) { }


}
