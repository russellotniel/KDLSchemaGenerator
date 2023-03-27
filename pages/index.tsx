import React, { useState } from 'react';
import UserStories from '../components/UserStories/UserStories';
import { SystemGenerator, TableGenerator } from '../helpers/helpers';
import System from '../components/System/System';
import TableFeatures from '../components/TableFeatures/TableFeatures';
import { Spinner } from 'react-bootstrap';

const SqlGenerator: React.FC = () => {
	//loading
	const [loading, setLoading] = useState(false);
	//Stepper
	const [step, setStep] = useState(1);
	const nextStep = () => {
		setStep(step + 1);
	};
	const prevStep = () => {
		setStep(step - 1);
	};

	//UserStories
	const [systemFeatures, setSystemFeatures] = useState([]);
	const handleSystemFeatures = async (features: string) => {
		setLoading(true);
		await SystemGenerator(features)
			.then((data) => {
				return data.json();
			})
			.then((data) => {
				const arr = data.choices[0].message.content
					.replace(/\n/g, '')
					.split('*')
					.filter((item: string) => item !== '')
					.map((item: string) => item.trim());
				setSystemFeatures(arr);
				setLoading(false);
				nextStep();
			})
			.catch((e) => {
				alert('Error occured. Please Try Again');
			});
	};

	//system
	const [tableFeatures, setTableFeatures] = useState('');
	const handleTableFeatures = async (features: string) => {
		setLoading(true);
		await TableGenerator(features)
			.then((data) => {
				return data.json();
			})
			.then((data) => {
				setTableFeatures(data.choices[0].message.content);
				console.log(data);
				setLoading(false);
				nextStep();
			})
			.catch((e) => {
				alert('Error occured. Please Try Again');
			});
	};

	return (
		<div className='flex-column overflow-auto'>
			<div className='d-flex align-items-center'>
				{step === 1 ? <UserStories handleSystemFeatures={handleSystemFeatures} loading={loading} setLoading={setLoading} /> : null}
				{/* {step === 2 ? <System features={systemFeatures} handleTableFeatures={handleTableFeatures} /> : null}
				{step === 3 ? <TableFeatures features={tableFeatures} setStep={setStep} /> : null} */}
			</div>
			{loading ? (
				<div className='d-flex justify-content-end'>
					<Spinner animation='border' role='status'>
						<span className='visually-hidden'>Loading...</span>
					</Spinner>
				</div>
			) : null}
		</div>
	);
};

export default SqlGenerator;
