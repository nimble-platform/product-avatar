import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContractslistPage } from './contractslist';

@NgModule({
  declarations: [
    ContractslistPage,
  ],
  imports: [
    IonicPageModule.forChild(ContractslistPage),
  ],
})
export class ContractslistPageModule {}
