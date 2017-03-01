import {Component, Input, OnInit} from '@angular/core';
import {UserPresence, userPresenceSelectOptions} from '../account/enums';
import {Profile} from '../account/profile';
import {AccountAuthService} from '../services/account-auth.service';
import {AccountProfileService} from '../services/account-profile.service';
import {AccountUserLookupService} from '../services/account-user-lookup.service';
import {EnvService} from '../services/env.service';
import {UrlStateService} from '../services/url-state.service';


/**
 * Angular component for account profile UI.
 */
@Component({
	selector: 'cyph-account-profile',
	styleUrls: ['../../css/components/account-profile.css'],
	templateUrl: '../../../templates/account-profile.html'
})
export class AccountProfileComponent implements OnInit {
	/** User profile. */
	public profile: Profile|undefined;

	/** @see UserPresence */
	public readonly statuses: typeof userPresenceSelectOptions	= userPresenceSelectOptions;

	/** Username of profile owner. */
	@Input() public username: string|undefined;

	/** @see UserPresence */
	public readonly userPresence: typeof UserPresence	= UserPresence;

	/** @inheritDoc */
	public async ngOnInit () : Promise<void> {
		await this.accountAuthService.ready;

		try {
			this.profile	= !this.username ?
				this.accountAuthService.current :
				await this.accountProfileService.getProfile(
					await this.accountUserLookupService.getUser(this.username)
				)
			;
		}
		catch (_) {}

		if (!this.profile) {
			this.urlStateService.setUrl('account/login');
		}
	}

	constructor (
		/** @see AccountAuthService */
		public readonly accountAuthService: AccountAuthService,

		/** @see AccountProfileService */
		public readonly accountProfileService: AccountProfileService,

		/** @see AccountUserLookupService */
		public readonly accountUserLookupService: AccountUserLookupService,

		/** @see EnvService */
		public readonly envService: EnvService,

		/** @see AccountProfileService */
		public readonly urlStateService: UrlStateService

	) {}
}
