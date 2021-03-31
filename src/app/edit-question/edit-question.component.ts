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
    this.questionForm = this.fb.group({
      objectId: [],
      question: [],
      answers1: [],
      isTrue1: [],
      answers2: [],
      isTrue2: [],
      answers3: [],
      isTrue3: []
    });
  }
  save() {
    const question = this.question;
    this.dataService.updateQuestion(question).subscribe(response => {
      this.question = response;
      this.router.navigate(['/questions']);
    });
  }

  close() {
    this.router.navigate(['/questions']);
  }

  submitForm() {
  }

  // showEditForm(objectId: string) {
  //   console.log(objectId);
  //
  // }
}
