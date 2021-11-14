import { CoursesNewEditComponent } from './Pages/Admin/courses-new-edit/courses-new-edit.component';
import { CoursesComponent } from './Pages/Admin/courses/courses.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: "courses-list",component: CoursesComponent},
  {path: "courses-NewEdit", component: CoursesNewEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
