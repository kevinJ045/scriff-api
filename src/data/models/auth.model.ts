

export interface AuthModel {
	username: string;
	password: string;

	token?: string;
	verified?: boolean;
}