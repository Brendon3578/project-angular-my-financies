import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable, tap } from "rxjs";
import { AuthenticationService } from "../service/authentication.service";
import { SnackBarService } from "../../../shared/material/snack-bar/snack-bar.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private snackBarService: SnackBarService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    // capturar a última pagina que o usuário acessou quando deslogou
    const url = state.url;

    return this.authenticationService.isUserLoggedIn().pipe(
      tap((isLoggedIn) => {
        if (isLoggedIn == false) {
          this.router.navigateByUrl("/login");
          this.snackBarService.openSnackBar("Você não está logado!");

          return false;
        } else {
          return true;
        }
      })
    );
  }
}
