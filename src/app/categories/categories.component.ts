import { Component, OnInit } from '@angular/core';
import {Category} from '../interfaces/category';
import {DataService} from '../services/data.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
categories: Category[] = [];

currentCategory = 0;
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getCategories().subscribe(categories => {
      this.categories = categories;
      // console.log(categories);
    });
  }
}
