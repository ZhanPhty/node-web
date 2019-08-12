// ---------------------------------------------------
// #filter过滤器
// ---------------------------------------------------
import Vue from 'vue'
import dayjs from 'dayjs'

/**
 * 格式化日期
 */
export const formatDate = (val, type) => {
  if (!val || val === '') return '-'
  switch (type) {
    case '/':
      return dayjs(val).format('YYYY/M/D HH:mm:ss')
    case '.':
      return dayjs(val).format('YYYY.MM.DD HH:mm:ss')
    case 'zh':
      return dayjs(val).format('YYYY年MM月DD日 HH:mm:ss')
    case 'YMD':
      return dayjs(val).format('YYYY-MM-DD')
    case 'MD':
      return dayjs(val).format('MM-DD')
    default:
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss')
  }
}

/**
 * 格式化邮箱
 * 添加****隐藏中间部分
 */
export const formatEmail = str => {
  const reg = new RegExp(/(.{2}).+(.{2}@.+)/g)
  const email = str.replace(reg, '$1****$2')
  return email
}

const filters = {
  formatDate,
  formatEmail
}

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
export default filters
