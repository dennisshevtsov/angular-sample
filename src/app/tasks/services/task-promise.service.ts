import { HttpClient, } from '@angular/common/http';
import { Injectable, } from '@angular/core';
import { TaskModel } from '../models/task.model';

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

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);

    return Promise.reject(error.message || error);
  }
}
