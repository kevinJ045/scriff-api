import { User } from "../../data/entities/user.entity";
import Scriff from "../..";
import { Req } from "../utils/req.util";


export async function updateFile(fileData: any, user?: User){
	if(!user) user = Scriff.user.getUser();
	if(!user.token) user.token = "";
	await Req.post(Scriff.url.api('file/update'), fileData, user.token);
	return true;
}