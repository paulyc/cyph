import * as msgpack from 'msgpack-lite';
import {potassiumUtil} from '../../crypto/potassium/potassium-util';
import {IProto} from '../../iproto';

export * from './json';

/** Deserializes bytes to data. */
export const deserialize = async <T>(
	proto: IProto<T>,
	bytes: Uint8Array | string
) : Promise<T> => {
	return proto.decode(potassiumUtil.fromBase64(bytes));
};

/** Serializes data value to binary byte array. */
export const serialize = async <T>(
	proto: IProto<T>,
	data: T
) : Promise<Uint8Array> => {
	const err = await proto.verify(data);
	if (err) {
		throw new Error(err);
	}
	const o = await proto.encode(data);
	return o instanceof Uint8Array ? o : o.finish();
};

/** Deserializes arbitrary data from a base64 string. */
export const dynamicDeserialize = (bytes: Uint8Array | string) : any => {
	const o = msgpack.decode(potassiumUtil.fromBase64(bytes));
	/* eslint-disable-next-line no-null/no-null */
	return o === null ? undefined : o;
};

/** Serializes arbitrary data to a base64 string. */
export const dynamicSerialize = (data: any) : string =>
	potassiumUtil.toBase64(msgpack.encode(data));

/** Parses query string (no nested URI component decoding for now). */
export const fromQueryString = (
	search: string = locationData.search.slice(1)
) : any =>
	!search ?
		{} :
		search
			.split('&')
			.map(p => p.split('='))
			.reduce<any>(
				(o, [key, value]) => ({
					...o,
					[decodeURIComponent(key)]: decodeURIComponent(value)
				}),
				{}
			);

/**
 * Serializes o to a query string (cf. jQuery.param).
 * @param parent Ignore this (internal use).
 */
export const toQueryString = (o: any, parent?: string) : string =>
	Object.keys(o)
		.map((k: string) => {
			const key = parent ? `${parent}[${k}]` : k;

			return typeof o[k] === 'object' ?
				toQueryString(o[k], key) :
				`${encodeURIComponent(key)}=${encodeURIComponent(o[k])}`;
		})
		.join('&')
		.replace(/%20/g, '+');
