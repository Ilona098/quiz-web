import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CategoryQuestionsComponent} from './category-questions/category-questions.component';
import {CategoriesComponent} from './categories/categories.component';
import {LoginComponent} from './login/login.component';
import {EditQuestionComponent} from './edit-question/edit-question.component';



const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'questions', component: CategoryQuestionsComponent},
  {path: 'categories', component: CategoriesComponent},
  {path: 'edit-question', component: EditQuestionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
