import { NgModule } from '@angular/core';
import {IonicModule, IonicPageModule} from 'ionic-angular';
import { LoginPage } from './login';
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
    IonicModule,
    CommonModule
  ],
  exports: [
    LoginPage
  ]
})
export class LoginPageModule {}
