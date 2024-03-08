import React, { useEffect, useState } from 'react';
import Layout from '../homepage/Layout';

const UpdateSellerAccount = () => {

    useEffect(() => {
        document.title = 'Update Seller Account Detail';
    }, []);
    const [step, setStep] = useState(1);

    const nextStep = () => {
        if (step < 3) {
            setStep(step + 1);
        }
    }

    const prevStep = () => {
        if (step > 1) {
            setStep(step - 1)
        }
    }

    const handleSubmit = () => {
        // Handle form submission logic here
        console.log('Form submitted');
    }

    return (
        <Layout>
            <div className='bg-white'>
            {step === 1 && (
                <div className='1 bg-gray-500'>
                    Step 1
                </div>
            )}
            {step === 2 && (
                <div className='2 bg-gray-500'>
                    Step 2
                </div>
            )}
            {step === 3 && (
                <div className='3 bg-gray-500'>
                    Step 3
                </div>
            )}

            {step < 3 && (
                <button onClick={nextStep} className='right'>
                    Next
                </button>
            )}

            {step > 1 && (
                <button onClick={prevStep} className='left'>
                    Prev
                </button>
            )}

            {step === 3 && (
                <button onClick={handleSubmit} className=''>
                    Submit
                </button>
            )}
            </div>
        </Layout>
    );
}

export default UpdateSellerAccount;
