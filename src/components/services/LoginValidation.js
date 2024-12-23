import Validations from "./Validations";

export default class LoginValidation{
constructor(email,password){
    this.email = email;
    this.password = password;
}
checkValidation(){
    let errors =[];
    if(!Validations.checkEmail(this.email)){
        errors['email']=' is Invalid';
    }
    if(!Validations.miniLength(this.password, 6)){
        errors['password'] = ' should be 6 character';
    }
    return errors;
    
}

static getErrorMessageFromApi(errorCode){
    switch(errorCode){
        case'Email':
        return 'Email';
       
    }
}

}