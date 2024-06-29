const jwt = require('jsonwebtoken');
const zod = require("zod");
const jwtPassword = 'secret';

const usernameSchema=   zod.string().email();
const passwordSchema = zod.string().min(6);


function signJwt(username, password) {
    // Your code here
    const usernameValidation = usernameSchema.safeParse(username);
    const passwordValidation = passwordSchema.safeParse(password);

    if(!usernameValidation.success || !passwordValidation.success){
        return null;
    }

    const signature = jwt.sign({
        username
    }, jwtPassword);
    return signature;

}


function verifyJwt(token) {
    // Your code here
try{
    const verified = jwt.verify(token, jwtPassword);
   if(verified){
     return true;
   }  
}
catch(e){
   
}
return false;
}
function decodeJwt(token) {
    // Your code here
    
    const decoded = jwt.decode(token);
   if(decoded){
       return true;
   }
   return false;
}


module.exports = {
  signJwt,
  verifyJwt,
  decodeJwt,
  jwtPassword,
};
