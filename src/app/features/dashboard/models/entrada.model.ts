interface Entrada {
  id: number;
  nome: string;
  categoriaId: number;
  pago: boolean;
  data: string;
  valor: string;
  tipo: string;
}

interface EntradasList extends Array<Entrada> {}

export { Entrada, EntradasList };
