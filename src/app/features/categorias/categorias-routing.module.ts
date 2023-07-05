import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListComponent } from "./components/list/list.component";
import { FormsComponent } from "./components/forms/forms.component";

const routes: Routes = [
  { path: "", component: ListComponent },
  { path: "editar/:id", component: FormsComponent },
  { path: "criar", component: FormsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriasRoutingModule {}
