import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService } from "./../../service/authentication.service";
import { Router } from "@angular/router";
import { Login } from "../../models/login";
import { SnackBarService } from "../../../../shared/material/snack-bar/snack-bar.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBarService: SnackBarService
  ) {}

  loginForm!: FormGroup;
  authLogin!: Login;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: [
        "",
        Validators.compose([Validators.required, Validators.minLength(4)]),
      ],
    });
  }

  login() {
    this.authLogin = Object.assign({}, this.authLogin, this.loginForm.value);
    // this.authLogin.email = this.authLogin.email.toLowerCase()
    // console.log(this.authLogin);
    this.authenticationService.login(this.authLogin).subscribe(
      (user) => {
        if (user?.id) {
          this.router.navigateByUrl("dashboard");
        }
      },
      (error) => {
        let errorMessage = error.error.message
        if (errorMessage) {
          this.snackBarService.openSnackBar(`Falha no login: ${errorMessage}.`);
        } else {
          this.snackBarService.openSnackBar("Falha no login.");
          
          console.log(error.error)
        }
      }
    );
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(["login"]);
  }
}
