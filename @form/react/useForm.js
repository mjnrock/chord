import { useEffect, useState } from "react";

export function useForm(schema, { onUpdate, onValidation, onSubmit } = {}) {
	//TODO: This should use a Form Registry to store the state -- create a Form Registry from @schema
	const [ state, setState ] = useState(schema);

	useEffect(() => {
		setState(schema);
	}, [ schema ]);

	const update = (id, value) => {
		const next = { ...state };
		const field = next[ id ];

		if(!field) {
			console.warn(`Field ${ id } does not exist.`);
			return;
		}

		field.state = value;

		setState(next);

		if(onUpdate) {
			onUpdate(next);
		}
	};

	const validate = (id) => {
		const next = { ...state };
		const field = next[ id ];

		if(!field) {
			console.warn(`Field ${ id } does not exist.`);
			return;
		}

		let isValid = true;
		if(field.validation) {
			const { required, validator, regex, min, max } = field.validation;

			if(validator) {
				isValid = validator(field.state);
			} else if(regex) {
				isValid = new RegExp(regex).test(field.state);
			} else if(min || max) {
				isValid = (min && field.state >= min) && (max && field.state <= max);
			} else if(required) {
				isValid = !!field.state;
			}
		}

		if(onValidation) {
			onValidation(id, isValid);
		}

		return isValid;
	};
	const validateAll = () => {
		const next = { ...state };

		for(const [ id, field ] of Object.entries(next)) {
			//TODO: Since this'll be a Form Registry, filter to only be UUID keys, to avoid redundant validation
			if(!validate(id)) {
				return false;
			}
		}

		return true;
	};

	const submit = () => {
		const next = { ...state };

		if(!validateAll()) {
			return;
		}

		if(onSubmit) {
			onSubmit(next);
		}
	};

	return {
		state,

		update,
		validate,
		validateAll,
		submit,
	};
};

export default useForm;