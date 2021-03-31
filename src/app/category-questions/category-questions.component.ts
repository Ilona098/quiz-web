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
  premission: string;
  nbQuestion = 0;
  @Input() oneQuestion: Question;
  @Input() categoryName: string;
  @Output() onUpdateQuestion = new EventEmitter<Question>();
  currentCategory: string;

  constructor(private dataService: DataService, private router: Router) {
  }

  ngOnInit(): void {
    this.currentCategory = this.dataService.getCategory();
    this.dataService.getAllQuestionsForCategory(this.currentCategory).subscribe(questions => {
      this.questions = questions;
      // console.log(questions[this.currentQuestion]._id);
      // questions.forEach(function (item, index) {
        // console.log(item._id, index);
      // });
      // this.userLogin = this.dataService.getUserName();
      console.log('hi I am in login component ' + this.dataService.getUserName());
    });
    this.randomQuestionNumber = Math.floor(Math.random() * this.questions.length - 1);
    this.premission = this.dataService.getUserPermission();
    console.log(this.premission);
  }

  onAnswer(question: string) {
    // setTimeout(() => {
      // this.currentQuestion++;
    //   this.answerSelected = false;
    // }, 500);
    // console.log(question);

    if (question[1] === 'true') {
      this.correctAnswers++;
    } else {
      this.incorrectAnswers++;
    }
    // this.answerSelected = true;
  }
  onNext() {
    this.currentQuestion++;
  }

  showResult() {
    this.result = true;
  }
  showAllQuizzes() {
    this.router.navigate(['/categories']);
  }

  // tslint:disable-next-line:variable-name
  onEditQuestion() {
    // console.log(this.questions[this.currentQuestion]._id);
    this.currnetId = this.questions[this.currentQuestion]._id;
    // console.log(this.currnetId);
    this.oneQuestion = this.questions[this.currentQuestion];
    // console.log(this.oneQuestion);
    this.onUpdateQuestion.emit(this.oneQuestion);
    this.dataService.setter(this.oneQuestion);
    this.router.navigate(['/edit-question']);
  }
}
