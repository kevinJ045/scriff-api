import { ScriffRemote } from "../data/entities/remote.entity";
import { CommonClass } from "./base.class";
import { remote_logic_connect, remote_logic_execute } from "./remote.logic";



export class RemoteClass extends CommonClass {

	async create({
		username,
		sessionID,
		secret
	} : {
		username?: string,
		sessionID?: string,
		secret?: string
	} = {})
	: Promise<ScriffRemote>
	{
		const remote = new ScriffRemote({
			username,
			sessionID,
			secret
		});
		remote.self = this._self;
		await this.connect(remote);
		return remote;
	}

	async connect(remote: ScriffRemote){
		return await remote_logic_connect(this._self, remote);
	}

	async exec(remote: ScriffRemote, command: string, parseColors = false){
		return await remote_logic_execute(this._self, remote, command, parseColors);
	};

}