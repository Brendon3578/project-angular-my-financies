import { Component, OnInit } from "@angular/core";
import { DashboardService } from "./../../service/dashboard.service";
import { EntradasList } from "../../models/entrada.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  entradas: EntradasList = [];
  saldo = 0;
  despesa = 0;
  receita = 0;
  today = new Date();

  formDashboard!: FormGroup;

  constructor(
    private dashboardService: DashboardService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getEntradas();
  }

  createForm() {
    this.formDashboard = this.formBuilder.group({
      mes: [this.today.getMonth(), Validators.required],
      ano: [this.today.getFullYear(), Validators.required],
    });
  }

  getEntradas() {
    const payload = {
      mes: this.formDashboard.controls["mes"].value + 1,
      ano: this.formDashboard.controls["ano"].value,
    };

    this.dashboardService.getEntradas(payload).subscribe((entradas) => {
      this.entradas = entradas;
      this.getReceitas();
      this.getSaldo();
    });
  }

  getReceitas() {
    this.despesa = 0;
    this.receita = 0;
    this.entradas.forEach((entrada) => {
      if (entrada.tipo == "receita") {
        this.receita += parseFloat(entrada.valor);
      } else if (entrada.tipo == "despesa") {
        this.despesa += parseFloat(entrada.valor);
      }
    });
  }

  getSaldo() {
    this.saldo = this.receita - this.despesa;
  }

  months = [
    { value: 0, viewValue: "Janeiro" },
    { value: 1, viewValue: "Fevereiro" },
    { value: 2, viewValue: "Março" },
    { value: 3, viewValue: "Abril" },
    { value: 4, viewValue: "Maio" },
    { value: 5, viewValue: "Junho" },
    { value: 6, viewValue: "Julho" },
    { value: 7, viewValue: "Agosto" },
    { value: 8, viewValue: "Setembro" },
    { value: 9, viewValue: "Outubro" },
    { value: 10, viewValue: "Novembro" },
    { value: 11, viewValue: "Dezembro" },
  ];
}
