import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { MultiStepFormProvider, useMultiStepForm } from '../context/MultiStepFormContext';
import { getWillById, updateWill } from '../services/willService';
import toast from 'react-hot-toast';

import Step1_TestatorInfo from '../components/will/steps/Step1_TestatorInfo';
import Step2_Beneficiaries from '../components/will/steps/Step2_Beneficiaries';
import Step3_Assets from '../components/will/steps/Step3_Assets';
import Step4_Clauses from '../components/will/steps/Step4_Clauses';
import Step5_ReviewSubmit from '../components/will/steps/Step5_ReviewSubmit';

const WillEditWizard = () => {
    const { currentStep, formData } = useMultiStepForm();
    const navigate = useNavigate();
    const { willId } = useParams();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFinalSubmit = async () => {
        setIsSubmitting(true);
        const toastId = toast.loading('Updating your will...');
        try {
            await updateWill(willId, formData);
            toast.success('Will updated successfully!', { id: toastId });
            navigate('/wills');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Could not update will.', { id: toastId });
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
    );
};

const EditWillPage = () => {
    const { willId } = useParams();
    const [initialData, setInitialData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getWillById(willId)
            .then(data => {
                setInitialData(data);
                setLoading(false);
            })
            .catch(err => {
                setError('Could not load will data.');
                setLoading(false);
            });
    }, [willId]);

    if (loading) return <div className="text-center"><span className="loading loading-spinner loading-lg"></span></div>;
    if (error) return <div className="alert alert-error">{error}</div>;

    return (
        <MultiStepFormProvider initialData={initialData}>
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold">Edit Your Will</h1>
                <p className="mt-2 text-lg text-base-content/70">Update your information below.</p>
            </div>
            <WillEditWizard />
        </MultiStepFormProvider>
    );
};

export default EditWillPage;