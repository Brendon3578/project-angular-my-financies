import { Injectable, Injector } from "@angular/core";
import { HttpBaseService } from "src/app/shared/base/http-base.service";
import { Categoria, CategoriasList } from "../models/categoria.model";
import { Observable } from "rxjs/internal/Observable";

@Injectable({
  providedIn: "root",
})
export class CategoriasService extends HttpBaseService {
  private endpoint = "categorias";

  constructor(protected override injector: Injector) {
    super(injector);
  }

  getCategorias(): Observable<CategoriasList> {
    return this.httpGet(this.endpoint);
  }

  getCategoriaById(id: number | string): Observable<Categoria> {
    return this.httpGet(`${this.endpoint}/${id}`);
  }

  updateCategoria(payload: Categoria): Observable<Categoria> {
    return this.httpPut(`${this.endpoint}/${payload.id}`, payload);
  }

  deleteCategoria(id: number | string): Observable<Categoria> {
    return this.httpDelete(`${this.endpoint}/${id}`);
  }

  createCategoria(payload: Categoria): Observable<Categoria> {
    return this.httpPost(this.endpoint, payload);
  }
}
