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

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    CoursesNewEditComponent,
    SideMenuComponent,
    CategoryModalComponent,
    SelectedCourseComponent,
    DeleteModalComponent,
    DeleteCategoryModalComponent
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
