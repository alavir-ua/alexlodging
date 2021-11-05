import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
} from './reducers/userReducers'
import {
  bookingCreateReducer,
  bookingDetailsReducer,
  bookingPayReducer,
  bookingListMyReducer,
  bookingListReducer,
} from 'reducers/bookingReducer'
import { stripePayReducer } from 'reducers/stripeReducers'
import { roomListReducer, roomDetailsReducer } from 'reducers/roomReducers'
import { storageReducer } from 'reducers/storageReducer'

const reducer = combineReducers({
  roomList: roomListReducer,
  roomDetails: roomDetailsReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  bookingCreate: bookingCreateReducer,
  bookingDetails: bookingDetailsReducer,
  bookingPay: bookingPayReducer,
  bookingListMy: bookingListMyReducer,
  bookingList: bookingListReducer,
  storage: storageReducer,
  stripePay: stripePayReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const bookingDetailsFromStorage = localStorage.getItem('bookingDetails')
  ? JSON.parse(localStorage.getItem('bookingDetails'))
  : {}

const billingAddressFromStorage = localStorage.getItem('billingAddress')
  ? JSON.parse(localStorage.getItem('billingAddress'))
  : {}

const initialState = {
  storage: {
    bookingDetails: bookingDetailsFromStorage,
    billingAddress: billingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
