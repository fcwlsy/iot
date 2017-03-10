import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Led {
    data: any;
  constructor(public http: Http) {this.data=null;}
    getStates(){
        if (this.data){
            return Promise.resolve(this.data);
        }
        return new Promise(resolve=>{
            this.http.get('http://1506eaee.nat123.cc:38044/led/state')
                    .map(res=>res.json())
                    .subscribe(data=>{
                        this.data=data;
                        resolve(this.data);
                    });
        });
    }
    updateStates(leds) {
        let headers=new Headers();
        headers.append('Content-Type','application/json');
        this.http.put('http://localhost:3000/led',JSON.stringify(leds),{headers:headers}).subscribe((res)=>{console.log(res.json())});
//this.http.put('http://1506eaee.nat123.cc:38044/led/state',JSON.stringify(leds),{headers:headers}).subscribe((res)=>{console.log(res.json())});
    }

}
