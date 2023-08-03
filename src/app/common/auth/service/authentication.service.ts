import { Injectable, Injector } from "@angular/core";
import { BehaviorSubject, Observable, map } from "rxjs";
import { HttpBaseService } from "../../../shared/base/http-base.service";
import { Login } from "../models/login";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService extends HttpBaseService {
  private subjectUser$: BehaviorSubject<any> = new BehaviorSubject(null);
  private subjectLogin$: BehaviorSubject<any> = new BehaviorSubject(false);

  constructor(protected override readonly injector: Injector) {
    super(injector);
  }

  login(login: Login): Observable<any> {
    return this.httpPost<any>("authentication", login).pipe(
      map((response) => {
        sessionStorage.setItem("token", response.token);
        this.subjectUser$.next(response.user);
        this.subjectLogin$.next(true);

        return response.user;
      })
    );
  }

  logout() {
    sessionStorage.removeItem("token");
    this.subjectUser$.next(null);
    this.subjectLogin$.next(false);
  }

  isUserLoggedIn(): Observable<any> {
    const token = sessionStorage.getItem("token");
    if (token) {
      this.subjectLogin$.next(true);
    }
    return this.subjectLogin$.asObservable();
  }

  getUser(): Observable<any> {
    return this.subjectUser$.asObservable();
  }
}
