import { Component, OnInit } from "@angular/core";
import { CategoriasService } from "../../service/categorias.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Categoria } from "../../models/categoria.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SnackBarService } from "../../../../shared/material/snack-bar/snack-bar.service";

@Component({
  selector: "app-forms",
  templateUrl: "./forms.component.html",
  styleUrls: ["./forms.component.scss"],
})
export class FormsComponent implements OnInit {
  categoria!: Categoria;
  id: string = "";
  formCategoria!: FormGroup;
  route: string = "";
  isNewCategoria: boolean = false;
  buttonMessage: string = "Salvar";
  formTitle: string = "Editar categoria";

  constructor(
    private categoriasService: CategoriasService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    this.route = this.activatedRoute.snapshot.url[0].path;
    this.createForm();

    if (this.route == "editar") {
      this.getCategoriaById();
    } else if (this.route == "criar") {
      this.formTitle = "Adicionar nova categoria";
      this.buttonMessage = "Criar";
      this.isNewCategoria = true;
    }
  }

  getCategoriaById() {
    this.id = this.activatedRoute.snapshot.url[1].path;
    this.categoriasService.getCategoriaById(this.id).subscribe((categoria) => {
      this.categoria = categoria;
      this.formCategoria.controls["nome"].setValue(categoria.nome);
      this.formCategoria.controls["descricao"].setValue(categoria.descricao);
    });
  }

  createForm() {
    this.formCategoria = this.formBuilder.group({
      nome: ["", Validators.required],
      descricao: ["", Validators.required],
    });
  }

  saveCategoria() {
    if (this.formCategoria.touched && this.formCategoria.dirty) {
      const payload: Categoria = {
        nome: this.formCategoria.controls["nome"].value,
        descricao: this.formCategoria.controls["descricao"].value,
      };

      if (this.isNewCategoria) {
        this.createCategoria(payload);
      } else {
        this.updateCategoria({ id: this.categoria.id, ...payload });
      }
    }
  }

  updateCategoria(payload: Categoria) {
    this.categoriasService.updateCategoria(payload).subscribe(() => {
      this.redirectToMainPage();
    });
  }

  createCategoria(payload: Categoria) {
    this.categoriasService.createCategoria(payload).subscribe(() => {
      this.redirectToMainPage();
      this.snackBarService.openSnackBar(
        `Categoria "${payload.nome}" criada com sucesso`
      );
    });
  }

  redirectToMainPage() {
    this.router.navigate(["categorias"]);
  }
}
