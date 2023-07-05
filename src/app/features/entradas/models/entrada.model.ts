interface Entrada {
  id?: number;
  nome: string;
  categoriaId: number;
  pago: boolean;
  data: string;
  valor: number;
  tipo: string;
}

interface EntradasList extends Array<Entrada> {}

export { Entrada, EntradasList };
