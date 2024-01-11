import { ScriffRemoteModel } from "../models/remote.model";
import { ScriffType } from "../types/scriff.type";



export class ScriffRemote extends ScriffRemoteModel {

	self?: ScriffType;

	async connect() : Promise<ScriffRemote | undefined> {
		return await this.self?.remote?.connect(this);
	}

	async exec(command: string, parseColors = false) : Promise<string | undefined> {
		return await this.self?.remote?.exec(this, command, parseColors);
	}
}