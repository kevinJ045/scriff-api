


export type auth_response = 
	{
		failed: true,
		response: string
	} | {
		failed: false,
		response: {
			session: string,
			secret: string
		}
	}