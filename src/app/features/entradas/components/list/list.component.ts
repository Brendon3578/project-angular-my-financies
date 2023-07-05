import { Component } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Entrada, EntradasList } from "../../models/entrada.model";
import { ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { EntradasService } from "../../service/entradas.service";

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

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private entradasService: EntradasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.searchEntradas();
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
}
