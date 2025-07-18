import { useForm, useFieldArray } from 'react-hook-form';
import { useMultiStepForm } from '../../../context/MultiStepFormContext';
import { Plus, Trash2 } from 'lucide-react';

const Step2_Beneficiaries = () => {
  const { formData, updateFormData, nextStep, prevStep } = useMultiStepForm();
  const { register, control, handleSubmit } = useForm({
    defaultValues: { beneficiaries: formData.beneficiaries || [{ name: "", relationship: "", panAadhar: "", residence: "", age: "" }] },
  });
  
  const { fields, append, remove } = useFieldArray({ control, name: "beneficiaries" });

  const onSubmit = (data) => {
    updateFormData(data);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
       <div className="card-body">
         <h2 className="card-title text-2xl">Step 2: Beneficiaries</h2>
         <p className="text-base-content/70">List the people who will inherit from you. This information will appear in the will document.</p>
        
         <div className="space-y-4 mt-4">
            {fields.map((field, index) => (
                <div key={field.id} className="border p-4 rounded-lg space-y-2 relative bg-base-200/50">
                    <h3 className="font-bold">Beneficiary #{index + 1}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label"><span className="label-text m-5">Full Name</span></label>
                            <input {...register(`beneficiaries.${index}.name`, { required: true })} className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text m-5">Relationship</span></label>
                            <input {...register(`beneficiaries.${index}.relationship`, { required: true })} className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text m-5">PAN / Aadhar No.</span></label>
                            <input {...register(`beneficiaries.${index}.panAadhar`)} className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text m-5">Place of Residence</span></label>
                            <input {...register(`beneficiaries.${index}.residence`)} className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text m-5">Age</span></label>
                            <input type="number" {...register(`beneficiaries.${index}.age`)} className="input input-bordered" />
                        </div>
                    </div>
                    {fields.length > 1 && (
                        <button type="button" onClick={() => remove(index)} className="btn btn-sm btn-error absolute top-2 right-2"><Trash2 size={16}/></button>
                    )}
                </div>
            ))}
         </div>
         
         <button type="button" onClick={() => append({ name: "", relationship: "", panAadhar: "", residence: "", age: "" })} className="btn btn-secondary mt-4"><Plus size={16}/> Add Beneficiary</button>
       </div>

      <div className="card-actions justify-between p-6 bg-base-200/30">
        <button type="button" onClick={prevStep} className="btn btn-ghost">Back</button>
        <button type="submit" className="btn btn-primary">Next: Assets</button>
      </div>
    </form>
  );
};

export default Step2_Beneficiaries;