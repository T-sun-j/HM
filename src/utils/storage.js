let bSet = () => {
    try {
        localStorage.setItem('h5test', 'a')
        localStorage.removeItem('h5test')
    } catch (e) {
        alert('当前浏览器不支持本地存储,请换用别的浏览器')
        return false
    }
    return true
}

export let setItem = (name, val) => {
    if (!bSet) {
        return
    }
    let value = val
    if(val && val instanceof Object){
        value = JSON.stringify(val)
    }
    window.localStorage.setItem(name,value)
}

export let getItem = name => {
    if(!bSet){
        return
    }
    let item = localStorage.getItem(name)
    try{
        if(item.indexOf('{') === 0 || item.indexOf('[') === 0){
            return JSON.parse(item)
        }else{
            return item
        }
    }catch(e){
        return item
    }
}

export let removeItem = name => {
    let item = getItem(name)
    item ? window.localStorage.removeItem(name) : ''
}

export let clear = () => {
    window.localStorage.clear()
}
