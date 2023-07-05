import { Component } from "@angular/core";
import { link } from "./shared/interface/link";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "minhas-financas";

  linksList: link[] = [
    { label: "Dashboard", route: "dashboard" },
    { label: "Categorias", route: "categorias" },
    { label: "Entradas", route: "entradas" },
  ];
}
