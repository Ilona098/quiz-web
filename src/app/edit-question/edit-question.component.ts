import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Question} from '../interfaces/question';
import {DataService} from '../services/data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})
export class EditQuestionComponent implements OnInit {
  questionForm: FormGroup;
  @Input() _id: string;
  @Input() question?: Question;
  @Input() questions: Question;
  editedItemIndex;

  constructor(private fb: FormBuilder, private dataService: DataService, private router: Router) {
  }

  ngOnInit(): void {
    this.question = this.dataService.getter();
    console.log('ilona' + this.question);
    console.log(this.question._id);
    console.log(this.question.answers[0]);
    this.questionForm = this.fb.group({
      objectId: [],
      question: [],
      answers1: [],
      answers2: [],
      answers3: []
    });
  }

  //
  // mapQuestionToForm(question: Question) {
  //   this.questionForm.get('objectId').setValue(question._id);
  //   this.questionForm.get('question').setValue(question.question);
  //   this.questionForm.get('answers1').setValue(question.answers[0]);
  //   this.questionForm.get('answers2').setValue(question.answers[1]);
  //   this.questionForm.get('answers3').setValue(question.answers[2]);
  // }

  save() {
    // const question = this.questionForm.value.question;
    // const answers1 = [this.questionForm.value.answers[0]];
    // console.log(this.question);
    const question = this.question;
    this.dataService.updateQuestion(question).subscribe(response => {
      this.question = response;
    });
  }

  close() {
  }

  submitForm() {
    //
  }

  showEditForm(objectId: string) {
    console.log(objectId);

  }
}
