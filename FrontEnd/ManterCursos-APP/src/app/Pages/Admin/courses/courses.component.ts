import { CoursesService } from './../../../Shared/courses.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'courses-list',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  constructor(CourseService: CoursesService)
  {
    this.CourseService = CourseService;
  }

  CourseService: CoursesService;

  ngOnInit(): void {
  }

}
