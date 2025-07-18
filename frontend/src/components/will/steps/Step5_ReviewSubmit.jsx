import { useMultiStepForm } from '../../../context/MultiStepFormContext';
import { FileText, User, Users, Package, Shield, Repeat, UserCheck } from 'lucide-react';

const ReviewItem = ({ label, value }) => (
    value ? <p><span className="font-semibold">{label}:</span> {value}</p> : null
);

const ReviewSection = ({ title, icon, children }) => (
    <div className="card bg-base-200/50 shadow-inner">
        <div className="card-body">
            <h3 className="font-bold text-xl flex items-center gap-2">{icon}{title}</h3>
            <div className="divider mt-1 mb-3"></div>
            <div className="space-y-2 text-base-content/90">{children}</div>
        </div>
    </div>
);

const Step5_ReviewSubmit = ({ onFinalSubmit, isSubmitting }) => {
  const { formData, prevStep } = useMultiStepForm();

  return (
    <div>
        <div className="card-body">
            <div className="text-center">
                <h2 className="card-title text-3xl block">Step 5: Review and Confirm</h2>
                <p className="mt-2">Please review all details carefully. You can go back to any step to make changes.</p>
            </div>
            
            <div className="space-y-6 mt-8">
                <ReviewSection title="Testator Information" icon={<User size={20}/>}>
                    <ReviewItem label="Full Name" value={formData.testator?.name} />
                    <ReviewItem label="Father's Name" value={formData.testator?.fatherName} />
                    <ReviewItem label="Address" value={formData.testator?.address} />
                </ReviewSection>

                <ReviewSection title="Beneficiaries" icon={<Users size={20}/>}>
                    {formData.beneficiaries?.map((b, i) => (
                        <div key={i} className="p-2 border-b border-base-300 last:border-b-0">
                            <p className="font-bold">{b.name} ({b.relationship})</p>
                            <p className="text-sm">Age: {b.age}, Residence: {b.residence}, ID: {b.panAadhar}</p>
                        </div>
                    ))}
                </ReviewSection>

                <ReviewSection title="Asset Distribution" icon={<Package size={20}/>}>
                    {formData.assets?.map((a, i) => (
                        <div key={i} className="p-2 border-b border-base-300 last:border-b-0">
                            <p className="font-bold">{a.field1_value} ({a.category})</p>
                            <p className="text-sm">Assigned to <strong>{a.beneficiaryName}</strong> with a <strong>{a.share}%</strong> share.</p>
                        </div>
                    ))}
                </ReviewSection>

                <ReviewSection title="Executors" icon={<UserCheck size={20}/>}>
                    {formData.executors?.map((e, i) => (
                        <div key={i} className="p-2 border-b border-base-300 last:border-b-0">
                            <p className="font-bold">{e.name} ({e.isAlternate ? 'Alternate' : 'Primary'})</p>
                            <p className="text-sm">S/o {e.fatherName}, Address: {e.address}</p>
                        </div>
                    ))}
                </ReviewSection>

                <ReviewSection title="Special Clauses" icon={<FileText size={20}/>}>
                    {formData.guardian?.name && (
                        <div className="p-2">
                            <p className="font-bold flex items-center gap-2"><Shield size={16}/> Guardian</p>
                            <p className="text-sm"><strong>{formData.guardian.name}</strong> ({formData.guardian.relation}) appointed for {formData.guardian.childrenNames}.</p>
                        </div>
                    )}
                    {formData.residueClause?.beneficiaryName && (
                         <div className="p-2">
                            <p className="font-bold flex items-center gap-2"><Repeat size={16}/> Residue</p>
                            <p className="text-sm">All residue assets to be transferred to <strong>{formData.residueClause.beneficiaryName}</strong>.</p>
                        </div>
                    )}
                </ReviewSection>
            </div>
        </div>

        <div className="card-actions justify-between p-6 bg-base-200/30">
            <button type="button" onClick={prevStep} className="btn btn-ghost">Back</button>
            <button type="button" onClick={onFinalSubmit} className="btn btn-success" disabled={isSubmitting}>
                {isSubmitting ? <span className="loading loading-spinner"></span> : <><FileText size={16}/> Save Will</>}
            </button>
        </div>
    </div>
  );
};

export default Step5_ReviewSubmit;