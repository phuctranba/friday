import { combineReducers } from 'redux';
import system from './reducer/system.reducer.store';

/**
 * Reg and import store from here ...
 */

const rootReducer = combineReducers({
  system,
});

export default rootReducer;

export type RootReducer = ReturnType<typeof rootReducer>
