import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import FormCheck from 'react-bootstrap/FormCheck';
import { ICreatedTask } from '../types/tasks';
import { useTypedSelector } from '../hooks/typedSelector';
import { useActions } from '../hooks/actions';
import { useUpdateTaskAsyncMutation, useDeleteTaskAsyncMutation } from '../store/api/task.api';

interface ITaskListProps {
  tasks: ICreatedTask[];
}

const TaskList = (props: ITaskListProps) => {
  const { updateTask, removeTask } = useActions();
  const [ updateTaskAsync, { data: updatedTaskData, isLoading: isUpdateLoading } ] = useUpdateTaskAsyncMutation();
  const [ deleteTaskAsync, { data: deletedTaskData, isLoading: isDeleteLoading, isError: isDeleteError } ] = useDeleteTaskAsyncMutation();

  const handleClick = async (taskId: number) => {
    await deleteTaskAsync(taskId).then(() => {
      if (!isDeleteError) {
        removeTask(taskId);
      }
    });
  };

  const handleChange = async (id: number, flag: boolean) => {
    const updateData = await updateTaskAsync({ id, task: { isFinished: !flag } }).unwrap();
    updateTask({ id, task: updateData });
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Status</th>
            <th>Task</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          { props.tasks.map((task, index) => (
            <tr key={task.id}>
              <td>{index}</td>
              <td>
                <FormCheck
                  type="checkbox"
                  checked={task.isFinished}
                  onChange={() => handleChange(task.id, task.isFinished)}
                />
              </td>
              <td>{task.text}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleClick(task.id)}
                  disabled={isDeleteLoading || isUpdateLoading}
                >
                  { isDeleteLoading || isUpdateLoading ? '...' : 'X' }
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default TaskList;
