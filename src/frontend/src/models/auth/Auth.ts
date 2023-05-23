import User from "./User";

export default interface Auth {
    id_token: string;
    access_token: string;
    refresh_token: string;
    scope: string;
    session_state: any;
    token_type: string; 
    expires_at: number;
    profile: User;
}