import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "status",
})
export class StatusPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return value ? "Pago" : "Pendente";
  }
}
