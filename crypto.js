
function xor(str, key) {
    str = String(str).split('').map(letter => letter.charCodeAt());
    let res = "";
    for (let i = 0; i < str.length; i++) res += String.fromCodePoint(str[i] ^ key);
    return res;
}

function decode(data) {
    console.log("Decoding...")
    if (data.startsWith('<?xml version="1.0"?>'))
        return data

    let decoded = xor(data, 11)
    decoded = atob(decoded)
    try {
        let charData = decoded.split('').map(function (x) {
            return x.charCodeAt(0);
        });
        let binData = new Uint8Array(charData);
        let fulldata = pako.inflate(binData);
        let strData = String.fromCharCode.apply(null, new Uint16Array(fulldata));
        return strData
    } catch (e) {
        return console.log("Error! GD save file seems to be corrupt!")
    }
}
