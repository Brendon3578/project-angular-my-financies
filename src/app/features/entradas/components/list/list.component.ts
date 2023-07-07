import { Component } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Entrada, EntradasList } from "../../models/entrada.model";
import { ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { EntradasService } from "../../service/entradas.service";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Subscription, distinctUntilChanged, reduce } from "rxjs";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = [
    "nome",
    "pago",
    "data",
    "valor",
    "tipo",
    "actions",
  ];
  dataSource = new MatTableDataSource<Entrada>();
  entradas: EntradasList = [];

  nomeFilter = new FormControl();
  pagoFilter = new FormControl();
  tipoFilter = new FormControl();

  filteredValues = { nome: "", pago: "", tipo: "" };

  public subscriptions = new Subscription();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private entradasService: EntradasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.searchEntradas();

    this.nomeFilter.valueChanges.subscribe((nomeFilterValue) => {
      this.filteredValues["nome"] = nomeFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.pagoFilter.valueChanges.subscribe((pagoFilterValue) => {
      this.filteredValues["pago"] = pagoFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.tipoFilter.valueChanges.subscribe((tipoFilterValue) => {
      this.filteredValues["tipo"] = tipoFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    this.dataSource.filterPredicate = this.customFilterPredicate();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  searchEntradas() {
    this.entradasService.getEntradas().subscribe((entradas) => {
      this.entradas = entradas;
      console.log(entradas);
      this.dataSource.data = this.entradas;
    });
  }

  callEdit(entrada: Entrada) {
    this.router.navigate(["entradas", "editar", entrada.id]);
  }

  delete(id: number | string) {
    this.entradasService.deleteEntrada(id).subscribe((response) => {
      this.searchEntradas();
    });
  }

  redirectToCreateEntrada() {
    this.router.navigate(["entradas", "criar"]);
  }

  customFilterPredicate() {
    const myFilterPredicate = function (
      data: Entrada,
      filter: string
    ): boolean {
      let searchString = JSON.parse(filter);
      // console.log(searchString);

      if (searchString.pago == undefined) {
        searchString.pago = "";
      }

      if (searchString.tipo == undefined) {
        searchString.tipo = "";
      }

      let nomeSearch =
        data.nome == undefined ? "" : data.nome.trim().toLowerCase();
      let tipoSearch =
        data.tipo == undefined ? "" : data.tipo.toString().trim().toLowerCase();
      let pagoSearch =
        data.pago == undefined ? "" : data.pago.toString().toLowerCase();

      let nomeFound =
        nomeSearch.indexOf(searchString.nome.toLowerCase()) !== -1;
      let tipoFound =
        tipoSearch.indexOf(searchString.tipo.toLowerCase()) !== -1;
      let pagoFound = pagoSearch.indexOf(String(searchString.pago)) !== -1;

      if (searchString.topFilter) {
        return nomeFound || tipoFound || pagoFound;
      } else {
        return nomeFound && tipoFound && pagoFound;
      }
    };
    return myFilterPredicate;
  }
}
