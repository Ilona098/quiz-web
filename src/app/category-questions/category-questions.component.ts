import {Component, Input, OnInit} from '@angular/core';
import {DataService} from '../services/data.service';
import {Question} from '../interfaces/question';

@Component({
  selector: 'app-category-questions',
  templateUrl: './category-questions.component.html',
  styleUrls: ['./category-questions.component.css']
})
export class CategoryQuestionsComponent implements OnInit {
questions: Question[] = [];
currentQuestion = 0;
answerSelected = false;
correctAnswers = 0;
incorrectAnswers = 0;
result = false;
randomQuestionNumber: number;

@Input() categoryName: string;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getAllQuestionsForCategory().subscribe(questions => {
      this.questions = questions;
    });
    this.randomQuestionNumber = Math.floor(Math.random() * this.questions.length - 1);
  }
onAnswer(question: string) {
    setTimeout(() => {
      this.currentQuestion++;
      this.answerSelected = false;
    }, 1000);

    if (question[1] === 'true') {
      console.log(typeof(question[1]));
      this.correctAnswers++;
    } else {
      this.incorrectAnswers++;
    }
    this.answerSelected = true;
}
showResult() {
    this.result = true;
}
}
