import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userURL: string = "http://localhost:3000/users";
  constructor(private http: HttpClient) { }

  // user = {email, pwd}
  signup(user , file:File,cvFile:File,role: string,status:string) {
    let formData=new FormData();
    formData.append("firstName",user.firstName);
    formData.append("adresse",user. adresse);
    formData.append("mail",user.mail);
    formData.append("pwd",user.pwd);
    formData.append("tel",user.tel);
    formData.append("role",user.role);
    if (role === "teacher") {
      formData.append("speciality", user.speciality);
      formData.append("status", user.status);
      formData.append("cv", cvFile);
      formData.append("img", file);

    }
    else if (role === "student") {
      formData.append("img", file);
      formData.append("age", user.age);
    }
    else if (role === "parent") {
      formData.append("numberOfChildren",user.numberOfChildren);
      formData.append("childrenArray", JSON.stringify(user.childrenArray));
    }
     
    return this.http.post<{ msg: boolean }>(this.userURL+"/signup", formData);
  }

  // user = {email, pwd}
  login(user) {
    return this.http.post<{msg: string,token:string}>(this.userURL+"/login", user);
  }
  getUserById(id){
    return this.http.get<{user:any}>(`${this.userURL}/proile/${id}`)
  }
  deleteUserById(id) {
    return this.http.delete<{isDeleted:boolean}>(`${this.userURL}/${id}`);
  }
    validateTeacher(id,user) {
      return this.http.put<{teacherAfterValidate}>(`${this.userURL}/${id}`,user);
    }
  displayAllStudents() {
    return this.http.get<{ students: any }>(this.userURL+"/students");
  }
  displayAllTeachers() {
    return this.http.get<{ teachers: any }>(this.userURL+"/teachers");
  }
  displayAllParents() {
    return this.http.get<{ parents: any }>(this.userURL+"/parents");
  }
  getStudentByIDT(id){
    return this.http.get<{teacherStudent:any}>(`${this.userURL}/students/${id}`)
  }
  getStudentByIDCourse(id){
    return this.http.get<{students:any,message:string}>(`${this.userURL}/course/students/${id}`)
  }
  addRating(studentId, teacherId, courseId, rate) {
    return this.http.post<{ msg: any }>(`${this.userURL}/rating/${studentId}/${teacherId}/${courseId}`, rate);
  }  
  addRatingTeacher(studentId, teacherId, courseId, rate) {
    return this.http.post<{ msg: any }>(`${this.userURL}/rating/teacher/${studentId}/${teacherId}/${courseId}`, rate);
  }
  getRatingByStudentAndCourseId(studentId: string, courseId: string) {
    return this.http.get<{ rate: any ,message:string }>(`${this.userURL}/ratingCourses/${studentId}/${courseId}`);
  } 
  searchTeachers(query: string) {
    return this.http.get<{ teachers: any ,message:string }>(`${this.userURL}/searchTeachers/${query}`);
  }  
  getStudentByTel(tel){
    return this.http.get<{child:any}>(`${this.userURL}/child/${tel}`)
  }
  deleteTeacher(id){
    return this.http.delete<{message:any}>(`${this.userURL}/deleteTeacher/${id}`)
  }
  deletestudent(id){
    return this.http.delete<{message:any}>(`${this.userURL}/deleteStudent/${id}`)
  }
}

