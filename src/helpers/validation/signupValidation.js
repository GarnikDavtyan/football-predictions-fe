export const validatePassword = p => p.length > 7 && /[a-z]/.test(p) && /[A-Z]/.test(p) && /\d/.test(p);
export const validateUsername = username => /^\w{2,20}$/.test(username);
export const validateEmail = email => /^[\w\d._%+-]+@[a-z\d.-]+\.[a-z]{2,4}$/.test(email);
