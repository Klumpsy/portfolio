import { configureStore} from '@reduxjs/toolkit';
import { CounterReducer } from '@/redux/counterSlice';

export const store = configureStore({
    reducer: {
      counter: CounterReducer
    },
  });
  