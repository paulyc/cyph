import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {BaseProvider} from '../../base-provider';
import {IForm} from '../../proto';
import {StringsService} from '../../services/strings.service';
import {DynamicFormComponent} from '../dynamic-form';


/**
 * Angular component for confirm dialog.
 */
@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'cyph-dialog-confirm',
	styleUrls: ['./dialog-confirm.component.scss'],
	templateUrl: './dialog-confirm.component.html'
})
export class DialogConfirmComponent extends BaseProvider {
	/** Cancel button text. */
	public cancel?: string;

	/** Content. */
	public content?: string;

	/** @see DynamicFormComponent */
	@ViewChild(DynamicFormComponent) public dynamicForm?: DynamicFormComponent;

	/** Form for prompt. If defined, will render and return response. */
	public form?: IForm;

	/** Indicates whether content is Markdown. */
	public markdown: boolean	= false;

	/** OK button text. */
	public ok?: string;

	/** If not undefined, will prompt for input. */
	public prompt?: string;

	/** Prompt placeholder text. */
	public promptPlaceholder?: string;

	/** Title. */
	public title?: string;

	constructor (
		/** Dialog instance. */
		public readonly matDialogRef: MatDialogRef<DialogConfirmComponent>,

		/** @see StringsService */
		public readonly stringsService: StringsService
	) {
		super();
	}
}
