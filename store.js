import {createStore, applyMiddleware, combineReducers} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {all, put, takeEvery} from 'redux-saga/effects'

import * as API from './api'

const delay = (ms) => new Promise(res => setTimeout(res, ms))

function* helloSaga() {
  console.log('Hello Sagas!')
}

function* incrementAsync() {
  yield delay(1000)
  yield put({type: 'INCREMENT'})
}

function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

function* watchFetchBuddies() {
  yield takeEvery('FETCH_BUDDIES', lookupBuddies)
}

function* lookupBuddies() {
  const buddies = yield API.fetchBuddies()
  const buddiesWithAdherence = yield getBuddyAdherence(buddies)
  yield put({type: 'SET_BUDDIES', payload: buddiesWithAdherence})
}

async function getBuddyAdherence(buddies) {
  for (let buddy of buddies) {
    const adherence = await API.fetchMedicationAdherence(buddy.id)
    buddy.adherence = adherence
  }
  return buddies
}

function* rootSaga() {
  yield all([
    helloSaga(),
    watchIncrementAsync(),
    watchFetchBuddies()
  ])
}

function counterReducer(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return ++state
    case 'DECREMENT':
      return --state
    default:
      return state
  }
}

function messageReducer(state = '', action) {
  switch (action.type) {
    case 'INCREMENT':
      return 'incremented'
    case 'DECREMENT':
      return 'decremented'
    case 'SAY':
      return action.message
    default:
      return state
  }
}

function buddyReducer(state=[], action) {
  switch (action.type) {
    case 'SET_BUDDIES':
      return action.payload
    default:
      return state
  }
}

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  combineReducers({counter: counterReducer, message: messageReducer, buddies: buddyReducer}),
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga)

export default store