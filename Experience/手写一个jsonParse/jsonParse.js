function jsonParse(opt) {
    return eval('(' + opt +')');
}

jsonParse(jsonStringify({x : 5}))
// Object {x:5}