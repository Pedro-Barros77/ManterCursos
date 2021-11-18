import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoursesComponent } from './Pages/Admin/courses/courses.component';
import { CoursesNewEditComponent } from './Pages/Admin/courses-new-edit/courses-new-edit.component';
import { SideMenuComponent } from './Components/side-menu/side-menu.component';
import { CategoryModalComponent } from './Components/category-modal/category-modal.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectedCourseComponent } from './Components/selected-course/selected-course.component';
import { DeleteModalComponent } from './Components/delete-modal/delete-modal.component';
import { DeleteCategoryModalComponent } from './Components/delete-category-modal/delete-category-modal.component';
import { DatePipe } from '@angular/common';
import { AlertModalComponent } from './Components/alert-modal/alert-modal.component';
import { FilterModalComponent } from './Components/filter-modal/filter-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    CoursesNewEditComponent,
    SideMenuComponent,
    CategoryModalComponent,
    SelectedCourseComponent,
    DeleteModalComponent,
    DeleteCategoryModalComponent,
    AlertModalComponent,
    FilterModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [
   DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
