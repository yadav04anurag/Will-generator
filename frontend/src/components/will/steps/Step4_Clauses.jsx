import { useForm, useFieldArray } from 'react-hook-form';
import { useMultiStepForm } from '../../../context/MultiStepFormContext';
import { Plus, Trash2, ShieldCheck, UserCheck, Repeat } from 'lucide-react';

const Step4_Clauses = () => {
  const { formData, updateFormData, nextStep, prevStep } = useMultiStepForm();
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      executors: formData.executors || [{ name: '', fatherName: '', address: '', isAlternate: false }],
      guardian: formData.guardian || { name: '', relation: '', childrenNames: '' },
      residueClause: formData.residueClause || { beneficiaryName: '' },
    },
  });
  
  const { fields, append, remove } = useFieldArray({ control, name: "executors" });

  const onSubmit = (data) => {
    updateFormData(data);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="card-body space-y-8">
        
        <div className="space-y-4">
            <h2 className="card-title text-2xl flex items-center gap-2"><UserCheck/> Executors</h2>
            <p className="text-base-content/70">Appoint people to carry out your will. You can add an alternate.</p>
            {fields.map((field, index) => (
                <div key={field.id} className="border p-4 rounded-lg space-y-2 relative bg-base-200/50">
                    <h3 className="font-bold">{index === 0 ? "Primary Executor" : `Alternate Executor #${index}`}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label"><span className="label-text m-5">Full Name</span></label>
                            <input {...register(`executors.${index}.name`, { required: true })} className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text m-5">Father's Name</span></label>
                            <input {...register(`executors.${index}.fatherName`, { required: true })} className="input input-bordered" />
                        </div>
                        <div className="form-control md:col-span-2">
                            <label className="label"><span className="label-text m-5">Address</span></label>
                            <input {...register(`executors.${index}.address`, { required: true })} className="input input-bordered" />
                        </div>
                    </div>
                    {index > 0 && (
                        <button type="button" onClick={() => remove(index)} className="btn btn-sm btn-error absolute top-2 right-2"><Trash2 size={16}/></button>
                    )}
                    <input type="hidden" {...register(`executors.${index}.isAlternate`)} value={index > 0} />
                </div>
            ))}
            {fields.length < 2 && (
                <button type="button" onClick={() => append({ name: '', fatherName: '', address: '', isAlternate: true })} className="btn btn-secondary mt-2"><Plus size={16}/> Add Alternate Executor</button>
            )}
        </div>

        <div className="divider"></div>

        <div className="space-y-4">
            <h2 className="card-title text-2xl flex items-center gap-2"><ShieldCheck /> Guardian Clause</h2>
            <p className="text-base-content/70">Appoint a guardian for minor children in case your spouse cannot act as one.</p>
            <div className="border p-4 rounded-lg bg-base-200/50 space-y-4">
                <div className="form-control">
                    <label className="label"><span className="label-text m-5">Guardian's Full Name</span></label>
                    <input {...register('guardian.name')} className="input input-bordered" placeholder="e.g., Arpit Saxena" />
                </div>
                <div className="form-control">
                    <label className="label"><span className="label-text m-5">Guardian's Relationship to You</span></label>
                    <input {...register('guardian.relation')} className="input input-bordered" placeholder="e.g., elder brother" />
                </div>
                <div className="form-control">
                    <label className="label"><span className="label-text m-5">Names of Minor Children</span></label>
                    <input {...register('guardian.childrenNames')} className="input input-bordered" placeholder="e.g., Natasha and Sameer" />
                </div>
            </div>
        </div>

        <div className="divider"></div>

        <div className="space-y-4">
            <h2 className="card-title text-2xl flex items-center gap-2"><Repeat /> Residue Clause</h2>
            <p className="text-base-content/70">Specify who should receive any assets not explicitly mentioned or acquired later.</p>
            <div className="border p-4 rounded-lg bg-base-200/50">
                <div className="form-control">
                    <label className="label"><span className="label-text m-5">Residue Beneficiary Name</span></label>
                    <select {...register('residueClause.beneficiaryName')} className="select select-bordered">
                        <option value="">-- Select a Beneficiary --</option>
                        {formData.beneficiaries?.map((b, i) => <option key={i} value={b.name}>{b.name}</option>)}
                    </select>
                </div>
            </div>
        </div>
      </div>

      <div className="card-actions justify-between p-6 bg-base-200/30">
        <button type="button" onClick={prevStep} className="btn btn-ghost">Back</button>
        <button type="submit" className="btn btn-primary">Next: Review Your Will</button>
      </div>
    </form>
  );
};

export default Step4_Clauses;