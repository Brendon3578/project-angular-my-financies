import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CategoriasRoutingModule } from "./categorias-routing.module";
import { ListComponent } from "./components/list/list.component";
import { FormsComponent } from "./components/forms/forms.component";
import { MaterialModule } from "../../shared/material/material.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [ListComponent, FormsComponent],
  imports: [
    CommonModule,
    CategoriasRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class CategoriasModule {}
