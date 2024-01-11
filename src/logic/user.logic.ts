import { User } from "../data/entities/user.entity";
import { UserSettings } from "../data/entities/user_settings.entity";
import { AuthModel } from "../data/models/auth.model";
import { username } from "../data/types/auth.type";
import { ScriffType } from "../data/types/scriff.type";
import { OtherUsernameWithOtherToken } from "../data/types/user.type";
import { user_response, user_response_failed, user_response_success } from "../data/types/user_response.type";
import { Req } from "./utils/req.util";



export async function user_logic_getUser(
	self: ScriffType,
	credentials: OtherUsernameWithOtherToken,
	/**
	 * Fields param can be used to include certain fields and 
	 * exclude certain fields, or you can just
	 * put true to get all fields
	 */
	fileds: boolean | string[] = false
) : Promise<User | null> {
	const url = self.url.user(credentials.username);
	const user = await Req.get<user_response>(url, credentials.token);
	if((user as user_response_failed).failed){
		return null;
	} else {
		const user_init = new User();
		if(fileds) {
			if(fileds == true) user_init.__strict__ = false;
			else if(Array.isArray(fileds)){
				for(let i of fileds){
					user_init[i] = "";
				}
			}
		}
		return user_init.fromJson(user as user_response_success);
	}
}