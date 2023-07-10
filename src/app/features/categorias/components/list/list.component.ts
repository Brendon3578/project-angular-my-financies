import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { CategoriasService } from "./../../service/categorias.service";
import { Categoria, CategoriasList } from "../../models/categoria.model";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ["nome", "descricao", "actions"];
  dataSource = new MatTableDataSource<Categoria>();
  categorias: CategoriasList = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private categoriasService: CategoriasService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.searchCategorias();
  }

  searchCategorias() {
    this.categoriasService.getCategorias().subscribe((categorias) => {
      this.categorias = categorias;
      this.dataSource.data = this.categorias;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  callEdit(categoria: Categoria) {
    this.router.navigate(["categorias", "editar", categoria.id]);
  }

  delete(id: number | string) {
    this.categoriasService.deleteCategoria(id).subscribe((response) => {
      console.log(response);
      this.searchCategorias();
      this.openSnackBar("Categoria removida com sucesso");
    });
  }

  redirectToCreateCategoria() {
    this.router.navigate(["categorias", "criar"]);
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "Fechar", {
      duration: 4000,
    });
  }
}
