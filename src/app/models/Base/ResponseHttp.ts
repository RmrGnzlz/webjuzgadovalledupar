export class ResponseHttp<T> {
	constructor(
		public message?: string,
    public data?: T | Array<T>,
    public state?:boolean
	) { }
}
