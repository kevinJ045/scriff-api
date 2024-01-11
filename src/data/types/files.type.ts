import { Path } from "../../logic/utils/path.util";

export const shebangRegex = /\#\!\/usr\/bin\/env ([-a-z0-9+&@#\/%?=~+|!:,.;]+)/i;


function determineArgumentType(file: any){
	let filename = '', isFile = false;
	if(typeof file == 'string'){
		filename = file;
	} else if(FileType.isFile(file)){
		filename = file.name;
		isFile = true;
	}
	return {
		filename,
		isFile
	}
}

class FileType {
	static formatOf(file: any){
		let { filename } = determineArgumentType(file);
		var type = Path.ext(filename) || 'shell';
		if(file.content?.match(shebangRegex)){
			type = file.content.match(shebangRegex)[1];
		}
		if(type == 'text') type = Path.ext(filename);
		if(type == 'py') type = 'python';
		if(type == 'js') type = 'javascript';
		if(type == 'coffee') type = 'coffeescript';
		if(type == 'md') type = 'markdown';
		if(type == 'txt') type = 'text';
		if(type == 'sh') type = 'shell';
		if(type == 'bash') type = 'shell';
		if(type == 'ts') type = 'typescript';
		return type;
	}

	static determine(file: any){
		if(file?.isParent) return 'parent';
		let {
			isFile,
			filename
		} = determineArgumentType(file);
		
		const ext = Path.ext(filename);
		let name = 'unknown';
		
		if (/(js|txt|java|py|dwf|nobin|html|md|css|sh|co|coffee|yml|yaml|pkg)$/.test(ext)) {
			name = 'text';
		} else if (/(mp3|wav|aac|m4a|ogg|wma|flac|alac|aiff|dsd)$/.test(ext)) {
			name = 'audio';
		} else if (/(mp4|mkv|avi|mov|flv|wmv|webm|3gp|m4v)$/.test(ext)) {
			name = 'video';
		} else if (/(png|img|jpg|jpeg|webm)$/.test(ext)) {
			name = 'image';
		} else if (ext === 'run') {
			name = 'run';
		} else if (isFile && file.content?.match(shebangRegex)) {
			name = 'text';
		} else {
			name = 'unknown';
		}

		if(typeof file == "object" && 'content' in file && name == 'unknown'){
			if(file.content?.startsWith('data:')){
				let mime = file.content.split('data:')[1].split(';')[0];
				let type = mime.split('/')[0];
				name = type;
			}
		}

		return name;
	}

	static isFile(file: any, allProps = false){
		return typeof file == "string" ? false : file instanceof File || (allProps ? typeof file == 'object' && file.name && file.content && file.id && file.user : typeof file == 'object' && file.name && file.content);
	}
}

export default FileType;