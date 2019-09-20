import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DataRowDetailPage } from './data-row-detail';

@NgModule({
  declarations: [
    DataRowDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(DataRowDetailPage),
  ],
})
export class DataRowDetailPageModule {}
