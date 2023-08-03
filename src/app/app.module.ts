import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ToolbarComponent } from "./common/components/toolbar/toolbar.component";
import { MaterialModule } from "./shared/material/material.module";
import { PageNotFoundComponent } from "./common/components/page-not-found/page-not-found.component";
import { LOCALE_ID } from "@angular/core";
import localePt from "@angular/common/locales/pt";
import { registerLocaleData } from "@angular/common";
import { NgChartsModule } from "ng2-charts";
import { AuthGuard } from "./common/auth/guards/auth.guard";
import { AuthInterceptor } from "./common/auth/interceptor/auth.interceptor";

registerLocaleData(localePt);

@NgModule({
  declarations: [AppComponent, ToolbarComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    NgChartsModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "pt-BR" },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
