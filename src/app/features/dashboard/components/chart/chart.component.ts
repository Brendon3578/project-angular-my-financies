import {
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { Input } from "@angular/core";
import { EntradasList } from "../../models/entrada.model";
import { Chart, ChartConfiguration, ChartType } from "chart.js";
import { BaseChartDirective } from "ng2-charts";
import { default as Annotation } from "chartjs-plugin-annotation";

@Component({
  selector: "app-chart",
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.scss"],
})
export class ChartComponent implements OnChanges {
  @Input() entradas!: EntradasList;
  despesasMonthTotalValue: number[] = Array.from(Array(12), () => 0);
  receitasMonthTotalValue: number[] = Array.from(Array(12), () => 0);
  saldoMonthTotalValue: number[] = Array.from(Array(12), () => 0);

  months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  constructor() {
    Chart.register(Annotation);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.entradas);
    this.entradas.forEach((entrada) => {
      let month = parseInt(entrada.data.split("/")[1]);

      if (!(entrada.tipo == "despesa" || entrada.tipo == "receita")) {
        throw new Error("Tipo de entrada não categorizada!");
      }

      if (entrada.tipo == "despesa") {
        this.despesasMonthTotalValue[month] += parseFloat(entrada.valor);
      } else if (entrada.tipo == "receita") {
        this.receitasMonthTotalValue[month] += parseFloat(entrada.valor);
      }
    });
    this.getSaldoMonth();
    console.log(this.saldoMonthTotalValue);
    this.chart?.update();
  }

  getSaldoMonth() {
    this.receitasMonthTotalValue.forEach((actualReceitaValue, index) => {
      this.saldoMonthTotalValue[index] =
        actualReceitaValue - this.despesasMonthTotalValue[index];
    });
  }

  public lineChartData: ChartConfiguration["data"] = {
    datasets: [
      {
        data: this.receitasMonthTotalValue,
        label: "Total da receita mensal",
        backgroundColor: "rgba(75,179,75,0.2)",
        borderColor: "rgba(75,179,75,1)",
        pointBackgroundColor: "rgba(75,179,75,1)",
        pointBorderColor: "rgba(75,179,75,1)",
        pointHoverBorderColor: "rgba(75,179,75,0.8)",
        fill: "origin",
      },
      {
        data: this.despesasMonthTotalValue,
        label: "Total da despesa mensal",
        backgroundColor: "rgba(190, 81, 81,0.2)",
        borderColor: "rgba(190, 81, 81,1)",
        pointBackgroundColor: "rgba(190, 81, 81,1)",
        pointBorderColor: "rgba(190, 81, 81,1)",
        pointHoverBorderColor: "rgba(190, 81, 81,1)",
        fill: "origin",
      },
      {
        data: this.saldoMonthTotalValue,
        label: "Saldo mensal",

        backgroundColor: "rgba(103, 58, 183,0.3)",
        borderColor: "rgba(103, 58, 183,1)",
        pointBackgroundColor: "rgba(103, 58, 183,1)",
        pointBorderColor: "rgba(103, 58, 183,1)",

        pointHoverBorderColor: "rgba(103, 58, 183,0.8)",
        fill: "origin",
      },
    ],
    labels: this.months,
  };

  public lineChartOptions: ChartConfiguration["options"] = {
    elements: {
      point: {
        radius: 3,
      },
      line: {
        tension: 0.25,
      },
    },
    plugins: {},

    responsive: true,
    // scales: {
    //   // We use this empty structure as a placeholder for dynamic theming.
    //   xAxis: {
    //     display: false,
    //     grid: {
    //       drawBorder: false,
    //     },
    //   },
    //   yAxis: {
    //     display: false,
    //     grid: {
    //       drawBorder: false,
    //     },
    //   },
    // },
  };

  public lineChartType: ChartType = "line";

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
}
