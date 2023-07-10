import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { MaterialModule } from "../../shared/material/material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { ChartComponent } from "./components/chart/chart.component";
import { NgChartsModule } from "ng2-charts";

@NgModule({
  declarations: [DashboardComponent, ChartComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    NgChartsModule,
  ],
})
export class DashboardModule {}
