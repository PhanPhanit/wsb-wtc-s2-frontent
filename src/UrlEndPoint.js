const BASE_URL = "/api/v1";

// Respone cookie
export const responseCookie = `${BASE_URL}/wsb-res-cookie`;
// Login with social media
export const facebookLogin = `https://wsb-node-server.herokuapp.com${BASE_URL}/auth/facebook`;
export const googleLogin = `https://wsb-node-server.herokuapp.com${BASE_URL}/auth/google`;
// Auth
export const register = `${BASE_URL}/auth/register`;
export const login = `${BASE_URL}/auth/login`;
export const logout = `${BASE_URL}/auth/logout`;
// User
export const getAllUser = `${BASE_URL}/users`;
export const showCurrentUser = `${BASE_URL}/users/showMe`;
export const countAllUser = `${BASE_URL}/users/count-all-user`;
export const updateUser = `${BASE_URL}/users/updateUser`;
export const updateUserPassword = `${BASE_URL}/users/updateUserPassword`;
export const userUrl = `${BASE_URL}/users`;
export const forgotPasswordUrl = `${BASE_URL}/auth/forgot-password`;
export const resetPasswordUrl = `${BASE_URL}/auth/reset-password`;
// Slide
export const getAllSlide = `${BASE_URL}/wsb-slide`;
export const slideUrl = `${BASE_URL}/wsb-slide`;
// Category
export const getAllCategory = `${BASE_URL}/wsb-cate`;
export const categoryUrl = `${BASE_URL}/wsb-cate`;
// Product
export const getAllProduct = `${BASE_URL}/wsb-pro`;
export const productUrl = `${BASE_URL}/wsb-pro`;
// Order Item
export const getAllOrderItem = `${BASE_URL}/wsb-od-item`;
// Create Payment Intent
export const createPaymentIntent = `${BASE_URL}/wsb-ch-out/create-payment-intent`;
// Order
export const createOrder = `${BASE_URL}/wsb-od`;
export const getAllMyOrder = `${BASE_URL}/wsb-od/show-all-my-order`;
export const getTotalPrice = `${BASE_URL}/wsb-od/get-total-price`;
export const getTotalOrder = `${BASE_URL}/wsb-od/get-total-order`;
export const orderUrl = `${BASE_URL}/wsb-od`;
// Reivew
export const review = `${BASE_URL}/wsb-rev`;
export const starPercent = `${BASE_URL}/wsb-rev/star-percent`;
// Upload photo url
export const uploadPhotoCloud = `${BASE_URL}/wsb-upload/upload-cloud`;