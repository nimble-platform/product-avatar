import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InterventionsPage } from './interventions';

@NgModule({
  declarations: [
    InterventionsPage,
  ],
  imports: [
    IonicPageModule.forChild(InterventionsPage),
  ],
  exports: [
    InterventionsPage
  ]
})
export class InterventionsPageModule {}
