import { Component, OnInit } from '@angular/core';
import {Category} from '../interfaces/category';
import {DataService} from '../services/data.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
categories: Category[] = [];
category = '';
  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
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
