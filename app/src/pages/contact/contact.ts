import { Component } from '@angular/core';


import { Led } from '../../providers/led';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
    public ledState: boolean;
    public state;
    public x:boolean;
  constructor(public ledService: Led) {
     
  }
    public switch(){
            let leds={status:this.ledState};        
          this.ledService.updateStates(leds);
 
    }
    ionViewDidLoad(){
         this.ledService.getStates().then(function(data){
            
        });
        this.switch();


    }

}
