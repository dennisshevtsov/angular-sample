import { Component,
         EventEmitter,
         Input,
         Output,
         ChangeDetectionStrategy, } from '@angular/core';

import { TaskModel, } from './../../models/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskComponent {
  @Input() public task: TaskModel = new TaskModel();

  @Output() public completeTask: EventEmitter<TaskModel> = new EventEmitter<TaskModel>();
  @Output() public editTask: EventEmitter<TaskModel> = new EventEmitter<TaskModel>();

  public onCompleteTask(): void {
    this.completeTask.emit(this.task);
  }

  public onEditTask(): void {
    this.editTask.emit(this.task);
  }
}
