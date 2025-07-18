import React, { createContext, useContext, useState, useCallback } from 'react';

const MultiStepFormContext = createContext();

export const MultiStepFormProvider = ({ children, initialData = {} }) => {
    const [formData, setFormData] = useState(initialData);
    const [currentStep, setCurrentStep] = useState(1);

    const updateFormData = useCallback((newData) => {
        setFormData(prev => ({ ...prev, ...newData }));
    }, []);

    const nextStep = useCallback(() => setCurrentStep(prev => prev + 1), []);
    const prevStep = useCallback(() => setCurrentStep(prev => prev - 1), []);
    const resetForm = useCallback(() => {
        setFormData({});
        setCurrentStep(1);
    }, []);

    return (
        <MultiStepFormContext.Provider value={{ formData, updateFormData, currentStep, nextStep, prevStep, resetForm }}>
            {children}
        </MultiStepFormContext.Provider>
    );
};

export const useMultiStepForm = () => useContext(MultiStepFormContext)