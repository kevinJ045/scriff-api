import { createFile } from "../../logic/helpers/createFile";
import { unlink } from "../../logic/helpers/deleteFile";
import { readFile } from "../../logic/helpers/readFile";
import { updateFile } from "../../logic/helpers/updateFile";
import { Path } from "../../logic/utils/path.util";
import { FileLike, FileModel } from "../models/file.model";
import FileType, { shebangRegex } from "../types/files.type";
import { User } from "./user.entity";


function _createFile(file: any){
	const type = FileType.determine(file.name);
	const typenote = "#!/usr/bin/env "+type+"\n";
	if(!file.content.match(shebangRegex)){
		file.content = typenote + file.content;
	}
	return { typenote, type };
}


function getFileData(options: any, file: any){
	let all = { id: file.id, parent: file.parent, name: file.name, content: file.content };
	if(options){
		if(!options.id) delete all.id;
		if(!options.parent) delete all.parent;
		if(!options.name) delete all.name;
		if(!options.content) delete all.content;
	}
	return all;
}

export class ScriffFile extends FileModel {

	async read(full: boolean = false, user?: User){
		if(full) this.full = true;
		return this.set(await readFile(this.user+':'+this.name, user) as any);
	}

	async sync(options: { id?: string, parent?: string, name?: string, content?: string }, user?: User){
		if(!options.id) options.id = this.id;
		let fileData = getFileData(options, this);
		await updateFile(fileData, user);
		return this;
	}

	async setParent(parent: string, user?: User){
		return await this.sync({
			id: this.id,
			parent
		}, user);
	}

	async setName(name: string, user?: User){
		return await this.sync({
			id: this.id,
			name
		}, user);
	}

	async update(content: string, user?: User){
		return await this.sync({
			id: this.id,
			content
		}, user);
	}

	async exists(user?: User){
		var file = await readFile(Path.fileToPath(this), true, user);
		return file && !file.failed;
	}

	async create(user?: User){
		const { type, typenote } = _createFile(this);
		let file = await createFile({
			name: this.name,
			type,
			content: this.content || typenote+"..."
		}, user);
		return this.set(file as FileLike); 
	}

	append(content: string){
		this.content += content;
		return this;
	}

	prepend(content: string){
		this.content = content + this.content;
		return this;
	}

	async forceWrite(content: string, user?: User){
		if(!await this.exists(user)){
			await this.create(user);
		}
		if(!this.id){
			await this.read(this.full, user);
		}
		return await this.update(content, user);
	}

	trimTypeIdentifier(){
		return this
			.content
			.replace(shebangRegex, '');
	}

	async unlink(user?: User){
		return await unlink(this.id, user);
	}

}