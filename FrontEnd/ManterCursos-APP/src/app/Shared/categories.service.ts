import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from './Category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(
    private http: HttpClient,
    router: Router) {
    this.router = router;
  }
  router: Router;


  formData: Category = new Category();
  readonly baseURL = 'https://localhost:44309/api/Category';

  CategoriesList: Category[] = [];


  refreshCategories() {
    this.http.get(this.baseURL)
      .toPromise()
      .then(res => {
        this.CategoriesList = res as Category[];
      });
  }

  addCategory(id:number){
    this.http.get(this.baseURL + "/" + id)
      .toPromise()
      .then(res => {
        this.CategoriesList.push(res as Category);
      });
  }

  postCategory() {
    return this.http.post(this.baseURL, this.formData);
  }

  putCategory() {
    return this.http.put(`${this.baseURL}/${this.formData.id}`, this.formData);
  }
  deleteCategory(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
