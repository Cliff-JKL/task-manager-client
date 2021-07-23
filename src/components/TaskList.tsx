import React, { useEffect, useRef } from 'react';
import Table from 'react-bootstrap/Table';
import { Task } from '../types/tasks';

interface ITaskListProps {
  tasks: Task[];
}

const TaskList = (props: ITaskListProps) => {
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Задача</th>
            <th>Готовность</th>
          </tr>
        </thead>
        <tbody>
          { props.tasks.map((task, index) => (
            <tr key={index}>
              <td>{index}</td>
              <td>{task.name}</td>
              <td>{task.isFinished ? 'да' : 'нет'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default TaskList;
