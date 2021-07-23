import React, { useEffect, useRef } from 'react';
import Cookies from 'js-cookie';

import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';
import TaskList from '../components/TaskList';

const Tasks = () => {
  const { tasks, error, loading } = useTypedSelector((state) => state.tasks);
  const token = Cookies.get('Access_token');
  const { fetchTasks } = useActions();
  const firstRender = useRef(true);

  useEffect(() => {
    console.log(`tasks loading: ${loading}`);
    if (firstRender.current && token != undefined) {
      fetchTasks(token);
      console.log('first render...');
      firstRender.current = false;
    } else {
      
    }
  }, [token, fetchTasks, loading]);

  return (
    <>
      {
        !loading &&
        <TaskList tasks={tasks} />
      }
    </>
  );
};

export default Tasks;
