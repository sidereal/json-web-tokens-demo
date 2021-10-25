
import { createStore, applyMiddleware } from 'redux';
import { reducer, logAction } from './reducer'

const reduxStore = createStore(reducer, applyMiddleware(logAction))

export default reduxStore