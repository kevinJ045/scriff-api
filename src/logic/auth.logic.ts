import { AuthModel } from "../data/models/auth.model";
import { auth_response } from "../data/types/auth_response.type";
import { ScriffType } from "../data/types/scriff.type";
import { Req } from "./utils/req.util";

export async function auth_logic_checkTokenAndProceed(self: ScriffType, credentials: AuthModel) : Promise<AuthModel> {
	let me = await auth_logic_whoami(self, credentials.token!);
	if(me){
		credentials.verified = true;
		return credentials;
	} else {
		delete credentials.token;
		return await auth_logic_login(self, credentials);
	}
}

export async function auth_logic_login(self: ScriffType, credentials: AuthModel) : Promise<AuthModel> {
	if(credentials.token){
		return await auth_logic_checkTokenAndProceed(self, credentials);
	}
	const url = self.url.login(credentials.username, credentials.password);
	const data = await Req.post<auth_response>(url);
	return {
		username: credentials.username,
		password: credentials.password,

		token: data.failed ? "" : data.response.session,
		verified: data.failed,
	};
}


export async function auth_logic_whoami(self: ScriffType, token: string) : Promise<string | null> {
	const username = await Req.get<string>(self.url.whoami, token, true);
	return username == '401' ? null : username; 
}