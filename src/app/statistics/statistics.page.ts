import { Component, OnInit } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { QuizService } from '../providers/quiz/quiz.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit {
  public columnChart: GoogleChartInterface;
  public brag = false;
  private data: Array<[any, any, any]> = [];
  constructor(
    private router: Router,
    private storage: Storage,
    private quizProvider: QuizService
  ) {}

  getRandomColor() {
    const letters = '0123456789ABCDEF'.split('');
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return 'color: ' + color;
  }

  ngOnInit() {
    this.storage.get('errno').then((val) => {
      const errores = JSON.parse(val);
      // console.log('Los errores ids statistics: ' + JSON.stringify(errores));
      this.storage.get('quizzesBackUp').then((quiz) => {
        // console.log('Las preguntas statistics: ' + JSON.stringify(quiz));
        const quizzes = JSON.parse(quiz).results;
        this.data.push(['Pregunta', 'Errores', { role: 'style' }]);
        // tslint:disable-next-line: forin
        for (const i in quizzes) {
          // console.log('indices' + i); // "0", "1", "2",
          const foo: [string, number, string] = [
            quizzes[i].question,
            errores[i].errno,
            this.getRandomColor(),
          ];
          this.data.push(foo);
        }
        // console.log('Los datos statistics: ' + JSON.stringify(this.data));
        this.brag = true;
      });
    });
    this.iniciarChar();
  }

  iniciarChar(): void {
    this.columnChart = {
      chartType: 'ColumnChart',
      // chartType: "BarChart",
      dataTable: this.data,
      /*dataTable: [
        ["City", "2010 Population"],
        ["New York City, NY", 8175000],
        ["Los Angeles, CA", 3792000],
        ["Chicago, IL", 2695000],
        ["Houston, TX", 2099000],
        ["Philadelphia, PA", 1526000],
      ],*/
      // opt_firstRowIsData: true,
      options: {
        title: 'Estadisticas del último juego',
        explorer: { actions: ['dragToPan'] },
        height: 600,
        chartArea: {
          height: '400',
          backgroundColor: {
            fill: '#FFFF00',
            fillOpacity: 0.1,
          },
        },
        hAxis: {
          title: 'Pregunta',
          minValue: 0,
          textPosition: 'none',
        },
        vAxis: {
          title: 'Errores',
        },
        backgroundColor: {
          // fill: "#000000",
          fillOpacity: 0.4,
        },
      },
    };
  }

  onBack() {
    this.router.navigate(['/home']);
  }
}
