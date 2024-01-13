import { ScriffFile } from "../data/entities/file.entity";
import { User } from "../data/entities/user.entity";
import { FileLike } from "../data/models/file.model";
import { username } from "../data/types/auth.type";
import { CommonClass } from "./base.class";
import { file_logic_getLength, file_logic_getMD5, file_logic_ls, file_logic_permFile, file_logic_sortFiles } from "./file.logic";
import { Path } from "./utils/path.util";

const fileFromName = (filename: string | ScriffFile) => filename instanceof ScriffFile ? filename : new ScriffFile().fromJson({
	...Path.userAndName(filename)
});

export class FS extends CommonClass {

	async ls(username: username, {
		folderName,
		allFiles,
		sort,
		namesOnly,
		special,
	} : {
		namesOnly?: boolean,
		folderName?: string | null,
		special?: boolean,
		sort?: boolean,
		allFiles?: boolean
	} = {
		folderName: null,
		allFiles: false,
		sort: false,
		namesOnly: false,
		special: false
	}, token?: string){
		if(folderName == "/") folderName = null;

		if(allFiles == undefined) allFiles = false;
		if(special == undefined) special = false;
		if(sort == undefined) sort = false;
		if(namesOnly == undefined) namesOnly = false;

		return await file_logic_ls(this._self, {
			user: username,
			parent: folderName,
			onlynames: namesOnly,
			special,
			sort,
			showParents: !allFiles,
			token
		});
	}

	sort(files: FileLike[]){
		return file_logic_sortFiles(files);
	}

	file(filename: string | ScriffFile){
		return fileFromName(filename);
	}

	async readFile(filename: string | ScriffFile, full = false, user?: User){
		const file = fileFromName(filename);
		await file.read(full, user);
		return file;
	}

	async existsSync(filename: string | ScriffFile, user?: User){
		const file = fileFromName(filename);
		return await file.exists(user);
	}

	async writeFile(filename: string | ScriffFile, content: string, user?: User){
		const file = fileFromName(filename);
		await file.update(content, user);
		await file.read(true, user);
		return file;
	}

	async forceWriteFile(filename: string | ScriffFile, content: string, user?: User){
		const file = fileFromName(filename);
		await file.forceWrite(content, user);
		await file.read(true, user);
		return file;
	}

	async unlink(filename: string | ScriffFile, user?: User){
		const file = fileFromName(filename);
		return await file.unlink(user);
	}

	async setParent(filename: string | ScriffFile, parent: string, user?: User){
		const file = fileFromName(filename);
		await file.read(true, user);
		await file.setParent(parent, user);
		return file;
	}

	async setName(filename: string | ScriffFile, name: string, user?: User){
		const file = fileFromName(filename);
		await file.read(true, user);
		await file.setName(name, user);
		return file;
	}

	async size(filename: string | ScriffFile, user?: User){
		const file = fileFromName(filename);
		await file.read(true, user);
		file.size = 0;
		return file;
	}

	async length(filename: string | ScriffFile, user?: User){
		const file = fileFromName(filename);
		await file.read(true, user);
		return await file_logic_getLength(this._self, file, user?.token);
	}

	async hasChange(file: ScriffFile, user?: User){
		return (await file_logic_getMD5(this._self, file, user?.token)) == 'true';
	}

	async setPermission(file: ScriffFile, user: string, perm: string, asUser?: User){
		let permission = file.permission || "";
		permission = permission.replace(new RegExp(user+":([a-zA-Z]+);"), '');
		if(perm != 'rm'){
			if(['a', 'r', 'w', 'n'].includes(perm)) permission += user+":"+perm+";"
		}
		file.permission = permission;
		await file_logic_permFile(this._self, user, file.id, perm, asUser?.token);
	}

}