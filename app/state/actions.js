import * as actionTypes from "./actionTypes";

export const setDeviceId = (device_id) => {
  return {
    type: actionTypes.SET_DEVICE_ID,
    device_id,
  };
};

export const addEmail = (email) => {
  return {
    type: actionTypes.ADD_EMAIL,
    email,
  };
};

export const removeEmail = (id) => {
  return {
    type: actionTypes.REMOVE_EMAIL,
    id,
  };
};

export const setSending = (sending) => {
  return {
    type: actionTypes.SET_SENDING,
    sending,
  };
};

export const setLocation = (location) => {
  return {
    type: actionTypes.SET_LOCATION,
    location,
  };
};

export const setAddress = (address) => {
  return {
    type: actionTypes.SET_ADDRESS,
    address,
  };
};

export const postData = () => {
  return async (dispatch, getState) => {
    const { device_id, longitude, latitude, emails, sending } = getState();
    const data = {};
    data.device_id = device_id;
    data.longitude = longitude;
    data.latitude = latitude;
    data.email = emails.map((item) => item.email);
    console.log(data);
    try {
      const res = await fetch("https://wecare-hackthrob.herokuapp.com/user", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log("Post Sent");
      if (sending)
        setTimeout(() => {
          dispatch(postData());
        }, 30000);
      return res;
    } catch (err) {
      console.log(JSON.stringify(err));
      return false;
    }
  };
};
