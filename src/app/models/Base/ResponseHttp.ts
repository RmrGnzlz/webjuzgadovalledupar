export class ResponseHttp {
	constructor(
		public message?: string,
    public data?: Object,
    public state?:boolean
	) { }
}
