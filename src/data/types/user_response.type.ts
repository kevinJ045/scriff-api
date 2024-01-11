


export type user_response_failed = {
	failed: true,
	response: string
};

export type user_response_success = {
	"username": string,
	"name": string,
	"time": number,
	"id": string,
	"follows": string[],
	"coins": number,
	"settings": Record<string, any>,
	"info": Record<string, any> | null,
	"lastSeen": number
};

export type user_response = user_response_failed | user_response_success;