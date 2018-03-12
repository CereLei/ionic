import { RegisterPage } from './../register/register';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, LoadingController, ToastController } from 'ionic-angular';
import{ BaseUI} from '../../common/baseui';
import{ RestProvider} from '../../providers/rest/rest';
import { Storage} from '@ionic/storage';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends BaseUI{
  mobile:any;
  password:any;
  errorMessage:any;
  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public viewCtrl:ViewController,
    public loadingCtrl :LoadingController,
    public ToastCtrl:ToastController,
  public rest:RestProvider,
  public storage:Storage) {
       super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  dismiss(){
    this.viewCtrl.dismiss();
  }
  login(){
    var loading=super.showLoading(this.loadingCtrl,"登陆中");
    this.rest.login(this.mobile,this.password)
    .subscribe(
      f=>{
        if(f["Status"]=="OK"){
          
          //处理成功登陆
          //也可以存储接口返回的token
          this.storage.set('UserId',f["UserId"]);
          loading.dismiss();
          this.dismiss();
        }else{
          loading.dismiss();
          super.showToast(this.ToastCtrl,f['StatusContent']);
        }
      },
      error=>this.errorMessage=<any>error
    )
  }
  register(){
    this.navCtrl.push(RegisterPage)
  }
}
