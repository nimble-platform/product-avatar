import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FilteredDataRowDetailPage } from './filtered-data-row-detail';

@NgModule({
  declarations: [
    FilteredDataRowDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(FilteredDataRowDetailPage),
  ],
})
export class FilteredDataRowDetailPageModule {}
