import {configureStore} from '@reduxjs/toolkit';
import { userReducer } from './features/user.slice';
import { postsReducer } from './features/posts.slice';

export const store = configureStore({
    reducer: {
   userReducer,
   postsReducer,

    },
})


  type AppStore = typeof store;
  export type RootState = ReturnType<AppStore["getState"]>;
   export type AppDispatch = AppStore["dispatch"] 