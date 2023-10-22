import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { IngredienteService } from 'src/app/shared/services/ingrediente.service';
import { RacaoService } from 'src/app/shared/services/racao.service';
import { ECharts } from 'echarts';
import { ElementRef } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-estatisticas',
  templateUrl: './estatisticas.component.html',
  styleUrls: ['./estatisticas.component.scss']
})
export class EstatisticasComponent implements OnInit, AfterViewInit {

  @ViewChild('echartsChart', { static: false })
  echartsChart?: ElementRef;

  isDropdownOpen: boolean = false;
  selectedFilter: string = 'Rações mais produzidas';
  
  nomesRacoes: string[] = [];
  nomesIngredientes: string[] = [];
  nomesProduzidas: string[] = [];

  xAxisData: any[] = [];
  seriesData: any[][][] = [];
  chart!: ECharts;

  constructor(
    private racaoService: RacaoService,
    private ingredientreService: IngredienteService
  ) { }

  ngOnInit(): void {
    this.getRacoesMaisProduzidas();
    this.getRacoesMaisCompradas();
    this.getIngredientesMaisComprados();
  }

  ngAfterViewInit() {
    this.initializeChart();
  }

  initializeChart() {
    const chart = echarts.init(this.echartsChart!.nativeElement);
    chart.setOption(this.options);
    this.chart = chart;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectFilter(filter: string) {
    this.selectedFilter = filter;
    this.isDropdownOpen = false;
    console.log('Filtro => ', this.selectedFilter);
    this.updateChart();
  }

  getRacoesMaisProduzidas() { 
    this.racaoService.getRacoesMaisProduzidas().subscribe({
      next: (racoes) => {
        console.log('Rações mais produzidass =>\n', racoes);
        this.nomesProduzidas = racoes.map((racao) => racao.racao);
        this.seriesData[1] = racoes.map((racao) => racao.quantidade) as any;
        this.updateChart();
      }
    });
  }

  getRacoesMaisCompradas() {
    this.racaoService.getRacoesMaisCompradas().subscribe({
      next: (racoes) => {
        console.log('Rações mais compradas =>\n', racoes);
        this.nomesRacoes = racoes.map((racao) => racao.racao);
        this.seriesData[0] = racoes.map((racao) => racao.quantidade) as any;
        this.updateChart();
      }
    });
  }

  getIngredientesMaisComprados() {
    this.ingredientreService.getIngredientesMaisComprados().subscribe({
      next: (ingredientes) => {
        console.log('Ingredientes mais compradas =>\n', ingredientes);
        this.nomesIngredientes = ingredientes.map((ingrediente) => ingrediente.ingrediente);
        this.seriesData[2] = ingredientes.map((ingrediente) => +ingrediente.quantidade) as any;
        this.updateChart();
      }
    });
  }

  updateChart() {
    console.log('FiltroChart: ', this.selectedFilter)
    this.options.xAxis.data = [];
    this.options.series = [];

    
    if (this.selectedFilter === 'Rações mais produzidas') {
      this.options.xAxis.data = this.nomesProduzidas;
      this.options.series.push({
        name: 'Rações mais produzidas',
        data: this.seriesData[1],
        type: 'bar'
      });
      console.log('passou1')

    } else if (this.selectedFilter === 'Rações mais compradas') {
      this.options.xAxis.data = this.nomesRacoes;
      this.options.series.push({
        name: 'Rações mais compradas',
        data: this.seriesData[0],
        type: 'bar'
      });
      console.log('passou2')

    } else if (this.selectedFilter === 'Ingredientes mais comprados') {
      this.options.xAxis.data = this.nomesIngredientes;
      this.options.series.push({
        name: 'Ingredientes mais comprados',
        data: this.seriesData[2],
        type: 'bar'
      });
      console.log('passou3')
    }
    this.chart.setOption(this.options);

  }

  
  options: any = {
    toolbox: {  
      feature: {
        dataView: {},
        saveAsImage: {
          pixelRatio: 2
        }
      }
    },
    tooltip: {},
    xAxis: {
      type: 'category',
      data: [],
      splitLine: {
        show: true
      }
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        },
        animationDelay: function (idx: number) {
          return idx * 10;
        }
      }
    ],
    animationEasing: 'elasticOut',
    animationDelayUpdate: function (idx: number) {
      return idx * 5;
    }
  };

}
