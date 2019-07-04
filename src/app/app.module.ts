import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, ActionSheetController } from 'ionic-angular';
import { ProductAvatar } from './app.component';
import { ZBar } from '@ionic-native/zbar';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { MainPage } from '../pages/main/main';
import { SettingsPage } from '../pages/settings/settings';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MorePage } from "../pages/more/more";
import { CodeScannerPage } from "../pages/code-scanner/code-scanner";
import { HttpModule, JsonpModule } from '@angular/http';
import { HomeService } from "../pages/home/home.service";
import { ProductionService } from "../pages/production/production.service";
import { TestService } from "../pages/test/test.service";
import { InterventionsService } from "../pages/interventions/interventions.service";
import { IssuesService } from "../pages/issues/issues.service";
import { SalesService } from "../pages/sales/sales.service";
import { AppService } from "./app.service";
import { LoginPage } from "../pages/login/login";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { AuthService } from "./auth.service";
import { ApiService } from "./api.service";
import { SettingsService } from "../pages/settings/settings.service";
import { ProductInfoService } from "../pages/product-info/product-info.service";
import { BomPage } from '../pages/advanced/bom/bom';
import { QualityPage } from '../pages/advanced/quality/quality';
import { ProductionPage } from "../pages/advanced/production/production";
import { ProductPage} from "../pages/advanced/product/product";
import { ProductmanagerPage } from "../pages/advanced/productmanager/productmanager";
import { File } from '@ionic-native/file';

import { Configuration } from './app.configuration';
import {NimbleService} from "./nimble.service";

const login_endpoint = 'http://nimblewg.holonix.biz/identity/login';
const nimble_endpoint = [
  {'id' : 0,
    'url': 'http://161.156.70.122/',
    'name' :  'IBM MVP Whitegoods',
    'imgUrl': '',
  },
  {'id' : 1,
    'url': 'http://nimblewg.holonix.biz/',
    'name' :  'Holonix WhiteGoods',
    'imgUrl': '',
  },
  {'id' : 2,
    'url': 'https://nimble-platform.salzburgresearch.at/nimble/',
    'name' :  'SRFG MVP',
    'imgUrl': '',
  },
  {'id' : 3,
    'url': 'https://fmp-nimble.salzburgresearch.at/api/',
    'name' :  'FMP',
    'imgUrl': '',
  },
  { 'id' : 4,
    'url': 'http://nimble-dev.ikap.biba.uni-bremen.de/',
    'name' : 'ECO HOUSE',
    'imgUrl': '',
  }
];

const dcfs_endpoit = 'http://localhost:8080/dcfs';
const ID_PRODUCER = 1;

@NgModule({
  declarations: [
    CodeScannerPage,
    ProductAvatar,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    MorePage,
    MainPage,
    LoginPage,
    SettingsPage,
    BomPage,
    QualityPage,
    ProductionPage,
    ProductPage,
    ProductmanagerPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    IonicModule.forRoot(ProductAvatar),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ProductAvatar,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    MorePage,
    MainPage,
    CodeScannerPage,
    LoginPage,
    SettingsPage,
    BomPage,
    QualityPage,
    ProductionPage,
    ProductPage,
    ProductmanagerPage
  ],
  providers: [
    AuthService,
    NimbleService,
    StatusBar,
    SplashScreen,
    ZBar,
    ActionSheetController,
    HomeService,
    ProductionService,
    SalesService,
    IssuesService,
    TestService,
    InterventionsService,
    ProductInfoService,
    AppService,
    ApiService,
    BarcodeScanner,
    SettingsService,
    Configuration,
    File,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: 'LOGIN_ENDPOINT', useValue: login_endpoint },
    { provide: 'DCFS_API_ENDPOINT', useValue: dcfs_endpoit },
    { provide: 'ID_PRODUCER', useValue: ID_PRODUCER },
    { provide: 'NIMBLE_ENDPOINT', useValue: nimble_endpoint }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
