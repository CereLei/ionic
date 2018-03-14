import { DetailsPage } from './../details/details';
import { RestProvider } from './../../providers/rest/rest';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { BaseUI } from "../../common/baseui";
/**
 * Generated class for the DiscoveryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-discovery',
  templateUrl: 'discovery.html',
})
export class DiscoveryPage extends BaseUI{
  questions:string[];
  errorMessage:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public rest: RestProvider

    ) {
      super();
  }

  ionViewDidLoad() {
    this.getQuestions();
  }
  getQuestions(){
    var loading=super.showLoading(this.loadingCtrl,"加载中..");
    this.rest.getQuestions()
    .subscribe(
      q=>{
        this.questions=q;
        loading.dismiss();
      },
      error=>this.errorMessage=<any>error
    )
  }
  //加载请求
  doRefresh(e){
    this.getQuestions();
    setTimeout(function() {
      e.complete();
    }, 2000);
  }
  

  //当个问题的点击
  gotoDetails(Id){
    this.navCtrl.push(DetailsPage,{id:Id})
  }
}
