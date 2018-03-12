import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ToastController, } from 'ionic-angular';
import{BaseUI}  from '../../common/baseui';
import{RestProvider} from '../../providers/rest/rest';
import { ViewController } from 'ionic-angular';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage extends BaseUI{
  mobile:any;
  nickname:any;
  password:any;
  confirmpassword:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadCtrl:LoadingController,
    public toastCtrl:ToastController,
    public rest:RestProvider,
    public viewCtrl:ViewController) {
      super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  dismiss(){
    this.viewCtrl.dismiss();
  }
  goLogin(){
    this.navCtrl.pop();
  }
  doRegister(){
 //变单验证
 if(!(/^1\d{10}$/).test(this.mobile)){
  super.showToast(this.toastCtrl,"手机格式不正确");
}else if(this.password ===this.confirmpassword){
  var loading=super.showLoading(this.loadCtrl,"正在注册中...");
  this.rest.register(this.mobile,this.nickname,this.password)
  .subscribe(
    f=>{
      if(f["Status"]=="OK"){
        loading.dismiss();
        super.showToast(this.toastCtrl,"注册成功");
        this.dismiss();
      }else{
        loading.dismiss();
        super.showToast(this.toastCtrl,f["StatusContent"]);
      }
    },
    error=>{
      console.log(error);
    }
  )
  ;
}else{
  super.showToast(this.toastCtrl,"两次输入密码不同");
}


}
  }

