import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
// import { AngularFireAuth } from '@angular/fire/auth';
// import { User } from '../shared/user.class';
// import { AnyMxRecord } from 'dns';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLogged: any = false;
  private token = '';
  private correo = '';

  constructor(private storage: Storage) {
    this.storage
      .get('idToken')
      .then((val) => {
        this.token = val === null ? '' : val;
      })
      .catch((err) => {
        this.token = '';
      });
  }

  public getToken() {
    return this.token;
  }

  public setToken(val: string) {
    this.token = val;
    this.storage.set('idToken', val);
  }

  public setCorreo(val: string) {
    this.correo = val;
    this.storage.set('correo', val);
  }

  public getCorreo(){
    return this.correo;
  }

  public setLogin() {
    this.isLogged = true;
  }

  public isLoggedIn() {
    return this.isLogged;
  }

  public logout(){
    this.token = '';
    this.storage.set('idToken', '');
    this.storage.set('correo', '');
  }
  /*
  async onLogin(user:User){
    try{
      return await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
    } catch (error){
      console.log('Error on login', error);
    }

  }

  async onRegister(user:User){
    try {
      return await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
    } catch (error) {
      console.log('Error on register', error);
    }
  }*/
}
