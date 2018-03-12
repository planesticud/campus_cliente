import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from './../../app-config';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

const path = Config.LOCAL.UBICACION_SERVICE;


@Injectable()
export class UbicacionService {

    constructor(private http: HttpClient) {
    }

    get(endpoint) : Promise<any> {
        return this.http.get(path + endpoint).toPromise()
        .then(response  => response as any)
        .catch(this.handleError);
    }
    post(endpoint, element) {
        return this.http.post(path + endpoint, element, httpOptions);
    }
    put(endpoint, element) {
        console.info(element);
        return this.http.put(path + endpoint + '/' + element.Id, element, httpOptions);
    }
    delete(endpoint, element) {
        return this.http.delete(path + endpoint + '/' + element.Id);
    }
    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
  }
}
