export default interface SignUpModel{
    username: string;
    email: string;
    firstName?: string;
    lastName?: string;
    password: string;
    confirmPassword: string;
}