import { ConstantMap } from "./base.const";


export class URLS extends ConstantMap {
	base = "http://localhost:3333";

	login(username: string, password: string){
		return `${this.base}/login/${username}?pwd=${password}&notokensave=true`;
	}

	api(url: string = ""){
		return `${this.base}/api/${url}`;
	}

	user(username: string){
		return this.api(`users/${username}`);
	}

	get whoami(){
		return `${this.base}/whoami`;
	}

	get socket(){
		return `${this.base}/socket.io`;
	}

	remote({ username, sessionID }: { username: string, sessionID: string }){
		return `${this.base}/svr/${username}/${sessionID}/34501`;
	}

	join(...paths: string[]){
		return paths.join('/');
	}
}