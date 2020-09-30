import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";
import { Ng2GoogleChartsModule, GoogleChartsSettings } from "ng2-google-charts";

import { StatisticsPageRoutingModule } from "./statistics-routing.module";

import { StatisticsPage } from "./statistics.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatisticsPageRoutingModule,
    Ng2GoogleChartsModule,
  ],
  declarations: [StatisticsPage],
})
export class StatisticsPageModule {}
