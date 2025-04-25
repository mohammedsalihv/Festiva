export interface ValidationResult {
    isValid:boolean,
    errors:{[key:string]:string};
}
export interface FormState {
    email: string;
    password: string;
  }
  
  export const validateLoginForm = (form:FormState):ValidationResult=>{
    const errors:{[key:string]:string} ={}

    if (!form.email.match(/^\S+@\S+\.\S+$/)) errors.email = "Invalid Email";
    if (!form.password.trim()) errors.password = "Password is required";
    if (form.password.length < 6)
      errors.password = "Password must be at least 6 characters";
     return {
        isValid:Object.keys(errors).length === 0,
        errors
     };
  };