import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
//import { ProductionPage } from '../production/production';

@IonicPage()
@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage {
  selectedItem: any;
  bolitems: Array<{ title: string, icon: string, page: string }>;
  molitems: Array<{ title: string, icon: string, page: string }>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public appCtrl: App) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies

    this.bolitems = [{ title: 'Production', icon: 'construct', page: 'ProductionPage' }, { title: 'Test', icon: 'flask', page: 'TestPage' }, { title: 'Storing', icon: 'cube', page: 'StoringPage' }];
    this.molitems = [{ title: 'Sales', icon: 'logo-usd', page: 'SalesPage' }, { title: 'Feedback', icon: 'text', page: 'FeedbackPage' }, { title: 'Issues', icon: 'headset', page: 'IssuesPage' }, { title: 'Interventions', icon: 'build', page: 'InterventionsPage' }, { title: 'Sensors values', icon: 'ionitron', page: 'SensorsValuesPage' }];
  }
  itemTapped(event, item) {
    this.appCtrl.getRootNav().push(item.page, {
      item: item
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MorePage');
  }
}
