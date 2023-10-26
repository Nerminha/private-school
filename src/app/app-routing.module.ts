import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { SignupComponent } from './components/signup/signup.component';
import { CoursesComponent } from './components/courses/courses.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { AddCoursComponent } from './components/add-cours/add-cours.component';
import { AssigmentStudentComponent } from './components/assigment-student/assigment-student.component';
import { DashTeacherComponent } from './components/dash-teacher/dash-teacher.component';
import { RatingStudentComponent } from './components/rating-student/rating-student.component';
import { DashStudentComponent } from './components/dash-student/dash-student.component';
import { DisplayCourseComponent } from './components/display-course/display-course.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchComponent } from './components/search/search.component';
import { DashParentComponent } from './components/dash-parent/dash-parent.component';



const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"login",component:LoginComponent},
  {path:"admin",component:AdminComponent},
  {path:"profile",component:ProfileComponent},
  {path:"signupStudent",component:SignupComponent},
  {path:"signupTeacher",component:SignupComponent},
  {path:"signupParent",component:SignupComponent},
  {path:"signupAdmin",component:SignupComponent},
  {path:"courses",component:CoursesComponent},
  {path:"teachers",component:TeachersComponent},
  {path:"addCourse",component:AddCoursComponent},
  {path:"editCourse/:id",component:EditCourseComponent},
  {path:"courses",component:CoursesComponent},
  {path:"apply/:id",component:AssigmentStudentComponent},
  {path:"dashTeacher",component:DashTeacherComponent},
  {path:"rating/:coursId/:id",component:RatingStudentComponent},
  {path:"dashStudent",component:DashStudentComponent},
  {path:"searchTeachers",component:SearchComponent},
  {path:"searchChild",component:DashParentComponent},
  {path:"display/:id",component:DisplayCourseComponent},
  {path:":id",component:CourseDetailsComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
