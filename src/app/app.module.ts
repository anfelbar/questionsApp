import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import { IonicStorageModule } from "@ionic/storage";
//import { HttpModule } from '@angular/http';
import { HttpClientModule } from "@angular/common/http";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { GooglePlus } from "@ionic-native/google-plus/ngx";
import { environment } from "./../environments/environment";
import { QuizService } from "./providers/quiz/quiz.service";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
//import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { Ng2GoogleChartsModule, GoogleChartsSettings } from "ng2-google-charts";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    // HttpModule,
    HttpClientModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    Ng2GoogleChartsModule,
    //FirebaseAuthentication,
  ],
  providers: [
    AngularFirestoreModule,
    StatusBar,
    SplashScreen,
    GooglePlus,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    QuizService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
