export const ERROR_MESSAGES = {
  INTERNAL_SERVER_ERROR: "Internal server error.",
  INVALID_OBJECT_ID: "Invalid Object ID",
  INVALID_JWT: "Json Web Token is invalid, try again.",
  EXPIRED_JWT: "Json Web Token is expired, try again.",
  DUPLICATE_ENTRY: "Duplicate entry for ",
};

export enum statusMessages {
    successResposne = 'success',


    unAuthorized = 'You are not authorized to continue this request',
    notAdmin = 'Admin access required',
    notHost = 'Host access required',
    accountUnauthorized = "Account unauthorized",
    accountNotfound = "Account not found",
    accountBlocked = "This account has been blocked. Please contact support",
    accountExisted = 'Account already exists',

    invalidCredential = "Invalid credentials",
    invalidMail = 'Invalid email',
    uniqueIDMissing = 'unique ID is missing',


    noAccessToken = 'access token required',
    invalidToken = 'Your token invalid',
    expireToken = 'Invalid or expired token',
    noToken = "Access denied: No token provided",
    invalidOtp = 'your otp invalid or expired',
    jwtVerificationFailed = "JWT verification failed:",



    serverError = 'Internal server error',
    badRequest = 'Bad Request'

}


export enum statusCodes {

  Success = 200,
  noContent = 202,
  badRequest = 400,
  unAuthorized = 401,
  forbidden = 403,
  notfound = 404,
  notAcceptable = 406,
  reqTimeout = 408,
  conflict = 409,
  toManyRequests = 429,
  invalidToken = 498,
  serverError = 500,
  badGateway = 502,
  serviceUnavailable = 503,

}
