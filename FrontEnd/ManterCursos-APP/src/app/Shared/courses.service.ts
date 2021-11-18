import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from './Course.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CourseLog } from './CourseLog.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(
    private http: HttpClient,
    router: Router) {
    this.router = router;
  }
  router: Router;
  logData: CourseLog = new CourseLog();


  formData: Course = new Course();
  readonly baseURL = 'https://localhost:44309/api/Course';

  CoursesList: Course[] = [];

  refreshCourses() {
    this.http.get(this.baseURL)
      .toPromise()
      .then(res => {
        this.CoursesList = res as Course[];
        this.filteredCourses = res as Course[];
        this.ReOrder();
        this.ReOrder();
      });
  }

  postCourse() {
    return this.http.post(this.baseURL, this.formData);
  }

  putCourse() {
    return this.http.put(`${this.baseURL}/${this.formData.id}`, this.formData);
  }
  deleteCourse(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  postLog() {
    return this.http.post("https://localhost:44309/api/Log", this.logData);
  }
  getLogs(courseID: number){
    return this.http.get("https://localhost:44309/api/Log/" + courseID);
  }




  alertObj: AlertBody = new AlertBody('', '', [new LineItem('', '')]);
  resetAlert() {
    this.alertObj = new AlertBody('', '', [new LineItem('', '')]);
  }

  throwError(errorCode: number, courses?: Course[]) {
    switch (errorCode) {
      case 1:
        this.alertObj = Object.assign(new AlertBody(
          'Data de Início Inválida - Cod_01',
          'A data de início deve ser maior ou igual a data de hoje!', []));
        break;

      case 2:
        this.alertObj = Object.assign(new AlertBody(
          'Data de Término Inválida - Cod_02',
          'A data de término deve ser maior ou igual a data de início!', []));
        break;

      case 3:
        if (courses && courses.length > 0) {
          let foundText = courses!.length > 1 ?
            'Existem ' + courses!.length + ' cursos planejados ' :
            'Existe um curso planejado ';

          this.alertObj = Object.assign(new AlertBody(
            'Período indisponível - Cod_03',
            foundText + 'dentro do período informado:', []));

          courses!.forEach(course => {
            this.alertObj.lineItems.push(new LineItem('Curso: ', course.title));
            this.alertObj.lineItems.push(new LineItem('Data de Início: ', new Date(course.startingDate).toLocaleDateString()));
            this.alertObj.lineItems.push(new LineItem('Data de Término: ', new Date(course.endingDate).toLocaleDateString()));
            this.alertObj.lineItems.push(new LineItem('Essa Data end: ' + new Date(this.formData.endingDate),"data existente start: " + new Date(course.startingDate)));
            if (courses!.indexOf(course) != courses!.length - 1)
              this.alertObj.lineItems.push(new LineItem('divider', ''));
          });
        }
        else {
          this.alertObj = Object.assign(new AlertBody(
            'Período indisponível - Cod_03',
            'Existe(m) curso(s) planejado(s) no período informado.', []));
        }
        break;

      case 4:
        if (courses && courses.length > 0) {
          this.alertObj = Object.assign(new AlertBody(
            'Curso já cadastrado - Cod_04',
            'O curso informado já está cadastrado:', [
            new LineItem("Curso: ", courses![0].title),
            new LineItem("Descrição: ", courses![0].description)
          ]));
        }
        else {
          this.alertObj = Object.assign(new AlertBody(
            'Curso já cadastrado - Cod_04',
            'O curso informado já está cadastrado.', []));
        }
        break;

        case 5:
        this.alertObj = Object.assign(new AlertBody(
          'Curso já finalizado - Cod_05',
          'Não é possível excluir um curso já realizado.', []));
        break;
    }
  }





  /* Filter */

  public filteredCourses: Course[] = this.CoursesList;

  private ascending: boolean = true;
  private alpha: boolean = true;

  public setOrder(alpha: boolean) {
    this.alpha = alpha;
    this.ascending = false;
    this.ReOrder();
  }

  public ReOrder() {
    this.ascending = !this.ascending;

    if (this.ascending) {
      if (this.alpha) {
        document.getElementById("orderIcon")!.setAttribute("class","fas fa-sort-alpha-down");
        document.getElementById("orderLabel")!.innerText = " Titulo";

        this.filteredCourses.sort((a: any, b: any) => a.title.localeCompare(b.title));
      }
      else {
        document.getElementById("orderIcon")!.setAttribute("class","fas fa-sort-amount-down-alt");
        document.getElementById("orderLabel")!.innerText = " Início";

        this.filteredCourses.sort((n1: any, n2: any) => new Date(n1.startingDate).getTime() - new Date(n2.startingDate).getTime());
      }
    }
    else {
      if (this.alpha) {
        document.getElementById("orderIcon")!.setAttribute("class","fas fa-sort-alpha-down-alt");
        document.getElementById("orderLabel")!.innerText = " Titulo";

        this.filteredCourses.sort((a: any, b: any) => b.title.localeCompare(a.title));
      }
      else {
        document.getElementById("orderIcon")!.setAttribute("class","fas fa-sort-amount-down");
        document.getElementById("orderLabel")!.innerText = " Início";

        this.filteredCourses.sort((n1: any, n2: any) => new Date(n2.startingDate).getTime() - new Date(n1.startingDate).getTime());
      }
    }
  }

  private _SearchFilter: string = '';

  public get SearchFilter(): string {
    return this._SearchFilter;
  }

  public set SearchFilter(value: string) {
    this._SearchFilter = value;
    this.filteredCourses = this.SearchFilter ? this.Filter(this.SearchFilter) : this.CoursesList;
  }

  Filter(value: string): any {
    value = value.toLocaleLowerCase();

    return this.CoursesList.filter(
      (course: { title: string }) => course.title.toLocaleLowerCase().indexOf(value) !== -1
    );
  }
}

class AlertBody {
  title: string;
  subTitle: string;
  lineItems: LineItem[];

  constructor(title: string, subTitle: string, lineItems: LineItem[]) {
    this.title = title;
    this.subTitle = subTitle;
    this.lineItems = lineItems;
  }
}

class LineItem {
  label: string;
  content: string;

  constructor(label: string, content: string) {
    this.label = label;
    this.content = content;
  }
}

