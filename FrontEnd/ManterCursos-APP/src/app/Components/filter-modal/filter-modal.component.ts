import { CoursesService } from 'src/app/Shared/courses.service';
import { NgForm } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.css']
})
export class FilterModalComponent implements OnInit {

  constructor(CourseService: CoursesService) {
    this.CourseService = CourseService;
   }

   CourseService: CoursesService;

  ngOnInit(): void {
  }

  startingDate!: Date;
  endingDate!: Date;

  @Input() set dataObj(value: number) {
    (<HTMLInputElement>document.getElementById("btnFilter")).click();
  }

  onSubmit(form: NgForm){
    console.log("submitted");
    let starting = form.controls["startingFilter"].value;
    let ending = form.controls["endingFilter"].value;



    if(starting && starting.length && ending && ending.length){
      console.log("starting and ending");
      this.CourseService.filteredCourses =
      this.CourseService.CoursesList.filter(c => new Date(c.startingDate) >= new Date(starting)
      && new Date(c.startingDate).setDate(new Date(c.startingDate).getDate()-1) <= new Date(ending).getTime());
      return;
    }

    if(starting && starting.length){
      console.log(starting);
      this.CourseService.filteredCourses =
      this.CourseService.CoursesList.filter(c => new Date(c.startingDate) >= new Date(starting));
    }
    else{
      console.log("No starting");
    }

    if(ending && ending.length){
      console.log(ending);
      this.CourseService.filteredCourses =
      this.CourseService.CoursesList.filter(c => new Date(c.startingDate) <= new Date(ending));
    }
    else{
      console.log("No ending");
    }
  }

  clear(form: NgForm){
    form.resetForm();
    this.CourseService.filteredCourses = this.CourseService.CoursesList;
  }
}
