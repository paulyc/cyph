import {IMessage} from './imessage';
import {Util} from '../util';


export class Message implements IMessage {
	/**
	 * @param event
	 * @param data
	 * @param id
	 */
	public constructor (
		public event: string = '',
		public data?: any,
		public id: string = Util.generateGuid()
	) {}
}
