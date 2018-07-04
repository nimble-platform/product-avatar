import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SensorsValuesPage } from './sensors-values';

@NgModule({
  declarations: [
    SensorsValuesPage,
  ],
  imports: [
    IonicPageModule.forChild(SensorsValuesPage),
  ],
  exports: [
    SensorsValuesPage
  ]
})
export class SensorsValuesPageModule {}
