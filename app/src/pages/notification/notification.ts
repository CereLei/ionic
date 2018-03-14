import { DetailsPage } from './../details/details';
import { RestProvider } from './../../providers/rest/rest';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, LoadingController, ToastController } from 'ionic-angular';
import { BaseUI } from '../../common/baseui';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage extends BaseUI{
  errorMessage: any;
  notificationList: string[];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public loadCtrl: LoadingController,
    public rest: RestProvider,
    public toastCtrl: ToastController,
    public storage: Storage
  ) {
    super();
  }

  ionViewDidLoad() {
   this.storage.get('UserId').then((val)=>{
     if(val !=null){
       var loading=super.showLoading(this.loadCtrl,"加载中..");
       this.rest.getUserNotifications(val)
       .subscribe(
        n=>{
         
          this.notificationList=n;
          loading.dismissAll();
        },
        error=>this.errorMessage=<any>error
        
      )
     }
   })
  }
  gotoDetails(questionId){
    this.navCtrl.push(DetailsPage,{id:questionId})
  }
}
