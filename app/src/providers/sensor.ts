import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Sensor {

  data:any;

  constructor(public http: Http) {
    this.data=null;
  }
  getSensor(){
 
    if (this.data) {
      return Promise.resolve(this.data);
    }
 
    return new Promise(resolve => {
 
      //this.http.get('http://5006d30d.nat123.cc:37405/sensor')
      this.http.get('http://localhost:3000/sensor')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
 
  }
}
