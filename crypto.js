// utf-8 encoding
function xor(str, key) {
    let result = '';
    for (let i = 0; i < str.length; i++) {
        result += String.fromCharCode(key ^ str.charCodeAt(i));
    }
    return result;
}

function decode(data) {
    console.log("Decoding...")
    if (data.startsWith('<?xml version="1.0"?>'))
        return data
    console.log(data)
    data = xor(data, 11)
    data = data.replace(/\0/g, "")
    console.log(data)
    data = atob(data)
    data = data.replace(/-/g, '+').replace(/_/g, '/')
    data = data.replace(/><(?!\/)/g, '> <')
    console.log(data)
    data = data.split('').map(function (x) {
        return x.charCodeAt(0);
    });
    data = new Uint8Array(data);
    data = pako.inflate(data);
    return new Uint16Array(data).reduce((acc, byte) => acc + String.fromCharCode(byte), '');

}
