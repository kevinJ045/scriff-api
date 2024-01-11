import { Socket } from "socket.io-client";
import { Model } from "./base.model";

export interface UserLike {
	username: string;
	name: string;
}

export class UserModel extends Model<UserLike> implements UserLike {
	username: string = "";
	name: string = "";
	id: string = "";
	lastSeen: number = Date.now();
	time: number = Date.now();
	
	socket?: Socket;
	token?: string = undefined;
}

export interface UserSettingsLike {}

export class UserSettingsModel extends Model<UserSettingsLike> implements UserSettingsLike {
	__strict__ = false;
	user: UserModel;
}