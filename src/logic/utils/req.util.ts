import axios from "axios";


export const Req = {
	async sendReq<T = Record<string, any>, D = Record<string, any>>(url: string, method: string, withToken: string | null = null, data: D | null = null, toText = false) : Promise<T> {
		return await axios(url, {
			method,
			headers: {
				'Content-Type': 'application/json',
				[withToken ? 'token' : 'no_token']: typeof withToken == "string" ? withToken : ""
			},
			data: data ? JSON.stringify(data) : null
		}).then(r => r.data);
	},

	async get<T = Record<string, any>>(url: string, withToken: string | null = null, toText: boolean = false) : Promise<T> {
		return await Req.sendReq<T>(url, 'GET', withToken, null, toText);
	},

	async post<T = Record<string, any>, D = Record<string, any>>(url: string, data: D | null = null, withToken: string | null = null, toText: boolean = false) : Promise<T> {
		return await Req.sendReq<T, D>(url, 'POST', withToken, data, toText);
	}
}