import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { EntradasRoutingModule } from "./entradas-routing.module";
import { MaterialModule } from "src/app/shared/material/material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { ListComponent } from "./components/list/list.component";
import { FormsComponent } from "./components/forms/forms.component";
import { StatusPipe } from "./pipe/status.pipe";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";

@NgModule({
  declarations: [ListComponent, FormsComponent, StatusPipe],
  imports: [
    CommonModule,
    EntradasRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  providers: [provideNgxMask()],
})
export class EntradasModule {}
