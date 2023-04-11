import { UserManager, WebStorageStateStore } from 'oidc-client-ts';
import Config from "./config.json";

class AuthService {
  constructor() {
    const settings = {
      userStore: new WebStorageStateStore({ store: window.localStorage }),
      authority: Config.LOGIN_AUTHORITY,
      client_id: Config.LOGIN_CLIENT_ID,
      redirect_uri: `${window.location.origin}/signin-callback`,
      silent_redirect_uri: `${window.location.origin}/signin-renewal`,
      response_type: 'code',
      scope: 'openid profile offline_access email roles epi_content_delivery',
      post_logout_redirect_uri: `${window.location.origin}/signin`,
      filterProtocolClaims: true,
      loadUserInfo: true,
    };

    this.userManager = new UserManager(settings);
  }

  getUser() {
    return this.userManager.getUser();
  }

  login() {
    let args = {};
    if(!window.location.href.includes("/signin")){
      args = {
        state: window.location.href,
      }
    }

    return this.userManager.signinRedirect(args);
  }

  logout() {
    return this.userManager.signoutRedirect();
  }

  async getAccessToken() {
    const data = await this.userManager.getUser();
    return (data ? data.access_token : null);
  }
}

const authService = new AuthService();

export default authService;
