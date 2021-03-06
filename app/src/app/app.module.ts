import { UserdatalistPage } from './../pages/userdatalist/userdatalist';
import { ComponentsModule } from './../components/components.module';
import { ChatDetailPage } from './../pages/chat-detail/chat-detail';
import { AnswerPage } from './../pages/answer/answer';
import { DetailsPage } from './../pages/details/details';
import { QuestionPage } from './../pages/question/question';
import { HeadfacePage } from './../pages/headface/headface';
import { UserPage } from './../pages/user/user';
import { RestProvider } from './../providers/rest/rest';
import { RegisterPage } from './../pages/register/register';
import { LoginPage } from './../pages/login/login';
import { NotificationPage } from './../pages/notification/notification';
import { MorePage } from './../pages/more/more';
import { DiscoveryPage } from './../pages/discovery/discovery';
import { ChatPage } from './../pages/chat/chat';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';


import {HttpModule} from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { EmojiProvider } from '../providers/emoji/emoji';
import { ChatDetailProvider } from '../providers/chat-detail/chat-detail';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    NotificationPage,
    MorePage,
    DiscoveryPage,
    LoginPage,
    ChatPage,
    RegisterPage,
    UserPage,
    HeadfacePage,
    QuestionPage,
    DetailsPage,
    AnswerPage,
    ChatDetailPage,
    UserdatalistPage


  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    ComponentsModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    NotificationPage,
    MorePage,
    LoginPage,
    DiscoveryPage,
    ChatPage,
    RegisterPage,
    UserPage,
    HeadfacePage,
    QuestionPage,
    DetailsPage,
    
    AnswerPage,
    ChatDetailPage,
    UserdatalistPage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    RestProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    EmojiProvider,
    ChatDetailProvider

  ]
})
export class AppModule {}
