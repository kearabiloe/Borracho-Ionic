import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ChatsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({segment:"chats"})
@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html',
})
export class ChatsPage {
	chatsSegment: any = 'unread';
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatsPage');
  }

  openChatDetail(chat){
  	this.navCtrl.push('ChatDetailPage', {
      id: chat
    });
  }

  openProfile(profile){
  	this.navCtrl.push('ProfilePage', {id: profile});
  }  
}
