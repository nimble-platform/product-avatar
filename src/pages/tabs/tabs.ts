import { Component } from '@angular/core';
import { MainPage } from '../main/main';
import { CodeScannerPage } from '../code-scanner/code-scanner';
import { SettingsPage } from '../settings/settings';
import { IonicPage } from 'ionic-angular';
import { ContractslistPage} from "../contractslist/contractslist";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = MainPage;
  tab2Root = ContractslistPage;
  tab3Root = SettingsPage;
  
  constructor() {

  }
}
