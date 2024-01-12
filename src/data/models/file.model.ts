import { Model } from "./base.model";

export interface FileLike {
	name: string;
	content: string;
	size?: number;
	full?: boolean;
	parent: string | null;
	user?: string;
	id?: string;
	time?: number;
	type?: string;
	access?: string;
	permission?: string;
	isParent?: boolean;
}



export class FileModel extends Model<FileLike> implements FileLike {
	name: string = "";
	content: string = "";
	size: number = 0;
	full: boolean = false;
	parent: string | null = null;
	user: string = "";
	id: string = "";
	time: number = Date.now();
	access: string = "r";
	type: string = "";
	permission: string = "r";
	isParent: boolean = false;
}