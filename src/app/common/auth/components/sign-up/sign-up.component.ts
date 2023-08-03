import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService } from "./../../service/authentication.service";
import { Router } from "@angular/router";
import { SnackBarService } from "../../../../shared/material/snack-bar/snack-bar.service";
import { MatchValidator } from './../validators/match.validator';
import { PasswordErrorStateMatcher } from "../validators/password.error-matcher";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBarService: SnackBarService
  ) {}
  loginFormValues = {};

  passwordMatcher = new PasswordErrorStateMatcher();

  firstFormGroup: FormGroup = this.formBuilder.group({
    name: [''],
    address: [''],
  })

  secondFormGroup: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    confirmPassword: ['', [Validators.required]],
  }, { validators: MatchValidator('password', 'confirmPassword')})

  get passwordMatchError() {
    return (
      this.secondFormGroup.hasError('mismatch') && this.secondFormGroup.get('confirmPassword')?.touched
    )
  }

  register() {
    this.loginFormValues = {...this.firstFormGroup, ...this.secondFormGroup}
    // this.authLogin.email = this.authLogin.email.toLowerCase()
    // console.log(this.authLogin);
    // this.authenticationService.login(this.authLogin).subscribe(
    //   (user) => {
    //     if (user?.id) {
    //       this.router.navigateByUrl("dashboard");
    //     }
    //   },
    //   (error) => {
    //     let errorMessage = error.error.message
    //     if (errorMessage) {
    //       this.snackBarService.openSnackBar(`Falha no login: ${errorMessage}.`);
    //     } else {
    //       this.snackBarService.openSnackBar("Falha no login.");
          
    //       console.log(error.error)
    //     }
    //   }
    // );
  }
}
