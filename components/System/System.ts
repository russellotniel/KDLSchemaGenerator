import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import { ReactComponent as SendIcon } from '../../images/icon-send.svg';

interface CheckboxProps {
	features: string[];
	handleTableFeatures: (features: string) => void;
}

interface CheckboxValue {
	label: string;
	value: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ features, handleTableFeatures }) => {
	const [input, setInput] = useState<string>('');

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setInput(event.target.value);
	};

	const [checkedValues, setCheckedValues] = useState<string[]>([]);

	// Define an array of checkbox values
	const checkboxValues: CheckboxValue[] = features.map((x) => {
		return { label: x, value: x };
	});

	// Handle checkbox change event
	const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
		// Get the checked value
		const checkedValue = event.target.value;

		// If the checkbox is checked, add the value to the array
		if (event.target.checked) {
			setCheckedValues([...checkedValues, checkedValue]);
		} else {
			// If the checkbox is unchecked, remove the value from the array
			setCheckedValues(checkedValues.filter((value) => value !== checkedValue));
		}
	};

	const combinedString = checkedValues
		.reduce((acc: string[], currentValue: string) => {
			const matchedCheckbox = checkboxValues.find((checkbox) => checkbox.value === currentValue);
			if (matchedCheckbox) {
				acc.push(matchedCheckbox.label);
			}
			return acc;
		}, [])
		.join(', ');

	return (
		<div className='w-100 p-4'>
			{checkboxValues.map((checkbox) => (
				<div key={checkbox.value} style={{ textAlign: 'left' }}>
					<input className='form-check-input' type='checkbox' id={checkbox.value} value={checkbox.value} checked={checkedValues.includes(checkbox.value)} onChange={handleCheckboxChange} />
					<label htmlFor={checkbox.value}>{checkbox.label}</label>
				</div>
			))}
			<div className='text-end'>
				<button
					className='btn btn-success'
					onClick={() => {
						handleTableFeatures(combinedString);
					}}
				>
					Submit
				</button>
			</div>
		</div>
	);
};

export default Checkbox;
