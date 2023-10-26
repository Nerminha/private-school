import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BannerComponent } from './components/banner/banner.component';
import { GategoryComponent } from './components/gategory/gategory.component';
import { BestEducationComponent } from './components/best-education/best-education.component';
import { CoursesComponent } from './components/courses/courses.component';
import { NewsComponent } from './components/news/news.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { WhyUsComponent } from './components/why-us/why-us.component';
import { CupComponent } from './components/cup/cup.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminComponent } from './components/admin/admin.component';
import { SignupComponent } from './components/signup/signup.component';
import { CoursComponent } from './components/cours/cours.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { StudentTableComponent } from './components/student-table/student-table.component';
import { TeacherTableComponent } from './components/teacher-table/teacher-table.component';
import { ParentTableComponent } from './components/parent-table/parent-table.component';
import { AddCoursComponent } from './components/add-cours/add-cours.component';
import { CoursesTableComponent } from './components/courses-table/courses-table.component';
import { AssigmentStudentComponent } from './components/assigment-student/assigment-student.component';
import { DashTeacherComponent } from './components/dash-teacher/dash-teacher.component';
import { LearningGroupComponent } from './components/learning-group/learning-group.component';
import { CoursesTabComponent } from './components/courses-tab/courses-tab.component';
import { RatingStudentComponent } from './components/rating-student/rating-student.component';
import { DashStudentComponent } from './components/dash-student/dash-student.component';
import { DisplayCourseComponent } from './components/display-course/display-course.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { SearchComponent } from './components/search/search.component';
import { MyFiltrePipe } from './pipe/my-filtre.pipe';
import { MyCoursesComponent } from './components/my-courses/my-courses.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { JwPaginationComponent } from 'jw-angular-pagination';
import { ProfileComponent } from './components/profile/profile.component';
import { DashParentComponent } from './components/dash-parent/dash-parent.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    GategoryComponent,
    BestEducationComponent,
    CoursesComponent,
    NewsComponent,
    PricingComponent,
    WhyUsComponent,
    CupComponent,
    LoginComponent,
    AdminComponent,
    SignupComponent,
    CoursComponent,
    TeachersComponent,
    TeacherComponent,
    StudentTableComponent,
    TeacherTableComponent,
    ParentTableComponent,
    AddCoursComponent,
    CoursesTableComponent,
    AssigmentStudentComponent,
    DashTeacherComponent,
    LearningGroupComponent,
    CoursesTabComponent,
    RatingStudentComponent,
    DashStudentComponent,
    DisplayCourseComponent,
    CourseDetailsComponent,
    SearchComponent,
    MyFiltrePipe,
    MyCoursesComponent,
    EditCourseComponent,
    JwPaginationComponent,
    ProfileComponent,
    DashParentComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
 export class AppModule { }
