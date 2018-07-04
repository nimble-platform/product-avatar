import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StoringPage } from './storing';

@NgModule({
  declarations: [
    StoringPage,
  ],
  imports: [
    IonicPageModule.forChild(StoringPage),
  ],
  exports: [
    StoringPage
  ]
})
export class StoringPageModule {}
