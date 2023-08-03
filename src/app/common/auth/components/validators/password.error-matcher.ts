import { FormControl, FormGroupDirective, NgForm } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

export class PasswordErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {

    const isSubmitted = form && form.submitted;
    const passwordsMatch = control?.parent?.get('password')?.value === control?.parent?.get('confirmPassword')?.value;
    return !!((control && control.invalid && (control.dirty || control.touched || isSubmitted)) || !passwordsMatch);
  }
}