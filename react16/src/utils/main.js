// 记录主应用暴露出来的方法
let main = null

export const setMain = (data) => {
  main = data
}

export const getMain = () => {
  return main
}
