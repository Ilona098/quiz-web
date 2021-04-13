import {Component, Input, OnInit} from '@angular/core';
import {Category} from '../interfaces/category';
import {DataService} from '../services/data.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Question} from '../interfaces/question';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  category = '';
  permission: string;

  constructor(private dataService: DataService, private router: Router, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.permission = this.dataService.getUserPermission();
    this.dataService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  onSelected(category: string) {

    // this.dataService.getAllCategories((category)).subscribe(response => {
    //   console.log(JSON.stringify(response));
    this.category = category;
    this.dataService.setCategory(this.category);
    if (this.category !== '') {
      this.router.navigate(['/questions']);
    }
    // });
  }
}
