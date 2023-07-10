import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { EntradasRoutingModule } from "./entradas-routing.module";
import { MaterialModule } from "../../shared/material/material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { ListComponent } from "./components/list/list.component";
import { FormsComponent } from "./components/forms/forms.component";
import { StatusPipe } from "./pipe/status.pipe";

// using ng-mask 14.x
import { NgxMaskModule, IConfig } from "ngx-mask";

export const options: Partial<null | IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [ListComponent, FormsComponent, StatusPipe],
  imports: [
    CommonModule,
    EntradasRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
  ],
})
export class EntradasModule {}
