import { User } from "../data/entities/user.entity";
import { password, token, username } from "../data/types/auth.type";
import { ScriffType } from "../data/types/scriff.type";
import { auth_logic_login, auth_logic_whoami } from "./auth.logic";
import { CommonClass } from "./base.class";
import { user_logic_getUser } from "./user.logic";



export class AuthClass extends CommonClass {

	async login(username: username, password: password, token?: string){
		const login_data = await auth_logic_login(
			this._self,
			{
				username,
				password,
				token
			}
		);
		return login_data;
	}

	async whoami(token: token){
		return await auth_logic_whoami(this._self, token);
	}

	async self(token: token, full = false){
		const user = await user_logic_getUser(this._self, {
			username: await this.whoami(token) || "",
			token
		}, full) || new User();
		user.token = token;
		return user;
	}
}