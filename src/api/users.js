import instance from './http'
//register
function register(url,data) {
    return instance.post(url,data)
}
//login
function login(url,data) {
    return instance.post(url,data)
}
//info
function queryDetail(url) {
    return instance.get(url)
}
//edit
export {register,login,queryDetail}