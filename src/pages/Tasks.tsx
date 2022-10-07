import React, { useEffect } from 'react';
import { useTypedSelector } from '../hooks/typedSelector';
import { useActions } from '../hooks/actions';
import TaskList from '../components/TaskList';
import CreateTaskForm from '../components/CreateTaskForm';
import { useGetCreatedTasksQuery, useLazyGetCreatedTasksQuery } from '../store/api/user.api';

const Tasks = () => {
  const { tasks } = useTypedSelector((state) => state.task);
  const { setTasks } = useActions();
  const [getCreatedTasks, { isLoading: isTasksFetched, data: tasksData }] = useLazyGetCreatedTasksQuery();

  useEffect(() => {
    if (tasksData) {
      setTasks(tasksData);
    }
  }, [tasksData]);

  useEffect(() => {
    getCreatedTasks();
  }, [tasks]);

  return (
    <>
      <p>{`${typeof tasks}`}</p>
      <CreateTaskForm style={{ padding: '50px' }} />
      { tasks !== undefined && <TaskList tasks={[...tasks].reverse()} />}
    </>
  );
};

export default Tasks;
