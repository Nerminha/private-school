import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoursService {
  courseURL: string = "http://localhost:3000/api/course";
  constructor(private http: HttpClient) { }
  addCourse(course: any, file: File) {
    let formData = new FormData();
    formData.append("name", course.name);
    formData.append("description", course.description);
    formData.append("duree", course.duree);
    formData.append("date", course.date);
    formData.append("price", course.price);
    formData.append("teacherId", course.teacherId);
    formData.append("nbLes", course.nbLess);
    formData.append("img", file);
    return this.http.post<{ message: string }>(this.courseURL, formData);
  }
displayAllCourses() {
    return this.http.get<{ courses: any }>(this.courseURL);
  }
deleteCourseById(id) {
    return this.http.delete<{ isDeleted: boolean }>(`${this.courseURL}/${id}`);
  }
getCoursesByTeacher(id) {
    return this.http.get<{ courses: any }>(`${this.courseURL}/teacher/${id}`);
  }
getCourseById(id: string) {
    return this.http.get<{courses:any}>(`${this.courseURL}/courseById/${id}`);
  }  
applyForCourse(idC, idT, idS) {
    let AddToCourse = {
      courseId: idC, // Utilisez les noms de propriétés corrects
      teacherId: idT,
      studentId: idS
    };
    return this.http.post<{ isAdd: any }>(this.courseURL + "/apply", AddToCourse);
  }
addRating(studentId, teacherId, courseId, rate) {
    return this.http.post<{ msg: any }>(`${this.courseURL}/rating/${studentId}/${teacherId}/${courseId}`, rate);
  }
getCoursesByidTeacher(id) {
    return this.http.get<{ teacherCourses: any }>(`${this.courseURL}/teacherCourses/${id}`)
  }
editCourse(id,course , file:File){
  let formData = new FormData();
  formData.append("name", course.name);
  formData.append("description", course.description);
  formData.append("duree", course.duree);
  formData.append("date", course.date);
  formData.append("price", course.price);
  formData.append("nbLes", course.nbLess);
  formData.append("img", file);
  return this.http.put<{ isUpdated: boolean}>(`${this.courseURL}/update/${id}`,formData)
}
getCourseByIDStudent(id){
  return this.http.get<{courses:any}>(`${this.courseURL}/studentCourses/${id}`)
}

}
