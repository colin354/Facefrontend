/**
 * 邮箱
 * @param {*} s
 */
export function isEmail (s) {
  return /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}

/**
 * 手机号码
 * @param {*} s
 */
export function isMobile (s) {
  return /^1[0-9]{10}$/.test(s)
}

/**
 * 电话号码
 * @param {*} s
 */
export function isPhone (s) {
  return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
}

/**
 * 楼层
 * @param {*} s
 */
export function isFloor (s) {
  return /^[0-9]{0,2}$/.test(s)
}

/**
 * 楼层
 * @param {*} s
 */
export function isRoom (s) {
  return /^[0-9]{0,4}$/.test(s)
}
/**
 * URL地址
 * @param {*} s
 */
export function isURL (s) {
  return /^http[s]?:\/\/.*/.test(s)
}

/**
 * 用户名
 * @param {*} s
 */
export function isUsername (s) {
  return /^[A-Za-z0-9_\u4e00-\u9fa5]{1,6}$/.test(s)
}

/**
 * 时间
 * @param {*} s
 */
export function isDate (s) {
  return /^((?!0000)[0-9]{4}-((0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-8])|(0[13-9]|1[0-2])-(29|30)|(0[13578]|1[02])-31)|([0-9]{2}(0[48]|[2468][048]|[13579][26])|(0[48]|[2468][048]|[13579][26])00)-02-29)$/.test(s)
}



