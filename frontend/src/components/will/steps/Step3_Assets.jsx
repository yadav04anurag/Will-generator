import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import { useMultiStepForm } from '../../../context/MultiStepFormContext';
import { Plus, Trash2 } from 'lucide-react';

const getAssetFields = (category) => {
    switch (category) {
        case 'Bank Accounts': return { f1: 'Bank Name', f2: 'Account Number', f3: 'Type / Remark' };
        case 'Insurance Policies': return { f1: 'Name of the Policy', f2: 'Policy Number', f3: 'Type / Remark' };
        case 'Stocks': return { f1: 'Brokerage Firm', f2: 'Account No', f3: 'Type / Remark' };
        case 'Mutual Funds': return { f1: 'MF Distributor', f2: 'Account No', f3: 'Type / Remark' };
        case 'Jewellery': return { f1: 'Type of Jewellery', f2: 'Invoice Number', f3: 'Type / Remark' };
        case 'House': return { f1: 'Name of the Property', f2: 'Registration Number', f3: 'Type / Remark' };
        case 'Land': return { f1: 'Name of the Land', f2: 'Registration Number', f3: 'Type / Remark' };
        default: return { f1: 'Field 1', f2: 'Field 2', f3: 'Field 3' };
    }
};

const AssetForm = ({ index, control, register, errors, formData }) => {
    const category = useWatch({ control, name: `assets.${index}.category` });
    const labels = getAssetFields(category);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3.5">
            <div className="form-control">
                <label className="label"><span className="label-text m-5">Asset Category</span></label>
                <select {...register(`assets.${index}.category`)} className="select select-bordered">
                    <option disabled>-- Select Category --</option>
                    <optgroup label="Movable Assets (Financial)">
                        <option value="Bank Accounts">Bank Accounts</option>
                        <option value="Insurance Policies">Insurance Policies</option>
                        <option value="Stocks">Stocks</option>
                        <option value="Mutual Funds">Mutual Funds</option>
                    </optgroup>
                    <optgroup label="Movable Assets (Physical)">
                        <option value="Jewellery">Jewellery</option>
                    </optgroup>
                    <optgroup label="Immovable Assets">
                        <option value="House">House</option>
                        <option value="Land">Land</option>
                    </optgroup>
                </select>
            </div>
            <div className="form-control">
                <label className="label"><span className="label-text m-5">Assign to Beneficiary</span></label>
                <select {...register(`assets.${index}.beneficiaryName`, { required: true })} className="select select-bordered">
                    <option value="">-- Select --</option>
                    {formData.beneficiaries?.map((b, i) => <option key={i} value={b.name}>{b.name}</option>)}
                </select>
            </div>
            <div className="form-control">
                <label className="label"><span className="label-text m-5">{labels.f1}</span></label>
                <input {...register(`assets.${index}.field1_value`, { required: true })} className="input input-bordered" />
                <input type="hidden" {...register(`assets.${index}.field1_label`)} value={labels.f1} />
            </div>
            <div className="form-control">
                <label className="label"><span className="label-text m-5">{labels.f2}</span></label>
                <input {...register(`assets.${index}.field2_value`, { required: true })} className="input input-bordered" />
                <input type="hidden" {...register(`assets.${index}.field2_label`)} value={labels.f2} />
            </div>
            <div className="form-control">
                <label className="label"><span className="label-text m-5">{labels.f3}</span></label>
                <input {...register(`assets.${index}.field3_value`)} className="input input-bordered" />
                <input type="hidden" {...register(`assets.${index}.field3_label`)} value={labels.f3} />
            </div>
            <div className="form-control">
                <label className="label"><span className="label-text m-5">% Share</span></label>
                <input type="number" {...register(`assets.${index}.share`, { required: true, valueAsNumber: true, min: 1, max: 100 })} className="input input-bordered" />
                {errors.assets?.[index]?.share && <span className="text-error text-sm">Required (1-100)</span>}
            </div>
        </div>
    );
};

const Step3_Assets = () => {
  const { formData, updateFormData, nextStep, prevStep } = useMultiStepForm();
  const { register, control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { assets: formData.assets || [{ category: 'Bank Accounts', beneficiaryName: '', share: 100 }] },
  });
  
  const { fields, append, remove } = useFieldArray({ control, name: "assets" });

  const onSubmit = (data) => {
    updateFormData(data);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="card-body">
        <h2 className="card-title text-2xl">Step 3: Your Assets & Shares</h2>
        <p className="text-base-content/70">List your assets, assign them, and specify the percentage share for each beneficiary.</p>
        
        <div className="space-y-4 mt-4">
            {fields.map((field, index) => (
                <div key={field.id} className="border p-4 rounded-lg space-y-2 relative bg-base-200/50">
                    <h3 className="font-bold">Asset #{index + 1}</h3>
                    <AssetForm index={index} control={control} register={register} errors={errors} formData={formData} />
                    {fields.length > 1 && (
                        <button type="button" onClick={() => remove(index)} className="btn btn-sm btn-error absolute top-2 right-2"><Trash2 size={16}/></button>
                    )}
                </div>
            ))}
        </div>
        
        <button type="button" onClick={() => append({ category: 'Bank Accounts', beneficiaryName: '', share: 100 })} className="btn btn-secondary mt-4"><Plus size={16}/> Add Another Asset</button>
      </div>

      <div className="card-actions justify-between p-6 bg-base-200/30">
        <button type="button" onClick={prevStep} className="btn btn-ghost">Back</button>
        <button type="submit" className="btn btn-primary">Next: Clauses</button>
      </div>
    </form>
  );
};

export default Step3_Assets;