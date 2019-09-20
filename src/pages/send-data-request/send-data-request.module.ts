import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendDataRequestPage } from './send-data-request';

@NgModule({
  declarations: [
    SendDataRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(SendDataRequestPage),
  ],
})
export class SendDataRequestPageModule {}
