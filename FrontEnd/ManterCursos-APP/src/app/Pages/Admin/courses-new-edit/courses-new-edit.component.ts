import { CategoriesService } from './../../../Shared/categories.service';
import { CoursesService } from './../../../Shared/courses.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Course } from 'src/app/Shared/Course.model';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'courses-NewEdit',
  templateUrl: './courses-new-edit.component.html',
  styleUrls: ['./courses-new-edit.component.css']
})
export class CoursesNewEditComponent implements OnInit {

  constructor(
    CourseService: CoursesService,
    CategoryService: CategoriesService,
    router: Router,
    datePipe: DatePipe,
    private toastr: ToastrService
  ) {
    this.router = router;
    this.CourseService = CourseService;
    this.CategoryService = CategoryService;
    this.datePipe = datePipe;
  }

  router: Router;
  public CourseService: CoursesService;
  public CategoryService: CategoriesService;
  datePipe: DatePipe;

  ngOnInit(): void {
    if (this.CourseService.formData.id != 0) {
      this.setEditForm();
    }
  }

  onSubmit(form: NgForm) {
    this.CourseService.formData.startingDate = this.formatDate(new Date(form.form.controls["startingDate"].value));

    this.CourseService.formData.endingDate = this.formatDate(new Date(form.form.controls["endingDate"].value));

    //Validação frontend #################################################
    let isValid = this.validateDates(
      new Date(this.CourseService.formData.startingDate),
      new Date(this.CourseService.formData.endingDate));

    if (!isValid) {
      return;
    }
    let duplicatedCourse = this.checkDuplicates();

    if (duplicatedCourse.id != 0) {
      this.CourseService.throwError(4, [duplicatedCourse]);
      return;
    }
    //####################################################################

    if (this.CourseService.formData.id == 0) {
      this.CourseService.postCourse().subscribe(
        (response: any) => {
          this.CourseService.logData.courseID = response.id;
          this.CourseService.logData.userID = 1;
          this.CourseService.logData.eventDate = new Date(new Date().setHours(0, 0, 0, 0));
          this.CourseService.logData.updatedFields = "initial";

          console.log(this.CourseService.logData);

          this.CourseService.postLog().subscribe(res => console.log(res), error => console.log(error));

          this.resetForm(form);
          console.log(response);
          this.toastr.success('Cadastro realizado com sucesso!', 'Manter Cursos');

          this.router.navigate(["/courses-list"]);
        },
        (err: any) => {
          console.log(err);

          if (err.error.errorCode) {
            this.CourseService.throwError(err.error.errorCode);
          }
        }
      );
    }
    else {
      let oldRegister = this.CourseService.CoursesList.find(c => c.id == this.CourseService.formData.id)!;
      let thisRegister = this.CourseService.formData;
      let updatedFields: string = "";

      console.log(oldRegister.startingDate);
      console.log(thisRegister.startingDate);

      if (oldRegister.title != thisRegister.title) {
        updatedFields += ";" + "Titulo";
      }
      this.CourseService.logData.eventDate = new Date(new Date().setHours(0, 0, 0, 0));
      if (oldRegister.categoryID != thisRegister.categoryID) {
        updatedFields += ";" + "Categoria";
      }
      if (new Date(oldRegister.startingDate).setHours(0, 0, 0, 0) != new Date(thisRegister.startingDate).setHours(0, 0, 0, 0)) {
        updatedFields += ";" + "Data de Inicio";
      }
      if (new Date(oldRegister.endingDate).setHours(0, 0, 0, 0) != new Date(thisRegister.endingDate).setHours(0, 0, 0, 0)) {
        updatedFields += ";" + "Data de Término";
      }
      if (oldRegister.studentsPerClass != thisRegister.studentsPerClass) {
        updatedFields += ";" + "Alunos por turma";
      }
      if (oldRegister.description != thisRegister.description) {
        updatedFields += ";" + "Descrição";
      }
      updatedFields.replace(';', '');

      if(updatedFields.length > 0){
        this.CourseService.putCourse().subscribe(
          (response: any) => {

            this.CourseService.logData.courseID = response.id;
            this.CourseService.logData.userID = 1;
            this.CourseService.logData.eventDate = new Date();
            this.CourseService.logData.updatedFields = updatedFields;

            console.log(this.CourseService.logData);

            this.CourseService.postLog().subscribe(res => console.log(res), error => console.log(error));



            this.resetForm(form);
            console.log(response);
            this.toastr.success('Atualização realizada com sucesso!', 'Manter Cursos');

            this.router.navigate(["/courses-list"]);
          },
          (err: any) => {
            console.log(err);

            if (err.error.errorCode) {
              this.CourseService.throwError(err.error.errorCode);
            }
          }
        );
      }
      else{
        this.toastr.warning('Nenhum campo foi alterado', 'Manter Cursos');
      }



    }
  }

  formatDate(date: Date): Date {
    return new Date(new Date(new Date(date).setDate(new Date(date).getDate() + 1)).setHours(0, 0, 0, 0));
  }

  validateDates(starting: Date, ending: Date): boolean {
    let today = new Date(new Date().setHours(0, 0, 0, 0));


    if (starting.getTime() < today.getTime()) {
      console.log("Inicio anterior a hoje");
      this.CourseService.throwError(1);
      return false;
    }

    if (ending.getTime() < starting.getTime()) {
      console.log("Término anterior ao inicio");
      this.CourseService.throwError(2);
      return false;
    }

    let overlappingCourses = this.checkSchedule(
      starting.getTime(),
      ending.getTime());

    if (overlappingCourses && overlappingCourses.length > 0) {
      console.log("Agenda ocupada");

      this.CourseService.throwError(3, overlappingCourses);
      return false;
    }

    return true;
  }

  checkSchedule(startingDate: number, endingDate: number): Course[] {
    let foundCourses: Course[] = this.CourseService.CoursesList.filter(c =>
      (new Date(c.startingDate).getTime() <= endingDate
        && new Date(c.endingDate).getTime() >= startingDate)
      && c.id != this.CourseService.formData.id);

    return foundCourses;
  }

  checkDuplicates(): Course {
    let course = this.CourseService.CoursesList.find(c =>
      (c.description.toLocaleLowerCase() == this.CourseService.formData.description.toLocaleLowerCase()
        || c.title.toLocaleLowerCase() == this.CourseService.formData.title.toLocaleLowerCase())
      && c.id != this.CourseService.formData.id);

    if (course && course != null) {
      return course;
    }
    else {
      return new Course();
    }
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.CourseService.formData = new Course();
  }

  setEditForm() {
    document.getElementById("newCourseLabel")!.innerText = "Editar Curso";
    document.getElementById("btnSubmit")!.innerText = "Salvar";
  }
}
