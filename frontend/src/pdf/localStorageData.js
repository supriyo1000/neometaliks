import CryptoJS from 'crypto-js';
const secretKey = 'yourSecretKeyHere';
export function decryptedData(setUserRole) {
    try {
        const auth = localStorage.getItem("userAuth");
        if (!auth) {
            //console.error('Empty data for decryption');
            return;
        }

        const decryptedBytes = CryptoJS.AES.decrypt(auth, secretKey);


        if (decryptedBytes.sigBytes <= 0) {
            //console.error('Decryption unsuccessful');
            return;
        }

        const data = decryptedBytes.toString(CryptoJS.enc.Utf8);
        const parsedData = JSON.parse(data);
        setUserRole(JSON.parse(data))
        // console.log("after", userRole);
        // setUserid(parseInt(userRole.userId, 10));
        // console.log(userid);
        // console.log(parseInt(userid, 10));

        // fetchuserdetail(userid);
        //console.log(data);
        //console.log('Data stored in localStorage');
    } catch (error) {
        //console.error('Error decrypting data:', error);
    }
}