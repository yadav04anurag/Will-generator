import { MultiStepFormProvider, useMultiStepForm } from '../context/MultiStepFormContext';
import { createWill } from '../services/willService';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { useState } from 'react';

import Step1_TestatorInfo from '../components/will/steps/Step1_TestatorInfo';
import Step2_Beneficiaries from '../components/will/steps/Step2_Beneficiaries';
import Step3_Assets from '../components/will/steps/Step3_Assets';
import Step4_Clauses from '../components/will/steps/Step4_Clauses';
import Step5_ReviewSubmit from '../components/will/steps/Step5_ReviewSubmit';

const WillCreationWizard = () => {
    const { currentStep, formData } = useMultiStepForm();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFinalSubmit = async () => {
        setIsSubmitting(true);
        const toastId = toast.loading('Saving your will...');
        try {
            await createWill(formData);
            toast.success('Will created successfully!', { id: toastId });
            navigate('/wills');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Could not save will.', { id: toastId });
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const steps = ["Testator Info", "Beneficiaries", "Assets", "Clauses", "Review"];

    return (
        <div className="max-w-4xl mx-auto">
            <ul className="steps w-full mb-8">
                {steps.map((step, index) => (
                    <li key={index} className={`step ${currentStep > index ? 'step-primary' : ''}`}>{step}</li>
                ))}
            </ul>
            
            <div className="card bg-base-100 shadow-xl border border-base-300">
                {currentStep === 1 && <Step1_TestatorInfo />}
                {currentStep === 2 && <Step2_Beneficiaries />}
                {currentStep === 3 && <Step3_Assets />}
                {currentStep === 4 && <Step4_Clauses />}
                {currentStep === 5 && <Step5_ReviewSubmit onFinalSubmit={handleFinalSubmit} isSubmitting={isSubmitting} />}
            </div>
        </div>
    )
}

const CreateWillPage = () => {
    return (
        <MultiStepFormProvider>
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold">Create Your Will</h1>
                <p className="mt-2 text-lg text-base-content/70">Follow the steps to detail your wishes. All information is saved securely.</p>
            </div>
            <WillCreationWizard />
        </MultiStepFormProvider>
    );
};

export default CreateWillPage;