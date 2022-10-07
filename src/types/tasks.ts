export interface Task {
  id: number;
  text: string;
  isFinished: boolean;
}

interface ICreator {
  uid: string;
  email: string;
  username: string;
}

export interface ITask {
  isFinished: boolean;
  text: string;
  creator: ICreator;
}

export interface ICreatedTask {
  id: number;
  creatorUid: string;
  text: string;
  isFinished: boolean;
}

export interface IUpdateTask {
  id: number;
  task: UpdateTaskDto;
}

export interface TasksState {
  tasks: Array<Task>;
  loading: boolean;
  error: null | string;
}

export interface GetTaskDto extends Task {}

export interface GetCreatedTasksDto {
  tasks: GetTaskDto[];
}

export interface CreateTaskDto {
  text: string;
  isFinished?: boolean;
}

export interface UpdateTaskDto {
  text?: string;
  isFinished?: boolean;
}
