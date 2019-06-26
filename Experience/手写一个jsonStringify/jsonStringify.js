function jsonStringify(obj) {
    let type = typeof obj;
    if(type !== 'object'){
        // Boolean|Number|String 类型会自动转换对应的原始值
        if(/string|undefined|function/.test(type)){
            obj = '"' + obj + '"';   
        }
        return String(obj);
    }else{
        let json = [];
        let arr = Array.isArray(obj);
        for (let k in obj) {
            let v = obj[k];
            let type = typeof v;
            if(/string|undefined|function/.test(type)){
                v = '"' + v + '"';
            }else if(type === "object"){
                v = jsonStringify(v);
            }
            json.push((arr ? "" : '"' + k + '":') + String(v));
        }
        return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}")
    }
}

jsonStringify({x : 5}) // "{"x":5}"
jsonStringify([1, "false", false]) // "[1,"false",false]"
jsonStringify({b: undefined}) // "{"b":"undefined"}"
