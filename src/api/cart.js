import instance from './http';

function addCart(url,data) {
    return instance.post(url,data);
}
function getCart(url) {
    return instance.get(url);
}

function toggleGoodsStatus(url,obj) {
    return instance.put(url,obj)
}

export {addCart,getCart,toggleGoodsStatus}