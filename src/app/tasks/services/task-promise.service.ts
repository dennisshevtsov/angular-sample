import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Injectable, } from '@angular/core';

import { TaskModel, } from '../models/task.model';

@Injectable({
  providedIn: 'any',
})
export class TaskPromiseService {
  private tasksUrl: string = 'http://localhost:3000/tasks';

  public constructor(
    private http: HttpClient,
  ) { }

  public getTasks(): Promise<TaskModel[]> {
    return this.http
      .get(this.tasksUrl)
      .toPromise()
      .then(response => response as TaskModel[])
      .catch(this.handleError);
  }

  public getTask(id: number): Promise<TaskModel> {
    const url: string = `${this.tasksUrl}/${id}`;

    return this.http
      .get(url)
      .toPromise()
      .then(response => response as TaskModel)
      .catch(this.handleError);
  }

  public createTask(task: TaskModel): Promise<TaskModel> {
    const url: string = this.tasksUrl;
    const body: string = JSON.stringify(task);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http
      .post(url, body, options)
      .toPromise()
      .then(response => response as TaskModel)
      .catch(this.handleError);
  }

  public updateTask(task: TaskModel): Promise<TaskModel> {
    const url: string = `${this.tasksUrl}/${task.id}`;
    const body: string = JSON.stringify(task);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'applicantion/json',
      }),
    };

    return this.http
      .put(url, body, options)
      .toPromise()
      .then(response => response as TaskModel)
      .catch(this.handleError);
  }

  public deleteTask(task: TaskModel): Promise<TaskModel> {
    const url: string = `${this.tasksUrl}/${task.id}`;

    return (
      this.http
          .delete(url)
          .toPromise()
          .catch(this.handleError)
    );
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);

    return Promise.reject(error.message || error);
  }
}
