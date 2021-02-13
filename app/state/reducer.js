import defaultState from "./state";
import * as actionTypes from "./actionTypes";

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.ADD_EMAIL:
      return {
        ...state,
        emails: state.emails.concat(action.email),
      };
    case actionTypes.REMOVE_EMAIL:
      return {
        ...state,
        emails: state.emails.filter((item) => item.id !== action.id),
      };
    case actionTypes.SET_DEVICE_ID:
      return {
        ...state,
        device_id: action.device_id,
      };
    case actionTypes.SET_LOCATION:
      return {
        ...state,
        latitude: action.location.latitude,
        longitude: action.location.longitude,
      };
    case actionTypes.SET_SENDING:
      return {
        ...state,
        sending: action.sending,
      };
    case actionTypes.SET_ADDRESS:
      return {
        ...state,
        address: action.address,
      };
    default:
      return state;
  }
};

export default reducer;
