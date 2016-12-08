import {lib} from './lib';
import * as NativeCrypto from './nativecrypto';


/** Equivalent to sodium.crypto_onetimeauth. */
export class OneTimeAuth {
	/** MAC length. */
	public readonly bytes: number		=
		this.isNative ?
			NativeCrypto.oneTimeAuth.bytes :
			lib.sodium.crypto_onetimeauth_BYTES
	;

	/** Key length. */
	public readonly keyBytes: number	=
		this.isNative ?
			NativeCrypto.oneTimeAuth.keyBytes :
			lib.sodium.crypto_onetimeauth_KEYBYTES
	;

	/** Signs message. */
	public async sign (
		message: Uint8Array,
		key: Uint8Array
	) : Promise<Uint8Array> {
		return this.isNative ?
			NativeCrypto.oneTimeAuth.sign(
				message,
				key
			) :
			lib.sodium.crypto_onetimeauth(
				message,
				key
			)
		;
	}

	/** Verifies MAC. */
	public async verify (
		mac: Uint8Array,
		message: Uint8Array,
		key: Uint8Array
	) : Promise<boolean> {
		return this.isNative ?
			NativeCrypto.oneTimeAuth.verify(
				mac,
				message,
				key
			) :
			lib.sodium.crypto_onetimeauth_verify(
				mac,
				message,
				key
			)
		;
	}

	constructor (
		/** @ignore */
		private readonly isNative: boolean
	) {}
}
