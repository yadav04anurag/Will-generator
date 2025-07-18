import { useForm } from 'react-hook-form';
import { useMultiStepForm } from '../../../context/MultiStepFormContext';

const Step1_TestatorInfo = () => {
  const { formData, updateFormData, nextStep } = useMultiStepForm();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: formData.testator,
  });

  const onSubmit = (data) => {
    updateFormData({ testator: data, title: formData.title || `Will of ${data.name}` });
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="card-body space-y-4">
        <h2 className="card-title text-2xl">Step 1: Your Information (The Testator)</h2>
        <div className="form-control">
          <label className="label"><span className="label-text m-5">Full Legal Name</span></label>
          <input {...register("name", { required: 'Your name is required' })} className="input input-bordered" />
          {errors.name && <span className="text-error text-sm mt-1">{errors.name.message}</span>}
        </div>
        <div className="form-control">
          <label className="label"><span className="label-text m-5">Father's Name</span></label>
          <input {...register("fatherName", { required: "Your father's name is required" })} className="input input-bordered" />
          {errors.fatherName && <span className="text-error text-sm mt-1">{errors.fatherName.message}</span>}
        </div>
        <div className="form-control">
          <label className="label"><span className="label-text m-5">Full Residential Address</span></label>
          <textarea {...register("address", { required: 'Your address is required' })} className="textarea textarea-bordered h-24" />
           {errors.address && <span className="text-error text-sm mt-1">{errors.address.message}</span>}
        </div>
      </div>
      <div className="card-actions justify-end p-6 bg-base-200/30">
        <button type="submit" className="btn btn-primary">Next: Beneficiaries</button>
      </div>
    </form>
  );
};

export default Step1_TestatorInfo;