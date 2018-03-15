import { RestProvider } from './../../providers/rest/rest';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController  } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import{ BaseUI} from '../../common/baseui';
/**
 * Generated class for the ChatDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat-detail',
  templateUrl: 'chat-detail.html',
})
export class ChatDetailPage  extends BaseUI{
  chatUserName: string;
  chatUserId: string;
  userId: string;
  userName: string;
  userImgUrl: string;
  isOpenEmojiPicker = false;
  //messageList: ChatMessage[] = [];
  errorMessage: any;
  editorMessage: string;
  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public rest: RestProvider,
     public storage: Storage,
     public event: Events,
     public loadingCtrl:LoadingController,
     public toastVtrl:ToastController
    ) {
       super();
       this.chatUserId=navParams.get('userid');
       this.chatUserName=navParams.get('username');
       console.log(this.chatUserId+'----------'+this.chatUserName);
  }

  ionViewDidEnter(){
    this.storage.get('UserId').then((val)=>{
      if(!val==null){
        this.rest.getUserInfo(val)
        .subscribe(
          userinfo=>{
            this.userId='140000198202211138',
            this.userName = userinfo["UserNickName"];
            this.userImgUrl = userinfo["UserHeadface"] + "?" + (new Date()).valueOf();
          },
          error => this.errorMessage = <any>error
        )
      }else{
        
      }
    })
  }
  
//表情切换
  switchEmojiPicker(){
    this.isOpenEmojiPicker = !this.isOpenEmojiPicker;
  }
}
