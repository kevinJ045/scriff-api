import { User } from "../../data/entities/user.entity";
import Scriff from "../..";
import { Req } from "../utils/req.util";

export async function readFile(filename: string, user?: User){
	if(!user) user = Scriff.user.getUser();
	if(!user.token) user.token = "";


	var uname = user.username;

	if(filename.match(":")){
		uname = filename.split(":")[0];
		filename = filename.split(":")[1];
	}

	var file = await Req.get(Scriff.url.api('users/'+uname+"/files/"+filename).trim(), user.token, true);
	return file;
}
