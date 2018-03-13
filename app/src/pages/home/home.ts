import { DetailsPage } from './../details/details';
import { QuestionPage } from './../question/question';
import { RestProvider } from './../../providers/rest/rest';
import { Component } from '@angular/core';
import { NavController,Tabs, ModalController, LoadingController } from 'ionic-angular';
import{BaseUI }from "../../common/baseui";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage  extends BaseUI{
  feeds:string[];
  errorMessage:string;
  constructor(
    public navCtrl: NavController,
    public modalCtrl:ModalController,
    public loadingCtrl:LoadingController,
    public rest:RestProvider) {
      super();
  }
  ionViewDidLoad(){
    this.getFeeds();
  }
  getFeeds(){
    var loading=super.showLoading(this.loadingCtrl,"加载中..");
    this.rest.getFeeds()
    .subscribe(
      f=>{
        this.feeds=f;
        loading.dismiss();
      },
      error=>this.errorMessage=<any>error
    )
  }
  //tabs切换方法
  selectTab(index:number){
    var t:Tabs=this.navCtrl.parent;
    t.select(index);
  }
  //跳转到聊天界面
  gotoChat(){
    this.selectTab(2)
  }
   //跳转到问题界面
  gotoQuestion(){
    debugger;
    var modal=this.modalCtrl.create(QuestionPage);
    modal.present();
  }
//跳转到问题详情
  gotoDetails(Id){
    //页面传递参数
    this.navCtrl.push(DetailsPage,{id:Id})
  }
  
}
