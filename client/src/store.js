import { createStore } from 'redux'

function accounts(state = [], action) {
  switch (action.type) {
  case 'REFRESH_COMMENTS':
    return action.comments
  case 'ADD_COMMENT':
    return state.concat( [action.comment] )
  default:
    return state
  }
}

var store = createStore(accounts);

module.exports = store
