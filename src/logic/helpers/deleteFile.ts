import { User } from "../../data/entities/user.entity";
import Scriff from "../..";
import { Req } from "../utils/req.util";

export async function unlink(id: string, user?: User){
	if(!user) user = Scriff.user.getUser();
	if(!user.token) user.token = "";
	return await Req.post(Scriff.url.api("file/rm"), { id }, user.token);
}