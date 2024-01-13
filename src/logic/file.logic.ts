import { ScriffFile } from "../data/entities/file.entity";
import { FileLike } from "../data/models/file.model";
import { ScriffType } from "../data/types/scriff.type";
import md5 from "./helpers/md5";
import { Req } from "./utils/req.util";



export async function file_logic_ls(self: ScriffType, {
	user,
	parent,
	showParents = true,
	sort,
	special,
	onlynames,
	token
} : any){
	if(!user) user = self.user.getUser().username;
	if(!token) token = self.user.getUser().token || "";
	let files: { container: { files:  (FileLike | string)[] } } | (FileLike | string)[] = onlynames ? await Req.get(self.url.api((user ? 'users/' + user : 'self') + '/files/names?show_parent='+showParents+(parent ? '&parent='+parent : '')), token) : await Req.get(self.url.api((user ? 'users/' + user : 'self') + '/all'), token);
	if(onlynames) return sort ? (files as any).sort() : files;
	let all: (FileLike | string)[] = [];

	if ((files as any).container) {
		files = (files as any).container.files;
		all = [...files as any[]];
	}

	if (parent && (files as any).length) {
		files = (files as FileLike[]).filter(file => file.parent == parent);
	}

	if (showParents && (files as FileLike[]).length) {
		files = (files as FileLike[]).map(file => {
			if (file.parent) {
				return {
					name: file.parent,
					id: file.parent,
					content: "contain: pp",
					type: 'parent'
				};
			} else {
				return file;
			}
		}) as FileLike[];
	}

	if (files && !(files as any).failed) {
		(files as FileLike[]).forEach((_file: FileLike) => {
			const file = (files as FileLike[]).filter(f => f.name === _file.name);
			if (file.length > 1) {
				files = (files as FileLike[]).filter(sfile => sfile.name != _file.name);
				(files as FileLike[]).push(file[0]);
			}
		});
	}

	const _convert = (file: FileLike) => {
		file.user = user;
		return new ScriffFile().set(file);
	}

	let _files = (sort ? file_logic_sortFiles(files as any[]) : (files as FileLike[] || [])).map(_convert)
	
	if(special === true){
		let fileList = {};
		_files.sort((a: FileLike, b: FileLike) => a.isParent ? -1 : (b.isParent ? -1 : 1)).forEach(file => {
			(fileList as any)[file.id] = file;
			if(file.isParent){
				(fileList as any)[file.id].children = (all as FileLike[]).filter((f: FileLike) => f.parent == file.id).map(_convert);
			}
		});
		return fileList;
	}
	
	return _files;
}

export function file_logic_sortFiles(files: (FileLike)[]){
	if(!Array.isArray(files)) return [];
	files = files.map(file => {if(!file.name) file.name = "Untitled";return file});
	return files.sort((a, b) => {
		const nameA = a.name.toUpperCase();
		const nameB = b.name.toUpperCase();
		return a.type == 'parent' ? -1 : nameA < nameB ? -1 : (nameA > nameB ? 1 : 0);
	}).sort((a, b) => {
		const nameA = a.name.toUpperCase();
		const nameB = b.name.toUpperCase();
		return a.type == 'parent' ? (nameA < nameB ? -1 : (nameA > nameB ? 1 : 0)) : 0;
	});
}


export async function file_logic_getLength(self: ScriffType, file: FileLike, token?: string){
	return parseInt(await Req.get<string>(self.url.api('users/'+(file.user || self.user.getUser().username)+"/files/"+file.name+'/length'), token));
}


export async function file_logic_getMD5(self: ScriffType, file: FileLike, token?: string){
	return await Req.get<string>(self.url.api('users/'+(file.user || self.user.getUser().username)+"/files/"+file.name+'/md5/'+md5(file.content)), token);
}

export async function file_logic_permFile(self: ScriffType, username: string, id: string, permission: string, token?: string) {
	return await Req.post(self.url.api('/file/permission/'+username+'/'+id+'/'), {username, permission}, token);
}