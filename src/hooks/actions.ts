import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import Actions from '../store/slices';


export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(Actions, dispatch);
};
