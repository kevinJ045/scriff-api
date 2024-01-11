import { ScriffFile } from "../data/entities/file.entity";
import { User } from "../data/entities/user.entity";
import { CommonClass } from "./base.class";
import { Path } from "./utils/path.util";

const fileFromName = (filename: string | ScriffFile) => filename instanceof ScriffFile ? filename : new ScriffFile().fromJson({
	...Path.userAndName(filename)
});

export class FS extends CommonClass {

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

}