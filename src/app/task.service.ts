import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Tasks } from './model/tasks';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  
  updateTask(taskId:string,selectedTask:Tasks): Observable<any>{
    return this.http.put(`${this.apiUri}/adminupdate/${taskId}`,selectedTask);

  }

  private apiUri = 'http://localhost:3000/tasks';
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }
  // saveTask(task: Tasks): Observable<Tasks> {
  //   return this.http.post<Tasks>(this.apiUri, task).pipe(map());
  // }
 
  saveTask(task: Tasks): Observable<Tasks> {
    return this.http.post<Tasks>(`${this.apiUri}/admincreate`,task);
  }

  getTasks(){}

  getTasksByProjectId(projectId: string): Observable<Tasks[]> {
    const url = `${this.apiUri}/gettaskbyprojectid/${projectId}`;
    return this.http.get<Tasks[]>(url);
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/tasks/${id}`);
  }

  viewComment(taskId:string): Observable<any>{
    return this.http.get<string>(`http://localhost:8200/api/v1/comment/viewcomment/{taskId}`);
  }
}
