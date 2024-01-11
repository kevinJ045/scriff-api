import { User } from "../data/entities/user.entity";
import { username } from "../data/types/auth.type";
import { ScriffType } from "../data/types/scriff.type";
import { CommonClass } from "./base.class";
import { user_logic_getUser } from "./user.logic";



export class UserClass extends CommonClass {
	private user = new User();

	setUser(user: User){
		this.user = user;
		return this;
	}

	getUser(){
		return this.user;
	}

	async findByUsername(username: username){
		return await user_logic_getUser(this._self, {
			username,
			token: this.user.token || ""
		});
	}
}