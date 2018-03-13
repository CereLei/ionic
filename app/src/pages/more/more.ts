import { UserPage } from './../user/user';
import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { IonicPage,ModalController, NavController, NavParams } from 'ionic-angular';
import { Storage} from '@ionic/storage';
import{ BaseUI} from '../../common/baseui';
import{ RestProvider} from '../../providers/rest/rest';
import {LoadingController, ToastController } from 'ionic-angular';

/**
 * Generated class for the MorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage extends BaseUI{
  public notLogin:boolean=true;
  public logined:boolean=false;
  headface:string;
  userinfo: string[];
  selectedTheme: string;
  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public modalCtrl: ModalController,
     public storage:Storage,
     public loadingCtrl :LoadingController,
     public ToastCtrl:ToastController,
   public rest:RestProvider,) {
       super();
  }

  ionViewDidLoad() {
   this.loadUserPage();
  }
  loadUserPage(){
    this.storage.get('UserId').then((val)=>{
      if(val!=null){
        var loading = super.showLoading(this.loadingCtrl, "加载中...");
        this.rest.getUserInfo(val)
        .subscribe(
        userinfo => {
          this.userinfo = userinfo;
          this.headface = userinfo["UserHeadface"] + "?" + (new Date()).valueOf();
          this.notLogin = false;
          this.logined = true;
          loading.dismiss();
        },
        error=>{
          console.log("cuow");
        }
        );
      }else{
        this.notLogin=true;
        this.logined=false;
      }
    })
  }
  showModal(){
    let modal =this.modalCtrl.create(LoginPage);
    modal.present();
  }
  gotoUserPage(){
    this.navCtrl.push(UserPage);
  }
}
