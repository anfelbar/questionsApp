import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../shared/user.class';
import { AuthenticationService } from '../services/authentication-service.service'

// import { AngularFireAuth } from '@angular/fire/auth'
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Platform, LoadingController } from '@ionic/angular';
// import * as firebase from 'firebase/app';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: User = new User();
  loading: any;

  constructor(private router: Router,
    private authSvc: AuthService,
    private platform: Platform,
    private google: GooglePlus,
    public loadingController: LoadingController,
   /* private fireAuth: AngularFireAuth,*/
    public authService: AuthenticationService) { }

  /*ngOnInit() {
  }*/

  async onLogin() {
    const token = this.authSvc.getToken();
    if (token !== null && token !== ''){
      //  alert('Yes, ya esta guardado: '+token)
      this.router.navigate(['/home'], { state: { data: this.authSvc.getCorreo() } });
    } else {
      this.login();
    }
  }



  async ngOnInit() {

  }


  async presentLoading(loading) {
    await loading.present();
  }

  async login() {
    let params;
    if (this.platform.is('android')) {
      params = {
        webClientId: 'WEBCLIENT',      
        offline: true
      }
    }
    else {
      params = {}
    }
    this.loading = await this.loadingController.create({
      message: 'Autenticando ...'
    });
    this.loading.present();

    this.google.login(params)
      .then((response) => {
        this.authSvc.setToken(response.idToken);
        this.authSvc.setCorreo(response.email);
        this.onLoginSuccess(response.email);
      }).catch((error) => {
        console.log(error)
        alert('error:' + JSON.stringify(error))
      });
  }

  onLoginSuccess(correo) {
    // alert('correo: '+correo);
    this.router.navigate(['/home'], { state: { data: correo } });
    this.loading.dismiss();
    /*const credential = accessSecret ? firebase.auth.GoogleAuthProvider

      .credential(accessToken, accessSecret) : firebase.auth.GoogleAuthProvider
        .credential(accessToken);
    // alert("credentials "+JSON.stringify(credential));
    this.fireAuth.auth.signInWithCredential(credential)
      .then((response) => {
        const correo = this.fireAuth.auth.currentUser.email;
        this.router.navigate(["/home"], { state: { data: correo } });
        this.loading.dismiss();
      });

*/
    // this.loading.dismiss();

  }// */
}
