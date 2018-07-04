import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CodeScannerPage } from './code-scanner';
import { HomePage } from './home';
@NgModule({
  declarations: [
    CodeScannerPage,
  ],
  imports: [
    IonicPageModule.forChild(CodeScannerPage),
  ],
  exports: [
    CodeScannerPage
  ]

})
export class CodeScannerPageModule { }
