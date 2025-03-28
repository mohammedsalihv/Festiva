export interface ValidationResult {
    isValid:boolean,
    errors:{[key:string]:string};
}
export interface FormState {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
  }
  
  export const validateSignupForm = (form:FormState):ValidationResult=>{
    const errors:{[key:string]:string} ={};

    if (!form.firstname.trim()) errors.firstname = "Firstname is required";
    if (!form.lastname.trim()) errors.lastname = "Lastname is required";
    if (!form.email.match(/^\S+@\S+\.\S+$/)) errors.email = "Invalid Email";
    if (!form.phone.match(/^\+?\d{10,15}$/)) errors.phone = "Invalid Phone Number";
    if (form.password.length < 6)
      errors.password = "Password must be at least 6 characters";
    if (form.password !== form.confirmPassword)
      errors.confirmPassword = "Passwords do not match";
  
     return {
        isValid:Object.keys(errors).length === 0,
        errors
     };
  };