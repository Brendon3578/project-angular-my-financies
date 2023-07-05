interface Categoria {
  id?: number;
  nome: string;
  descricao: string;
}

interface CategoriasList extends Array<Categoria> {}

export { Categoria, CategoriasList };
