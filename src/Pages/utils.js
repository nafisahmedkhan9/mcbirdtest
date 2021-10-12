import CONST from "../constant";
export const validateInput = (value, validation_type) => {
  console.log(validation_type);
  switch (validation_type.toLowerCase()) {
    case "text":
      return verifyLength(value, 1);
    case "name":
      return verifyName(value);
    case "email":
      return verifyEmail(value);
    case "number":
      return verifyNumber(value);
    case "phone":
      return verifyExactLength(value, 10);
    case "password":
      return verifyPassword(value);
    default:
      console.log("validation type is invalid");
      break;
  }
};

export const verifyPassword = (value) => {
  var passReg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
  if (passReg.test(value)) {
    return true;
  }
  return false;
};

export const verifyName = (value) => {
  var nameReg = /^[a-zA-Z\s]*$/;
  if (nameReg.test(value)) {
    return true;
  }
  return false;
};

export const verifyEmail = (value) => {
  var emailReg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (emailReg.test(value)) {
    return true;
  }
  return false;
};

// function that verifies if a string has a given length or not
export const verifyLength = (value, length) => {
  if (value === null || value === undefined) return false;
  if (value.toString().length >= length) {
    return true;
  }
  return false;
};

// function that verifies if a string has a given length or not
export const verifyExactLength = (value, length) => {
  if (value === null || value === undefined) return true;
  if (value.toString().length === length) {
    return true;
  }
  return false;
};

// function that verifies if value contains only numbers
export const verifyNumber = (value) => {
  var numberRex = new RegExp("^[0-9]+$");
  if (value && numberRex.test(value)) {
    return true;
  }
  return false;
};

export async function apiAction(url, method, data, token) {
  let options = {
    method: method,
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Token " + token,
    },
  };

  if (method.toLowerCase() === "get" || method.toLowerCase() === "delete") {
    delete options["body"];
  }

  try {
    let response = await fetch(url, options);
    let apiResponse = await response.json();
    return apiResponse;
  } catch (error) {
    return { success: false, status: "Api calling failed", response: error};
  }
}

export const getAccessToken = (cookieContainer, cookieName = CONST.TOKEN_KEY) => {
  const [cookies] = cookieContainer([CONST.COOKIE_NAME]);
  return cookies[cookieName];
};

export const handleLogout = (history, removeCookie) => {
  removeCookie(CONST.TOKEN_KEY, { path: '/' })
  removeCookie('user', { path: '/' })
  removeCookie("loginTime", { path: "/" });
  history.push('/login-page')
}