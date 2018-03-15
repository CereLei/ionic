import { IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { AnswerComponent } from './answer/answer';
import { EmojipickerComponent } from './emojipicker/emojipicker';
@NgModule({
	declarations: [AnswerComponent,
    EmojipickerComponent],
	imports: [IonicPageModule .forChild(EmojipickerComponent)],
	exports: [AnswerComponent,
	EmojipickerComponent]
	
})
export class ComponentsModule {}
