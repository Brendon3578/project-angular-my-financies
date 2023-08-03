import { Component, Input, OnInit } from "@angular/core";
import { link } from "../../..//shared/interface/link";
import { AuthenticationService } from "./../../auth/service/authentication.service";
import { SnackBarService } from "../../../shared/material/snack-bar/snack-bar.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"],
})
export class ToolbarComponent implements OnInit {
  @Input() menuLinksList!: link[];

  isLoggedIn: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private snackBarService: SnackBarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authenticationService.isUserLoggedIn().subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(["login"]).then(() => {
      this.snackBarService.openSnackBar("Desconectado com sucesso!");
    });
  }
}
