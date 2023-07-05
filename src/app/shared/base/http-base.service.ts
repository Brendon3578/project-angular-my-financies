import { HttpClient } from "@angular/common/http";
import { Injectable, Injector, inject } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class HttpBaseService {
  private readonly httpClient!: HttpClient;

  private baseApiUrl = "http://localhost:3000/";

  constructor(protected readonly injector: Injector) {
    if (injector == null || injector == undefined) {
      throw new Error("Injector não pode ser nulo");
    }

    // injeção de dependência invertida
    this.httpClient = injector.get(HttpClient);
  }

  protected httpGet<T>(endpoint: string): Observable<T> {
    return this.httpClient.get<T>(`${this.baseApiUrl}${endpoint}`);
  }

  protected httpPost<T>(endpoint: string, payload: T): Observable<T> {
    return this.httpClient.post<T>(`${this.baseApiUrl}${endpoint}`, payload);
  }

  protected httpPut<T>(endpoint: string, payload: T): Observable<T> {
    return this.httpClient.put<T>(`${this.baseApiUrl}${endpoint}`, payload);
  }
  protected httpDelete<T>(endpoint: string): Observable<T> {
    return this.httpClient.delete<T>(`${this.baseApiUrl}${endpoint}`);
  }
}
