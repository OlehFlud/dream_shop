export const customErrors = {
  //400
  BAD_REQUEST_USER_PRESENT: {
    message: 'User is already registered',
    code: 4001
  },
  BAD_REQUEST_NO_TOKEN: {
    message: 'Token is not present'
  },
  NOT_FOUND: {
    message: 'Record not found'
  },
  BAD_REQUEST_USER_ALREADY_ACTIVATED: {
    message: 'User is already activated',
    code: 4002
  }
};
