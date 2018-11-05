import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

// Parse
import { Parse } from 'parse';

// Constants
import { ENV } from '../../app/app.constant';

export class User {
  public id: string;
  public name: string;
  public email: string;
  public phone: string;
  public onWhatsapp: boolean;
  public isAgent: boolean;
}

@Injectable()
export class AuthProvider {
  private parseAppId: string = ENV.parseAppId;
  private parseServerUrl: string = ENV.parseServerUrl;

  constructor() {
    this.parseInitialize();
    console.log('Initiated Auth');
  }

  public signin(username: string, password: string): Observable<boolean> {
    return new Observable((observer) => {
      Parse.User.logIn(username, password).then((user)=>{
          observer.next(true);
          observer.complete();
      }).catch(error => {
          console.error(error);
          observer.error(error);
          observer.complete();        
      });
    });
  }


  public signup(account: any): Observable<boolean> {
    return new Observable((observer) => {
      setTimeout(() => {
      var user = new Parse.User();
      user.set('name', account.name);
      user.set('username', account.username);
      user.set('password', account.password);
      user.set('phone', account.phone);
      user.set('onWhatsapp', account.onWhatsapp);

      user.signUp(null).then((user) => {
          console.log("signup successfull");
          observer.next(true);
          observer.complete();
        }).catch(error => {
          console.error(error);
          observer.error(error);
          observer.complete();        
      })}, 500);
    });
  }

  public signout(): Observable<boolean> {
    return new Observable((observer) => {
      Parse.User.logOut().then(() => observer.next(true));
    });
  }

  public currentUser(): User {
    let u = Parse.User.current();
    if (u) {
      var user = new User();
      user.id = u.id;
      user.name = u.get('username');
      user.email = u.get('email');
      user.phone = u.get('phone');
      user.onWhatsapp = u.get('onWhatsapp');
      user.isAgent = u.get('isAgent')
      return user;
    }
    return null
  }

  public authenticated(): boolean {
    return this.currentUser() !== null;
  }

  private parseInitialize() {
    Parse.initialize(this.parseAppId);
    Parse.serverURL = this.parseServerUrl;
  }

}
