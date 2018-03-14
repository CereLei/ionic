import { Component } from '@angular/core';

/**
 * Generated class for the AnswerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'answer',
  templateUrl: 'answer.html'
})
export class AnswerComponent {

  text: string;

  constructor() {
    console.log('Hello AnswerComponent Component');
    this.text = 'Hello World';
  }

}
