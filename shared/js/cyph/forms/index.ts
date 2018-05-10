import * as msgpack from 'msgpack-lite';
import {Form, IForm} from '../proto';

const newForm			= (
	components: Form.IComponent[],
	id?: string
) : IForm => ({
	components,
	id
});

const newFormComponent	= (
	containers: (Form.IElementContainer|Form.IElementContainer[])[],
	id?: string,
	idSeparator?: string,
	isColumn?: boolean
) : Form.IComponent => ({
	containers: containers.reduce<Form.IElementContainer[]>((a, b) => a.concat(b), []),
	id,
	idSeparator,
	isColumn
});

const newFormContainer		= (
	elements: (Form.IElement|Form.IElement[])[],
	id?: string,
	idSeparator?: string,
	isColumn?: boolean
) : Form.IElementContainer => ({
	elements: elements.reduce<Form.IElement[]>((a, b) => a.concat(b), []),
	id,
	idSeparator,
	isColumn
});


const newFormElement	= <T extends {
	id?: string;
	label?: string;
	mask?: any;
	max?: number;
	min?: number;
	noGrow?: boolean;
	options?: string[];
	required?: boolean;
	value?: boolean|number|string;
	width?: number;
}> (elementType: Form.Element.Types) => (o?: T) => {
	const element: Form.IElement	= {
		id: o && o.id,
		label: o && o.label,
		mask: o && o.mask && msgpack.encode(o.mask),
		max: o && o.max,
		min: o && o.min,
		noGrow: o && o.noGrow === true,
		options: o && o.options,
		required: o && o.required,
		type: elementType,
		width: o && o.width
	};

	if (o && typeof o.value === 'boolean') {
		element.valueBoolean	= o.value;
	}
	else if (o && typeof o.value === 'number') {
		element.valueNumber		= o.value;
	}
	else if (o && typeof o.value === 'string') {
		element.valueString		= o.value;
	}

	return element;
};

/** Creates a new checkbox form element. */
export const checkbox		= newFormElement<{
	id?: string;
	label?: string;
	noGrow?: boolean;
	required?: boolean;
	value?: boolean;
	width?: number;
}>(Form.Element.Types.Checkbox);

/** Creates a new datepicker form element. */
export const datepicker		= newFormElement<{
	id?: string;
	label?: string;
	noGrow?: boolean;
	required?: boolean;
	value?: number;
	width?: number;
}>(Form.Element.Types.Datepicker);

/** Creates a new email input form element. */
export const emailInput		= newFormElement<{
	id?: string;
	label?: string;
	mask?: any;
	noGrow?: boolean;
	required?: boolean;
	value?: string;
	width?: number;
}>(Form.Element.Types.Email);

/** Creates a new text input form element. */
export const input			= newFormElement<{
	id?: string;
	label?: string;
	mask?: any;
	noGrow?: boolean;
	required?: boolean;
	value?: string;
	width?: number;
}>(Form.Element.Types.Input);

/** Creates a new number input form element. */
export const numberInput	= newFormElement<{
	id?: string;
	label?: string;
	mask?: any;
	max?: number;
	min?: number;
	noGrow?: boolean;
	required?: boolean;
	value?: number;
	width?: number;
}>(Form.Element.Types.Number);

/** Creates a new password input form element. */
export const passwordInput	= newFormElement<{
	id?: string;
	label?: string;
	mask?: any;
	noGrow?: boolean;
	required?: boolean;
	value?: string;
	width?: number;
}>(Form.Element.Types.Password);

/** Creates a new radio button group form element. */
export const radio			= newFormElement<{
	id?: string;
	label?: string;
	noGrow?: boolean;
	options?: string[];
	required?: boolean;
	value?: string;
	width?: number;
}>(Form.Element.Types.Radio);

/** Creates a new select dropdown form element. */
export const select			= newFormElement<{
	id?: string;
	label?: string;
	noGrow?: boolean;
	options?: string[];
	required?: boolean;
	value?: string;
	width?: number;
}>(Form.Element.Types.Select);

/** Creates a new slider form element. */
export const slider			= newFormElement<{
	id?: string;
	label?: string;
	max?: number;
	min?: number;
	noGrow?: boolean;
	value?: number;
	width?: number;
}>(Form.Element.Types.Slider);

/** Creates a new slide toggle button form element. */
export const slideToggle	= newFormElement<{
	id?: string;
	label?: string;
	noGrow?: boolean;
	required?: boolean;
	value?: boolean;
	width?: number;
}>(Form.Element.Types.SlideToggle);

/** Creates a new text form element. */
export const text			= newFormElement<{
	id?: string;
	label?: string;
	noGrow?: boolean;
	value?: string;
	width?: number;
}>(Form.Element.Types.Text);

/** Creates a new textbox form element. */
export const textarea		= newFormElement<{
	id?: string;
	label?: string;
	mask?: any;
	noGrow?: boolean;
	required?: boolean;
	value?: string;
	width?: number;
}>(Form.Element.Types.Textarea);

/** Creates a new time input form element. */
export const timeInput		= newFormElement<{
	id?: string;
	label?: string;
	mask?: any;
	max?: number;
	min?: number;
	noGrow?: boolean;
	required?: boolean;
	value?: string;
	width?: number;
}>(Form.Element.Types.Time);

/** Creates a new URL input form element. */
export const urlInput		= newFormElement<{
	id?: string;
	label?: string;
	mask?: any;
	noGrow?: boolean;
	required?: boolean;
	value?: string;
	width?: number;
}>(Form.Element.Types.URL);

/** Form title element row. */
export const title		= (titleText: string) : Form.IElementContainer => {
	return newFormContainer([text({label: titleText, width: 100})]);
};

/** Phone number element row. */
export const phone		= (id: string = 'PhoneNumber.Home') : Form.IElement => {
	return input({
		id,
		label: 'Phone Number',
		mask: {
			mask: [
				'(', /[1-9]/, /\d/, /\d/, ')', ' ',
				/\d/, /\d/, /\d/, '-',
				/\d/, /\d/, /\d/, /\d/
			],
			showMask: true
		},
		width: 20
	});
};

/** Email address element row. */
export const email		= (id: string = 'EmailAddresses[0]') : Form.IElement => {
	return emailInput({id, label: 'Email', required: true});
};

/** Name element row. */
export const name		= (id?: string) : Form.IElementContainer => {
	return newFormContainer(
		[
			input({id: 'FirstName', label: 'First Name', required: true}),
			input({id: 'MiddleName', label: 'Middle Name'}),
			input({id: 'LastName', label: 'Last Name', required: true})
		],
		id
	);
};

/** Address element row. */
export const address	= (id: string = 'Address') : Form.IElementContainer => {
	return newFormContainer(
		[
			input({id: 'StreetAddress', label: 'Address'}),
			input({id: 'City', label: 'City'}),
			input({id: 'State', label: 'State', width: 10}),
			input({id: 'ZIP', label: 'Zip', width: 25})
		],
		id,
		undefined,
		false
	);
};

/** Address element row. */
export const streetAddress	= (id: string = 'StreetAddress') : Form.IElementContainer => {
	return newFormContainer(
		[
			input({id: 'StreetAddress', label: 'Address', width: 50})
		],
		id,
		undefined,
		false
	);
};

export const addressDetails	= (id: string = 'AddressDetails') : Form.IElementContainer => {
	return newFormContainer(
		[
			input({id: 'City', label: 'City', width: 15}),
			input({id: 'State', label: 'State', width: 10}),
			input({id: 'ZIP', label: 'Zip', width: 25})
		],
		id,
		undefined,
		false
	);
};

/** SSN element row. */
export const ssn		= (id: string = 'SSN') : Form.IElement => {
	return input({
		id,
		label: 'Social Security Number',
		mask: {
			mask: [
				/\d/, /\d/, /\d/, '-',
				/\d/, /\d/, '-',
				/\d/, /\d/, /\d/, /\d/
			],
			placeholderChar: '#',
			showMask: true
		},
		width: 15
	});
};

/** Contact information component. */
export const contact			= (id?: string) : Form.IComponent => {
	return newFormComponent(
		[
			name(),
			newFormContainer([
				email(),
				phone(),
				ssn()
			]),
			address()
		],
		id,
		undefined,
		false
	);
};

/** Basic patient info for Telehealth Patients */
export const basicInfo			= (id?: string) : Form.IComponent => {
	return newFormComponent(
		[
			newFormContainer([
				datepicker({id: 'DOB', label: 'Date of Birth', width: 20, required: true}),
				select({id: 'Sex', label: 'Sex', options: ['Male', 'Female'], required: true}),
				select({
					id: 'MaritalStatus',
					label: 'Marital Status',
					options: ['Single', 'Married']
				}),
				numberInput({label: 'Height (in)', min: 20, max: 108, width: 15, required: false}),
				numberInput({label: 'Weight (lbs)', max: 1500, width: 15, required: false})
			])
		],
		id
	);
};

/** Insurance information element row. */
export const insurance			= (id?: string) : Form.IElementContainer => {
	return newFormContainer(
		[
			input({label: "Insured's name"}),
			input({label: 'Relationship'}),
			input({label: 'Employer'}),
			input({label: 'Phone Number'})
		],
		id
	);
};

/** Insurance information component. */
export const insuranceComponent	= (id?: string) : Form.IComponent => {
	return newFormComponent(
		[
			title('Primary Insurance'),
			insurance(),
			address(),
			newFormContainer([input({label: 'Insurance Company'})]),
			title('Secondary Insurance'),
			insurance(),
			address(),
			newFormContainer([input({label: 'Insurance Company'})])
		],
		id
	);
};

/** Opt in or out of Cyph as preferred contact method & contact list */
export const optInOut			= () : Form.IComponent => newFormComponent([
	newFormContainer([
		checkbox({label: 'Use Cyph as preferred contact method', noGrow: true, value: true}),
		checkbox({label: 'Opt-In to receive updates & tips from Cyph', noGrow: true})
	])
]);

export const height		= (id: string = 'height') : Form.IElement[] => [
	numberInput({
		id,
		label: 'Feet',
		max: 11,
		min: 0,
		width: 5
	}),
	numberInput({
		id,
		label: 'Inches',
		max: 11,
		min: 0,
		width: 5
	})
];

/** New patient form. */
export const newPatient			= () : IForm => newForm(
	[
		newFormComponent([title('Basic Information')]),
		contact('redoxPatient.Demographics'),
		basicInfo('redoxPatient.Demographics'),
		insuranceComponent(),
		optInOut()
	],
	'patient'
);

export const patientProfile		= () : IForm => newForm(
	[
		contact('redoxPatient.Demographics'),
		newFormComponent(
			[
				newFormContainer(
					[
						datepicker({id: 'DOB', label: 'Date of Birth', width: 10, required: true}),
						select({
							id: 'Sex',
							label: 'Sex',
							options: ['Male', 'Female'],
							width: 20
						}),
						select({
							id: 'MaritalStatus',
							label: 'Marital Status',
							options: ['Single', 'Married']
						}),
						numberInput(
							{label: 'Weight (lbs)', max: 1500, width: 10, required: false}
						),
						height()
					],
					undefined,
					undefined,
					false
				)
			],
			undefined,
			undefined,
			true
		)
	]
);

export const doctorProfile		= () : IForm => newForm(
	[
		newFormComponent([title('Doctor Profile')])
	],
	'doctor-profile'
);

export const orgProfile		= () : IForm => newForm(
	[
		newFormComponent([title('Org Profile')])
	],
	'org-profile'
);

export const staffProfile		= () : IForm => newForm(
	[
		newFormComponent([title('Staff Profile')])
	],
	'staff-profile'
);
