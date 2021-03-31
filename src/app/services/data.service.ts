
import {Injectable, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Category} from '../interfaces/category';
import {Observable} from 'rxjs';
import {Question} from '../interfaces/question';
import {User} from '../interfaces/user';
import {JwtHelperService} from '@auth0/angular-jwt';



@Injectable({
  providedIn: 'root'
})
export class DataService {
  private user = '';
  private objectId = '';
  private question: Question;
  private permission = '';
  public helper: JwtHelperService = new JwtHelperService();
  category = '';

  backendUrl = 'http://localhost:3000';

  httpOptions;
  httpOptionsText;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    this.httpOptionsText = {
      headers: new HttpHeaders({ 'Content-Type': 'application/text'})
    };
  }
  login(login: string, password: string) {
    const url = this.backendUrl + '/user/login';
    return this.http.post<User>(url, {login, password}, this.httpOptions);
  }

  // isValidToken() {
  //   let token = this.userService.getToken();
  //   if (token === '') {
  //     token = 'na';
  //   }
  //   const url = this.backendlessUrl + '/isvalidusertoken/' + token;
  //   return this.http.get<any>(url, this.httpOptions);
  // }

  // logout() {
  //   const url = this.backendUrl + '/user/logout';
  //   return this.http.get<any>(url, this.httpOptionsText);
  // }


  getCategories(): Observable<Category[]> {
    const url = this.backendUrl + '/categories/';
    return this.http.get<Category[]>(url);
  }

  getAllQuestions(): Observable<Question[]> {
    const url = this.backendUrl + '/questions';
    return this.http.get<Question[]>(url);
  }
  getAllCategories(category: string): Observable<Question[]> {
    const url = this.backendUrl + '/questions/category/' + category;
    return this.http.get<Question[]>(url);
  }
  getAllQuestionsForCategory(category: string): Observable<Question[]> {
    const url = this.backendUrl + '/questions/category/' + category ;
    return this.http.get<Question[]>(url);
  }
  getUserName(): string {
    if (localStorage.getItem('user')) {
      return localStorage.getItem('user');
    }
    return this.user;
  }

  /**
   * Sets the login of the user
   * @param name
   */
  setUserName(name: string) {
    localStorage.setItem('user', name);
    this.user = name;
  }

  // User objectId needed for setting relations in notifications component
  getUserId(): string {
    if (localStorage.getItem('objectId')) {
      return localStorage.getItem('objectId');
    }
    return this.objectId;
  }
  setUserId(_id: string) {
    localStorage.setItem('objectId', _id);
    this.objectId = _id;
  }

  /**
   * Returns the user token
   */
  getToken(): string {
    if (localStorage.getItem('token')) {
      return localStorage.getItem('token');
    }
    return '';
  }
  isTokenValid() {
    const token = localStorage.getItem("token");
    return this.helper.isTokenExpired(token);
  }
  /**
   * Sets the user token
   *
   * @param token
   */
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  resetStorage() {
    this.setToken('');
    this.setUserName('');
  }
  setter(question: Question) {
    this.question = question;
  }
  getter() {
    return this.question;
  }
  setCategory(category: string) {
    this.category = category;
  }
  getCategory(){
    return this.category;
  }
  getUserPermission(): string {
    if (localStorage.getItem('permission')) {
      return localStorage.getItem('permission');
    }
    return this.user;
  }

  /**
   * Sets the login of the user
   * @param permission
   */
  setUserPermission(permission: string) {
    localStorage.setItem('permission', permission);
    this.permission = permission;
  }
  // updateQuestion(question: Question): Observable<any> {
  //   const url = this.backendUrl + '/questions/' + question._id;
  //   return this.http.patch<User>(url, [{question}]);
  //
  // }
  updateQuestion(question: Question): Observable<any> {
    const url = this.backendUrl + '/questions/' + question._id;
    return this.http.patch<User>(url, JSON.stringify([{'propQuestion': 'question', 'value': question.question},
      {'propQuestion': 'questionCategory', 'value': question.questionCategory},
      {'propQuestion': 'answers', 'value': question.answers}]), this.httpOptions);
  }
}
