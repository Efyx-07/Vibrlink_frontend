const emailRegex: RegExp = /^[a-z0-9.-]+@[a-z0-9._-]{2,}\.[a-z]{2,8}$/;
const passwordRegex: RegExp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!*]).{8,}$/;

// functions to validate the datas formats. used before the forms submissions. 

export function validateData(email: string, password: string): boolean {
    return emailRegex.test(email) && passwordRegex.test(password);
};

export function validateEmail(email: string): boolean {
    return emailRegex.test(email);
};

export function validatePassword(password: string): boolean {
    return passwordRegex.test(password);
};

export function validateConfirmPassword(password: string, confirmPassword:string): boolean {
    return password === confirmPassword
};