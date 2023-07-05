import { Injectable } from "@angular/core";
import { HttpBaseService } from "src/app/shared/base/http-base.service";
import { Injector } from "@angular/core";
import { Entrada, EntradasList } from "../models/entrada.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class EntradasService extends HttpBaseService {
  private endpoint = "entradas";

  constructor(protected override readonly injector: Injector) {
    super(injector);
  }

  getEntradas(): Observable<EntradasList> {
    return this.httpGet(this.endpoint);
  }

  getEntradaById(id: number | string): Observable<Entrada> {
    return this.httpGet(`${this.endpoint}/${id}`);
  }

  createEntrada(payload: Entrada): Observable<Entrada> {
    return this.httpPost(this.endpoint, payload);
  }
  updateEntrada(payload: Entrada): Observable<Entrada> {
    return this.httpPut(`${this.endpoint}/${payload.id}`, payload);
  }

  deleteEntrada(id: number | string): Observable<EntradasList> {
    return this.httpDelete(`${this.endpoint}/${id}`);
  }
}
