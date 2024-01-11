import { ScriffRemote } from "../data/entities/remote.entity";
import { ScriffType } from "../data/types/scriff.type";
import { Req } from "./utils/req.util";

export function parseOutputColors(output: string){
  return output.replace(/\[\[([^\]]+)\]([^\]]+)\]/g, '$2');
}

export async function remote_logic_connect(self: ScriffType, remote: ScriffRemote){
	if(remote.connected) return remote;
	const url = self.url.join(self.url.remote(remote),'connect?s='+remote.secret);
	let connected = await Req.get<string>(url, self.user.getUser().token, true);
	if(connected == "true") return remote.set_connection(true);
	return remote;
}

export async function remote_logic_execute(self: ScriffType, remote: ScriffRemote, command: string, parseColors = false){
	const url = self.url.join(self.url.remote(remote),'?s='+remote.secret+'&q='+command);
	let output = await Req.get<string>(url, self.user.getUser().token, true);
	return parseColors ? parseOutputColors(output) : output;
}