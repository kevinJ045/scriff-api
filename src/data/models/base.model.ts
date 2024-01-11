

export class Model<ModelBase = object> {
	__strict__ = true; 

	set(object: ModelBase){
		for(let i in object as object){
			if(this.__strict__ ? (i in (this as object)) : true) (this as any)[i] = object[i];
		}
		return this;
	}

	toJson(){
		return JSON.stringify(this);
	}

	fromJson(json: string | ModelBase){

		if(typeof json == "string"){
			json = JSON.parse(json);
		}

		this.set(json as ModelBase);

		return this;
	}

}