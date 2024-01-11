
import { username } from "../types/auth.type";
import { Model } from "./base.model";

export interface ScriffRemoteData {
	username?: username;
	sessionID?: string;
	secret?: string;
}

export class ScriffRemoteModel extends Model<ScriffRemoteData> implements ScriffRemoteData {
	username: username = "";
	sessionID: string = "";
	secret: string = "";

	connected = false;

	constructor({
		username,
		sessionID,
		secret
	} : {
		username?: string,
		sessionID?: string,
		secret?: string
	} = {}){
		super();
		this.setValues({
			username,
			sessionID,
			secret
		});
	}

	setValues({
		username,
		sessionID,
		secret
	} : {
		username?: string,
		sessionID?: string,
		secret?: string
	}){
		if(username) this.username = username;
		if(sessionID) this.sessionID = sessionID;
		if(secret) this.secret = secret;
	}

	set_connection(connected: boolean){
		this.connected = connected;
		return this;
	}
	
}