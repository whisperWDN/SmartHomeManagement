import CryptoJS from 'crypto-js'
//十六位十六进制数作为密钥（秘钥为随机生成，必须与后端保持一致！）
const key = CryptoJS.enc.Utf8.parse("J4ny0Ja678Y7P2so"); 
//十六位十六进制数作为密钥偏移量（秘钥为随机生成，必须与后端保持一致！）
const iv = CryptoJS.enc.Utf8.parse('pTNorfvZW2UZJbd0'); 

//解密方法
function Decrypt(word) {
    const restoreBase64 = word.replace(/\-/g,'+').replace(/_/g,'/');

    let decrypt = CryptoJS.AES.decrypt(restoreBase64, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);

    return decryptedStr.toString();
}


function Encrypt(word) {
    let srcs = CryptoJS.enc.Utf8.parse(word);

    let encrypted = CryptoJS.AES.encrypt(srcs, key,
        {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
    //将结果进行base64加密
    return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
}
export {Decrypt , Encrypt}


