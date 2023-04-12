import { UserManager, WebStorageStateStore } from 'oidc-client-ts';
import Config from "./config.json";

class AuthService {
  constructor() {
    const settings = {
      userStore: new WebStorageStateStore({ store: localStorage }),
      authority: Config.LOGIN_AUTHORITY,
      client_id: Config.LOGIN_CLIENT_ID,
      redirect_uri: `${location.origin}/signin-callback`,
      silent_redirect_uri: `${location.origin}/signin-renewal`,
      response_type: 'code',
      scope: 'openid profile offline_access email roles epi_content_delivery',
      post_logout_redirect_uri: `${location.origin}/signin`,
      filterProtocolClaims: true,
      loadUserInfo: true,
    };

    this.userManager = new UserManager(settings);
  }

  getUser() {
    return this.userManager.getUser();
  }

  signIn() {
    let args = {};
    if(!["/signin", "/signup"].includes(location.pathname)){
      args = {
        state: location.href,
      }
    }
    return this.userManager.signinRedirect(args);
  }

  signOut() {
    return this.userManager.signoutRedirect();
  }

  signOutSilent(){
    return this.userManager.signoutSilent();
  }

  async getAccessToken() {
    const data = await this.userManager.getUser();
    return (data ? data.access_token : null);
  }
}

const authService = new AuthService();

export default authService;
