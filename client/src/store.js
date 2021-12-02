import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './reducers/userReducers'
import {
  bookingCreateReducer,
  bookingDetailsReducer,
  bookingPayReducer,
  bookingListMyReducer,
  bookingListReducer,
  bookingDeleteReducer,
} from './reducers/bookingReducer'
import { stripePayReducer } from './reducers/stripeReducers'
import {
  roomListReducer,
  roomAdminListReducer,
  roomDetailsReducer,
  roomDeleteReducer,
} from './reducers/roomReducers'
import { storageReducer } from './reducers/storageReducer'

const reducer = combineReducers({
  roomList: roomListReducer,
  roomAdminList: roomAdminListReducer,
  roomDetails: roomDetailsReducer,
  roomDelete: roomDeleteReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  bookingCreate: bookingCreateReducer,
  bookingDetails: bookingDetailsReducer,
  bookingPay: bookingPayReducer,
  bookingListMy: bookingListMyReducer,
  bookingList: bookingListReducer,
  bookingDelete: bookingDeleteReducer,
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
