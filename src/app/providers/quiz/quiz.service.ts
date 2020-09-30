//  import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
// import { Http, URLSearchParams, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import 'rxjs/add/operator/map';
// import { map } from 'rxjs/operators';
// import { Subscriber } from 'rxjs/Subscriber';
import { Storage } from '@ionic/storage';
// import { UserProvider } from "../user/user";
import { AuthService } from '../../services/auth.service';

@Injectable()
export class QuizService {
  url: string;
  urlScore: string;
  // urlUserInfo: string;
  // urlUsersInfo: string;
  // userInfo: any[] = [];
  // usersInfo: any[] = [];
  // idUsuario: string;

  constructor(
    public httpClient: HttpClient,
    private storage: Storage,
    private authSvc: AuthService
  ) {
    // , private _u: UserProvider) {

    this.url = 'BACKENDURL';
    this.urlScore =
      'BACKENDYRL/SCORE';
  }

  getQuiz() {
    const json = this.httpClient.get(this.url, { headers: new HttpHeaders({Accept: 'application/json',
    'Content-Type': 'application/json', Authorization: 'Bearer ' + this.authSvc.getToken()})});
    //  alert('json is '+JSON.stringify(json));
    return json;
  }

  async savePuntaje(score, emails) {
    // console.log("saving score" + score);
    /*var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );*/
    let execTime = 0;
    let errno = null;
    const requestOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authSvc.getToken()
      }),
    };
    await this.storage.get('puntaje').then(async (val) => {
      const currentDate = new Date().getTime();
      await this.storage.get('time1').then((val) => {
        // console.log("Tiempo de juego :" + (currentDate - val) / 1000);
        execTime = (currentDate - val) / 1000;
      });
    });
    // console.log("Exectime: " + execTime);
    await this.storage.get('errno').then((val) => {
      errno = JSON.parse(val);
    });
    // console.log("Errno: " + JSON.stringify(errno));
    const postData = {
      puntaje: score,
      email: emails,
      tiempo: execTime,
      erroresRespuestas: errno,
    };
    // console.log("Postdata: %j", postData);
    // console.log("Tam errno: %j", errno.length);
    await this.httpClient
      .post(this.urlScore, postData, requestOptions)
      .subscribe(
        (data) => {
          console.log('Enviado con exito: ', data);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
