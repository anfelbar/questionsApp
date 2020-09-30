import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage";
import { NavController } from "@ionic/angular";
// import { FeedbackPage } from '../feedback/feedback';
import { QuizService } from "../providers/quiz/quiz.service";
import { AlertController } from "@ionic/angular";
import { stringify } from "@angular/compiler/src/util";
// import { timingSafeEqual } from 'crypto';

@Component({
  selector: "app-game-view",
  templateUrl: "./game-view.page.html",
  styleUrls: ["./game-view.page.scss"],
})
export class GameViewPage implements OnInit {
  quizzes: any;
  currentQuiz: any;
  answers: any;
  correct: any;
  quizIndex: number;
  totalQuizNum: number;
  myRand: number;
  corre: string;
  puntaje: number;
  masDificil: number;
  errores: null;
  currentDate: number;
  questionID: string;

  constructor(
    private router: Router,
    public navCtrl: NavController,
    // public navParams: NavParams,
    private quizProvider: QuizService,
    private storage: Storage,
    public alertController: AlertController
  ) {}

  async onBack() {
    this.quizProvider.savePuntaje(this.puntaje, this.corre);
    // this.currentDate = new Date().getTime();
    // alert("Fecha :" + this.currentDate);
    // this.storage.set("time2", this.currentDate);
    // this.storage.get("time1").then((val) => {
    // alert("Tiempo de juego :" + (this.currentDate - val) / 1000);
    // });
    this.router.navigate(["/statistics"]);
  }

  async about() {
    this.router.navigateByUrl("/login");
  }

  ngOnInit() {
    // alert("ngOnInit");
    this.corre = history.state.data;

    this.storage.get("quizIndex").then((val) => {
      this.quizIndex = val;
    });

    this.storage.get("puntaje").then((val) => {
      this.puntaje = val;
    });

    this.storage.get("quizzes").then((val) => {
      this.quizzes = JSON.parse(val);
      this.totalQuizNum = this.quizzes.results.length;
      if (this.totalQuizNum === 0) {
        this.quizProvider.savePuntaje(this.puntaje, this.corre);
        this.router.navigate(["/statistics"]);
        return;
      }

      this.quizIndex = this.random();
      this.currentQuiz = this.quizzes.results[this.quizIndex];

      this.answers = this.currentQuiz.incorrect_answers;
      this.correct = this.currentQuiz.correct_answer;
      this.answers.push(this.correct);
      const rand = Math.floor(Math.random() * 4);
      const tmp = this.answers[rand];
      this.answers[rand] = this.correct;
      this.answers[3] = tmp;
      this.questionID = this.currentQuiz._id;
    });
    // alert("this qID onIgnit: " + this.questionID);
  }

  random(): number {
    const rand = Math.floor(Math.random() * this.totalQuizNum);
    return rand;
  }

  trackAnswers(answer) {
    this.storage.get("results").then((val) => {
      const results = val,
        quizResults = {
          yourAnswer: answer,
          correctAnswer: this.correct,
        };
      results.push(quizResults);
      this.storage.set("results", results);
    });
    /*this.storage.get("errno").then((val) => {
      const errores = JSON.parse(val);
      /// console.log("Los errores ids gameView: " + errores[1].id);
      /// console.log("quiestionID trackanswe1 : " + this.questionID);
      errores.map(function (val) {
        // alert("this qID trackanswer: " + this.questionID);
        if (val.id == this.questionID) {
          console.log("Numero de errores de pregunta: " + val.errno);
        }
      }, this);
    });*/
  }

  async handleAnswer(answer) {
    // console.log('before correct' + this.correct);
    if (answer === this.correct) {
      // console.log('is correct');
      this.trackAnswers(answer);
      this.puntaje = +this.puntaje + +7.0;
      this.storage.set("puntaje", this.puntaje);
      this.presentAlertConfirm(true);
      const removed = this.quizzes.results.splice(this.quizIndex, 1);
      // alert('quiz lenght2 '+this.quizzes.results.length);
      this.storage.set("quizzes", JSON.stringify(this.quizzes));
      // console.log("this qID handle: " + this.questionID);
    } else {
      this.storage.get("errno").then((val) => {
        let errores = JSON.parse(val);
        // console.log("Los errores ids gameView: " + errores[1].id);
        // console.log("quiestionID trackanswe1 : " + this.questionID);
        const nuevosE = errores.map(function (val) {
          if (val.id == this.questionID) {
            const objeto = { id: this.questionID, errno: val.errno + 1 };
            return objeto;
          } else {
            return val;
          }
        }, this);
        //console.log("nuevosE %j", nuevosE);
        this.storage.set("errno", JSON.stringify(nuevosE));
      });

      this.presentAlertConfirm(false);
    }
    // this.router.navigateByUrl('/contact');
  }

  async presentAlertConfirm(check) {
    let theMessage: string;
    theMessage = "";
    let theHeader: string;
    theHeader = "";

    if (check) {
      theMessage =
        "Correcto, la respuesta es <strong>" + this.correct + "</strong>!!!\n";
      theMessage = theMessage + "Puntaje en partida " + this.puntaje;
      theHeader = "Bien hecho!";
    } else {
      theMessage =
        "Incorrecto, la respuesta es <strong>" + this.correct + "</strong>";
      theHeader = "Sigue intentandolo!";
    }

    const alert = await this.alertController.create({
      header: theHeader,
      message: theMessage,
      buttons: [
        /*{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      },
      */ {
          text: "Continuar",
          handler: () => {
            // console.log("Confirm Okay");
            this.ngOnInit();
          },
        },
      ],
    });

    await alert.present();
    this.storage.get("quizIndex").then((val) => {
      const currentQuizIndex = val;
      this.storage.set("quizIndex", currentQuizIndex + 1);
    });
    // this.ngOnInit();
  }
}
