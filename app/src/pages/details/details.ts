import { RestProvider } from './../../providers/rest/rest';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ModalController, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import{BaseUI} from '../../common/baseui';
/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage extends BaseUI{
  storeVal:boolean;
  id: string;
  userId: string;
  question: string[];
  answers: string[];
  errorMessage: any;
  isFavourite: boolean;
  isMyQuestion: boolean;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl:LoadingController,
    public rest:RestProvider,
    public storage:Storage,
    public toastCtrl:ToastController,
    public modalCtrl:ModalController,
  public viewCtrl:ViewController) {
      super();
   
  }

  ionViewDidLoad() {
    this.id=this.navParams.get('id');
    this.loadQuestion(this.id);
  }
  loadQuestion(id:any){

    var loading=super.showLoading(this.loadingCtrl,"加载中..");
    this.storage.get('UserId')
    .then((val)=>{
      if(val!==null){
        this.storeVal=true;
        this.userId=val;
        this.rest.getQuestionWithUser(id,val)
        .subscribe(
          q=>{
            this.question=q;
            this.isFavourite=q['isFavourite'];
            console.log('this.isFavourite',this.isFavourite);
            this.answers=q["Answers"];
            this.isMyQuestion=(q["OwnUserId"] == val)
            loading.dismissAll();
          },
          error=>this.errorMessage=<any>error
        )
      }else{
        this.storeVal=false;
      }
    })
  }
  //关注问题
  saveFavourite(){
    var loading=super.showLoading(this.loadingCtrl,"加载中...")
    this.rest.saveFavourite(this.id,this.userId)
    .subscribe(
      f => {
        if (f["Status"] == "OK") {
          loading.dismiss();
          super.showToast(this.toastCtrl, this.isFavourite ? "取消关注成功。" : "关注问题成功。");
          this.isFavourite = !this.isFavourite;
        }
      },
      error => this.errorMessage = <any>error
    )
  }
  //关闭窗口
  dismiss(){
    this.viewCtrl.dismiss();
  }
}
