import { Component, Input } from "@angular/core";
import { link } from "../../..//shared/interface/link";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"],
})
export class ToolbarComponent {
  @Input() menuLinksList!: link[];
}
