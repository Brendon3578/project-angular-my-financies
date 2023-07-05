import { Injectable, Injector } from "@angular/core";
import { HttpBaseService } from "src/app/shared/base/http-base.service";
import { EntradasList } from "../models/entrada.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DashboardService extends HttpBaseService {
  protected endpoint = "entradas";

  constructor(protected override readonly injector: Injector) {
    super(injector);
  }

  getEntradas(payload?: any): Observable<EntradasList> {
    const params = payload ? `?q=${payload.mes}/${payload.ano}` : "";

    return this.httpGet(`${this.endpoint}${params}`);
  }
}
