import { Component, OnInit } from "@angular/core";
import { EntradasService } from "../../service/entradas.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Entrada } from "../../models/entrada.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CategoriasService } from "../../../categorias/service/categorias.service";
import * as dayjs from "dayjs";
import { SnackBarService } from "../../../../shared/material/snack-bar/snack-bar.service";

@Component({
  selector: "app-forms",
  templateUrl: "./forms.component.html",
  styleUrls: ["./forms.component.scss"],
})
export class FormsComponent implements OnInit {
  entrada!: Entrada;
  id: string = "";
  formEntrada!: FormGroup;
  route: string = "";
  isNewEntrada: boolean = false;
  buttonMessage: string = "Salvar";
  formTitle: string = "Editar entrada";

  categorias$ = this.categoriasService.getCategorias();

  tiposDeEntradas = [
    { value: "receita", viewValue: "Receita" },
    { value: "despesa", viewValue: "Despesa" },
  ];

  constructor(
    private entradasService: EntradasService,
    private readonly categoriasService: CategoriasService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    this.route = this.activatedRoute.snapshot.url[0].path;
    this.createForm();

    if (this.route == "editar") {
      this.getEntradaById();
    } else if (this.route == "criar") {
      this.formTitle = "Adicionar nova entrada";
      this.buttonMessage = "Criar";
      this.isNewEntrada = true;
    }
  }

  formatBrazilianDateToNativeDate(brazilianDate: string) {
    let [day, month, year] = brazilianDate.split("/");
    return `${month}/${day}/${year}`;
  }

  getEntradaById() {
    this.id = this.activatedRoute.snapshot.url[1].path;
    this.entradasService.getEntradaById(this.id).subscribe((entrada) => {
      // let parsedDate = entrada.data.split("/").map(([day, month, year]) => {
      let parsedDate = this.formatBrazilianDateToNativeDate(entrada.data);
      this.entrada = entrada;
      this.formEntrada.controls["nome"].setValue(entrada.nome);
      this.formEntrada.controls["valor"].setValue(entrada.valor);
      this.formEntrada.controls["categoriaId"].setValue(entrada.categoriaId);
      this.formEntrada.controls["pago"].setValue(entrada.pago);
      this.formEntrada.controls["tipo"].setValue(entrada.tipo);
      this.formEntrada.controls["data"].setValue(new Date(parsedDate));
    });
  }

  createForm() {
    this.formEntrada = this.formBuilder.group({
      nome: ["", Validators.required],
      valor: ["", Validators.required],
      categoriaId: ["", Validators.required],
      pago: [true],
      tipo: ["despesa", Validators.required],
      data: [new Date(), Validators.required],
    });
  }

  saveEntrada() {
    if (this.formEntrada.touched && this.formEntrada.dirty) {
      const formattedDate = dayjs(
        this.formEntrada.controls["data"].value
      ).format("DD/MM/YYYY");
      this.formEntrada.controls["data"].setValue(formattedDate);

      const payload: Entrada = this.formEntrada.getRawValue();
      // this

      // console.log(payload);
      if (this.isNewEntrada) {
        this.createEntrada(payload);
      } else {
        this.updateEntrada({ id: this.entrada.id, ...payload });
      }
    }
  }

  updateEntrada(payload: Entrada) {
    this.entradasService.updateEntrada(payload).subscribe(() => {
      this.redirectToMainPage();
    });
  }

  createEntrada(payload: Entrada) {
    this.entradasService.createEntrada(payload).subscribe(() => {
      this.redirectToMainPage();
      this.snackBarService.openSnackBar(
        `Entrada "${payload.nome}" criada com sucesso`
      );
    });
  }

  redirectToMainPage() {
    this.router.navigate(["entradas"]);
  }
}
