export class TaskModel {
  public constructor(
    public id: number = 0,
    public action: string = '',
    public priority: number = 0,
    public estNours: number = 0,
    public actHours?: number,
    public done?: boolean,
  ) {
  }
}
