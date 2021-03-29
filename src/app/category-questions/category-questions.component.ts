import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataService} from '../services/data.service';
import {Question} from '../interfaces/question';
import {Router} from '@angular/router';

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
  currnetId: string;
  @Input() oneQuestion: Question;

  @Input() categoryName: string;

  @Output() onUpdateQuestion = new EventEmitter<Question>();

  constructor(private dataService: DataService, private router: Router) {
  }

  ngOnInit(): void {
    this.dataService.getAllQuestionsForCategory().subscribe(questions => {
      this.questions = questions;
      console.log(questions[this.currentQuestion]._id);
      questions.forEach(function (item, index) {
        console.log(item._id, index);
      });
    });
    this.randomQuestionNumber = Math.floor(Math.random() * this.questions.length - 1);
  }

  onAnswer(question: string) {
    setTimeout(() => {
      this.currentQuestion++;
      this.answerSelected = false;
    }, 1000);
    console.log(question);

    if (question[1] === 'true') {
      console.log(question[1]);
      this.correctAnswers++;
    } else {
      this.incorrectAnswers++;
    }
    this.answerSelected = true;
  }

  showResult() {
    this.result = true;
  }

  // tslint:disable-next-line:variable-name
  onEditQuestion() {
    console.log(this.questions[this.currentQuestion]._id);
    this.currnetId = this.questions[this.currentQuestion]._id;
    console.log(this.currnetId);
    this.oneQuestion = this.questions[this.currentQuestion];
    console.log(this.oneQuestion);
    this.onUpdateQuestion.emit(this.oneQuestion);
    this.dataService.setter(this.oneQuestion);
    this.router.navigate(['/edit-question']);
  }
}
