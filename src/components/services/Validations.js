export default class Validations {
static checkEmail(email){
    if(/^[a-zA-z0-9.!#$%&'*+/=?_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email,))
    {
        return true;
    }
    return false;
}
static miniLength(name, miniLength){
 if(name.length < miniLength){
    return false;
 }
 return true;
}


}