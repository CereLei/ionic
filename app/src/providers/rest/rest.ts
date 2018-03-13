
import { Http,Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  constructor(public http: Http) {
   
  }
    //feed
    private apiUrlFeeds = 'https://imoocqa.gugujiankong.com/api/feeds/get';
    
      //account
      private apiUrlRegister = 'https://imoocqa.gugujiankong.com/api/account/register';
      private apiUrlLogin = 'https://imoocqa.gugujiankong.com/api/account/login';
      private apiUrlUserInfo = 'https://imoocqa.gugujiankong.com/api/account/userinfo';
      private apiUrlUpdateNickName = 'https://imoocqa.gugujiankong.com/api/account/updatenickname';
  private apiUrlQuestionList = 'https://imoocqa.gugujiankong.com/api/question/list?index=1&number=10';
      private apiUrlQuestionSave = 'https://imoocqa.gugujiankong.com/api/question/save';
      private apiUrlGetQuestion = "https://imoocqa.gugujiankong.com/api/question/get";
      private apiUrlGetQuestionWithUser = "https://imoocqa.gugujiankong.com/api/question/getwithuser";
      private apiUrlSaveFavourite = "https://imoocqa.gugujiankong.com/api/question/savefavourite";
      private apiUrlAnswer = "https://imoocqa.gugujiankong.com/api/question/answer";
      private apiUrlUserNotifications = "https://imoocqa.gugujiankong.com/api/account/usernotifications";
      private apiGetUserQuestionList = "https://imoocqa.gugujiankong.com/api/account/getuserquestionlist";
      login(mobile, password): Observable<string[]> {
        return this.getUrlReturn(this.apiUrlLogin + "?mobile=" + mobile + "&password=" + password);
      } 
        //注册
  register(mobile, nickname, password): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlRegister + "?mobile=" + mobile + "&nickname=" + nickname + "&password=" + password)
  }
    //获取用户信息
    getUserInfo(userId): Observable<string[]> {
      return this.getUrlReturn(this.apiUrlUserInfo + "?userid=" + userId);
    }
      //更新
  updateNickName(userId, nickname): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlUpdateNickName + "?userid=" + userId + "&nickname=" + nickname);
  }
     //获取用户信息
 
  /**
   * 
   * 全局获取HTTP请求方法
   * @private
   * @param {string} url 
   * @returns {Observable<string[]>} 
   * @memberof RestProvider
   */
  private getUrlReturn (url:string):Observable<string[]>{
    return this.http.get(url)
    .map(this.extractDate)
    .catch(this.handleError);

  }
  private extractDate(res:Response){
    let body=res.json();
    return JSON.parse(body)||{}
  }
  private handleError(error:Response|any){
    let errMsg:string;
    if(error instanceof Response){
      const body=error.json() || '';
      const err=body.error || JSON.stringify(body);
      errMsg=`${error.status}-${error.statusText||''}--${err}`
    }else{
      errMsg=error.message?error.message:error.toString();
    }
    console.log(errMsg);
    return Observable.throw(errMsg);
  }
}
