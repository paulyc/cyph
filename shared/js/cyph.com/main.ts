/**
 * @file Entry point of cyph.com.
 */

/// <reference path="../preload/unsupportedbrowsers.ts" />
/// <reference path="../preload/fakecrypto.ts" />
/// <reference path="../preload/jquery.ts" />

import {AppModule} from './appmodule';
import {CyphDemo} from './cyphdemo';
import {Elements} from './elements';
import {HomeSections, PageTitles, Promos, States} from './enums';
import {UI} from './ui';
import {Loaded} from '../preload';
import * as Cyph from '../cyph';


Cyph.UI.Elements.html.attr('ng-controller', Cyph.Config.angularConfig.rootController);

angular.
	module(Cyph.Config.angularConfig.rootModule, [
		'ngMaterial',
		Cyph.UI.Components.ChatCyphertext.title,
		Cyph.UI.Components.ChatMain.title,
		Cyph.UI.Components.ChatMessageBox.title,
		Cyph.UI.Components.ChatToolbar.title,
		Cyph.UI.Components.Checkout.title,
		Cyph.UI.Components.Contact.title,
		Cyph.UI.Components.SignupForm.title,
		Cyph.UI.Directives.Markdown.title
	]).
	controller(Cyph.Config.angularConfig.rootController, [
		'$scope',
		'$mdDialog',
		'$mdToast',
		'$mdSidenav',

		($scope, $mdDialog, $mdToast, $mdSidenav) => {
			self['Cyph']	= Cyph;
			$scope.Cyph		= Cyph;
			$scope.Cyph.com	= {
				CyphDemo,
				Elements,
				HomeSections,
				PageTitles,
				Promos,
				States,
				UI
			};

			$(() => {
				Elements.load();

				const mobileMenu: () => Cyph.UI.ISidebar		= () => $mdSidenav('main-toolbar-sidenav');
				const demoDialogManager: Cyph.UI.IDialogManager	= new Cyph.UI.DialogManager($mdDialog, $mdToast);

				$scope.ui	= new UI(mobileMenu, demoDialogManager);
				self['ui']	= $scope.ui;
			});
		}
	]).
	config(Cyph.Config.angularConfig.config)
;


AppModule.upgradeAdapter.bootstrap(
	document.documentElement,
	[Cyph.Config.angularConfig.rootModule]
);


/* Redirect to Onion site when on Tor */

if (!Cyph.Env.isOnion) {
	(async () => {
		const response: string	= await Cyph.Util.request({
			url: `https://ping.${Cyph.Config.onionRoot}`,
			discardErrors: true
		});

		if (response === 'pong') {
			locationData.href	=
				'https://' +
				Cyph.Config.onionRoot +
				locationData.href.split(locationData.host + '/')[1]
			;
		}
	})();
}


export {Loaded};
