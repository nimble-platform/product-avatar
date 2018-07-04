import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ApiService {

    constructor(public http: Http, @Inject('DCFS_API_ENDPOINT') public apiEndPoint: string) {

    }

    // path contains also query strings
    public genericGET(path): any {
        return this.http
            .get(this.apiEndPoint + path, {
                withCredentials: true
            })
            .map(res => {
                return res.json();
            })
            .toPromise();
    }
}