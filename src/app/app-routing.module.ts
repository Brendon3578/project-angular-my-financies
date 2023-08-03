import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PageNotFoundComponent } from "./common/components/page-not-found/page-not-found.component";
import { AuthGuard } from "./common/auth/guards/auth.guard";

const routes: Routes = [
  { path: "", redirectTo: "dashboard", pathMatch: "full" },
  {
    path: "dashboard",
    loadChildren: () =>
      import("./features/dashboard/dashboard.module").then(
        (m) => m.DashboardModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "categorias",
    loadChildren: () =>
      import("./features/categorias/categorias.module").then(
        (m) => m.CategoriasModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "entradas",
    loadChildren: () =>
      import("./features/entradas/entradas.module").then(
        (m) => m.EntradasModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "login",
    loadChildren: () =>
      import("./common/auth/auth.module").then((m) => m.AuthModule),
  },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
