import { io } from "socket.io-client";
import { ScriffType } from "../data/types/scriff.type";
import { CommonClass } from "./base.class";



export class SocketClass extends CommonClass {

	connect(token?: string | null){
		if(!token) token = this._self.user.getUser().token || null;
		const socket = io(this._self.url.base, {
			extraHeaders: { [token ? 'token' : 'no_token']: token || "" },
		});
		socket.connect();
		this._self.user.getUser().socket = socket;
		return socket;
	}

}