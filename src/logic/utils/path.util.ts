import Scriff from "../..";

export class Path {

	static pathRegex = /([A-Za-z0-9.-_\[\]\(\)\{\}*&^%$#@!~`|\\"'><]+)(\/|\:)([A-Za-z0-9.-_\[\]\(\)\{\}*&^%$#@!~`|\\"'><]+)/;

	static userAndName(path: any) {
		if(!path) return null;
		if(path.name && path.user){
			return {name: path.name, user: path.user};
		}
		if(path.name){
			return Path.userAndName(path.name);
		}
		if(path.match(":")){
			return {
				user: path.split(":")[0],
				name: path.split(":")[1]
			};
		} else {
			return {name: path, user: Scriff.user.getUser().username};
		}
	}

	static isFilePath(p: any){
		if(p.match(Path.pathRegex)){
			let m = p.match(Path.pathRegex);
			return { name: m[3], user: m[1] };
		}
		return false;
	}

	static fileToPath(file: any){
		return file.user+":"+file.name;
	}

	static isFileName(name: any){
		if(!name) return false;
		return name.name && name.user;
	}

	static ext(filename: any) {
		if(filename.startsWith('.')){
			filename = filename.substr(1, filename.length);
		}
		const lastIndex = filename.lastIndexOf('.');
	
		if (lastIndex !== -1 && lastIndex !== filename.length - 1) {
			return filename.slice(lastIndex + 1).toLowerCase();
		}

		return (filename.match(/(.+)\.(.+)/) ? filename.split('.').pop() : 'bash').toLowerCase();
	}
	

}