import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PageNotFoundComponent } from "./common/components/page-not-found/page-not-found.component";

const routes: Routes = [
  { path: "", redirectTo: "dashboard", pathMatch: "full" },
  {
    path: "dashboard",
    loadChildren: () =>
      import("./features/dashboard/dashboard.module").then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: "categorias",
    loadChildren: () =>
      import("./features/categorias/categorias.module").then(
        (m) => m.CategoriasModule
      ),
  },
  {
    path: "entradas",
    loadChildren: () =>
      import("./features/entradas/entradas.module").then(
        (m) => m.EntradasModule
      ),
  },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
