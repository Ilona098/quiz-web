import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Category} from '../interfaces/category';
import {Observable, Subject} from 'rxjs';
import {Question} from '../interfaces/question';
import {User} from '../interfaces/user';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private user = '';
  private objectId = '';
  private question: Question;

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
  getAllQuestionsForCategory(): Observable<Question[]> {
    const url = this.backendUrl + '/questions/category/Math';
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
   * @param login
   */
  setUserName(login: string) {
    localStorage.setItem('user', login);
    this.user = login;
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
    if (localStorage.getItem('user-token')) {
      return localStorage.getItem('user-token');
    }
    return '';
  }

  /**
   * Sets the user token
   *
   * @param token
   */
  setToken(token: string) {
    console.log('I am here:' + token);
    localStorage.setItem('user-token', token);
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
