import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { NavController } from '@ionic/angular';
import { QuizService } from '../providers/quiz/quiz.service';
import { Storage } from '@ionic/storage';
import { analytics } from 'firebase';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  corre: string;
  currentDate: number;
  totalQuiz: number;
  option: {
    category: number;
    difficulty: string;
    quizNum: number;
  };

  constructor(
    private router: Router,
    // public navCtrl: NavController,
    private quizProvider: QuizService,
    private storage: Storage,
    private authSvc: AuthService
  ) {}

  ngOnInit() {
    this.corre = history.state.data;
    // alert("el estado es en home" + this.corre);
    // alert("el estado es "+JSON.stringify(this.corre));
  }

  async onLogin() {
    this.router.navigateByUrl('/login');
  }

  async exitGame() {
    // alert("Saliendo de juego "+this.corre);
    this.authSvc.logout();
    navigator['app'].exitApp();
  }

  async ionViewWillEnter() {
    // console.log("ionweillEnter ");
    this.storage.get('option').then((val) => {
      if (val !== null) {
        this.option = JSON.parse(val);
      } /*else {
        this.option = {
          category: 15,
          difficulty: "medium",
          quizNum: 10,
        };
      }*/

      this.quizProvider.getQuiz().subscribe((quiz) => {
        this.storage.set('quizzes', JSON.stringify(quiz));
        this.storage.set('quizzesBackUp', JSON.stringify(quiz));
        // console.log("Setting quizzes ");
        // alert('string: ' + JSON.stringify(quiz));
        const quizzes = JSON.parse(JSON.stringify(quiz));
        if (quizzes.results === false){
          this.authSvc.logout();
          alert('Tiempo de conexión agotado, autentiquese nuevamente');
          this.router.navigateByUrl('/login');
        }
        this.totalQuiz = quizzes.results.length;
        const errores = quizzes.results.map(function (lista) {
          const objeto = { id: lista._id, errno: 0 };
          return objeto;
        });
        // alert("Los errores ids home: " + errores[0].id);
        this.storage.set('errno', JSON.stringify(errores));
      });
    });
  }

  start() {
    // this.router.navigateByUrl('/game-view');

    this.currentDate = new Date().getTime();
    // alert("Fecha :" + this.currentDate);
    this.storage.set('time1', this.currentDate);
    this.router.navigate(['/game-view'], { state: { data: this.corre } });
    this.storage.set('quizIndex', 0);
    this.storage.set('results', []);
    this.storage.set('puntaje', 0);
  }
}
