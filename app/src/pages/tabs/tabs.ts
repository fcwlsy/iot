import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root: any = HomePage;
  tab2Root: any = ContactPage;
  tab3Root: any = AboutPage;

  constructor() {

  }
}
