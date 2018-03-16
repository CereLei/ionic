import { IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { AnswerComponent } from './answer/answer';
import { EmojipickerComponent } from './emojipicker/emojipicker';
import { QuestionListComponent } from './question-list/question-list';
@NgModule({
	declarations: [AnswerComponent,
    EmojipickerComponent,
    QuestionListComponent],
	imports: [IonicPageModule .forChild(EmojipickerComponent)],
	exports: [AnswerComponent,
	EmojipickerComponent,
    QuestionListComponent]
	
})
export class ComponentsModule {}
