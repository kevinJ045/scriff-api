import { User } from "../../data/entities/user.entity";
import Scriff from "../..";
import { Req } from "../utils/req.util";


export async function createFile({ name, content, type }, user?: User){
	if(!user) user = Scriff.user.getUser();
	if(!user.token) user.token = "";
	return await Req.post<Record<string, any>>(Scriff.url.api("file/add"), { name, content, type }, user.token);
}