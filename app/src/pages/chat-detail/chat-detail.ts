import { ChatDetailProvider,ChatMessage } from './../../providers/chat-detail/chat-detail';
import { RestProvider } from './../../providers/rest/rest';

import { IonicPage, NavController, Content, TextInput, NavParams, LoadingController, ToastController  } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import{ BaseUI} from '../../common/baseui';
import { Component, ViewChild } from '@angular/core';

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
  messageList: ChatMessage[] = [];
  errorMessage: any;
  editorMessage: string;
  @ViewChild(Content) content: Content; //全局的 content
  @ViewChild('chatInput') messageInput: TextInput; //获取前台的输入框
  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public rest: RestProvider,
     public storage: Storage,
     public event: Events,
     public loadingCtrl:LoadingController,
     public toastCtrl:ToastController,
     public chatService: ChatDetailProvider
    ) {
       super();
       this.chatUserId=navParams.get('userid');
       this.chatUserName=navParams.get('username');
       console.log(this.chatUserId+'----------'+this.chatUserName);
  }
  ionViewWillLeave() {
    //进行事件的取消订阅
    this.event.unsubscribe('chat.received');
  }
  ionViewDidEnter(){
    this.storage.get('UserId').then((val)=>{
      if(val!=null){
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
        super.showToast(this.toastCtrl,"请先登录")
      }
    })
    this.getMessages()
    .then(() => {
      this.scrollToBottom();
    });
        //听取消息的发布，订阅
        this.event.subscribe('chat.received', (msg, time) => {
          this.messageList.push(msg);
          this.scrollToBottom();
        })
  }
    /**
   * 调用 service 里面的方法进行属性的赋值
   * 
   * @returns 
   * @memberof ChatdetailsPage
   */
  getMessages() {
    return this.chatService.getMessageList()
      .then(res => {
        this.messageList = res;
      })
      .catch(error => {
        console.error(error);
      })
  }
  scrollToBottom(): any {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
    }, 400);
  }
//表情切换
  switchEmojiPicker(){
    this.isOpenEmojiPicker = !this.isOpenEmojiPicker;
  }
  //发送消息
  sendMessage(){
    if(!this.editorMessage.trim()){
      return;
    }else{
      const id = Date.now().toString();
      let messageSend: ChatMessage = {
        messageId: id,
        userId: this.userId,
        username: this.userName,
        userImgUrl: this.userImgUrl,
        toUserId: this.chatUserId,
        time: Date.now(),
        message: this.editorMessage,
        status: 'pending'
      }
      this.messageList.push(messageSend);
      this.scrollToBottom();
  
      this.editorMessage = '';
  
      if (!this.isOpenEmojiPicker) {
        this.messageInput.setFocus();
      }
          //发送消息并改变消息的状态
    this.chatService.sendMessage(messageSend)
    .then(() => {
      let index = this.getMessageIndex(id);
      if (index !== -1) {
        this.messageList[index].status = 'success';
      }
    });
    }
  }
  getMessageIndex(id: string) {
    return this.messageList.findIndex(e => e.messageId === id);
  }
  focus(){
    this.isOpenEmojiPicker = false;
    this.content.resize();
    this.scrollToBottom();
  }
}
