import {Component, OnInit} from '@angular/core';
import {States, UserPresence} from '../account/enums';
import {AccountAuthService} from '../services/account-auth.service';
import {AccountUserLookupService} from '../services/account-user-lookup.service';
import {AccountService} from '../services/account.service';
import {MdSidenavService} from '../services/material/md-sidenav.service';
import {UrlStateService} from '../services/url-state.service';
import {util} from '../util';


/**
 * Angular component for account home UI.
 */
@Component({
	selector: 'cyph-account-menu',
	styleUrls: ['../../css/components/account-menu.css'],
	templateUrl: '../../../templates/account-menu.html'
})
export class AccountMenuComponent implements OnInit {
	/** @ignore */
	public menu: Promise<angular.material.ISidenavObject>;

	/** @ignore */
	public menuLock: boolean		= true;

	/** @see States */
	public states: typeof States	= States;

	/** @see UserPresence */
	public readonly userPresence: typeof UserPresence	= UserPresence;

	/** Closes account menu. */
	public async closeMenu () : Promise<void> {
		return util.lockTryOnce(
			this.menuLock,
			async () => {
				await util.sleep();
				(await this.menu).close();
			}
		);
	}

	/** Goes to state. */
	public async goToState (state: States) : Promise<void> {
		this.accountService.state	= state;
		this.urlStateService.setUrl('account/' + States[state]);
	}

	/** @inheritDoc */
	public async ngOnInit () : Promise<void> {
		await this.accountAuthService.ready && this.accountAuthService.current;
		this.openMenu();
	}

	/** Opens account menu. */
	public async openMenu () : Promise<void> {
		await util.sleep();
		(await this.menu).open();
	}

	constructor (
		mdSidenavService: MdSidenavService,

		/** @see AccountAuthService */
		public readonly accountAuthService: AccountAuthService,

		/** @see AccountService */
		public readonly accountService: AccountService,

		/** @see AccountContactsService */
		public readonly accountUserLookupService: AccountUserLookupService,

		/** @see AccountContactsService */
		public readonly urlStateService: UrlStateService
	) {
		this.menu	= mdSidenavService.getSidenav('menu');
	}
}
