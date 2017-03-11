// user.js
import request from './request';

export function getUserName(userID) {
  return request('/users/' + userID).then(user => user.name);
}

export function test(){
  console.log("hello from user!")
}
