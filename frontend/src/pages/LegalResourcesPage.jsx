import { AlertTriangle } from 'lucide-react';

const LegalResourcesPage = () => {
  return (
    <div className="bg-base-100 py-12 px-4 sm:px-6 lg:px-8 rounded-xl shadow-lg">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-4">Legal Information & Resources</h1>
        
        <div className="alert alert-error shadow-lg my-8">
          <AlertTriangle />
          <div>
            <h3 className="font-bold">Important Disclaimer!</h3>
            <div className="text-xs">This tool is for informational purposes only and does not provide legal advice. Creating a will is a significant legal act. We strongly recommend consulting with a qualified lawyer to ensure your will is valid and meets your specific needs. Laws vary by jurisdiction.</div>
          </div>
        </div>

        <div className="space-y-10">
          <div className="card bg-base-200 shadow-md">
            <div className="card-body">
              <h2 className="card-title text-2xl">What is a Will?</h2>
              <p>A will, or a last will and testament, is a legal document that outlines your wishes for the distribution of your property and the care of any minor children after your death. If you die without a valid will (known as dying 'intestate'), state law will decide who inherits your assets, which may not align with your wishes.</p>
            </div>
          </div>

          <div className="card bg-base-200 shadow-md">
            <div className="card-body">
              <h2 className="card-title text-2xl">Why is Making a Will Important?</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>It ensures your assets are distributed according to your wishes.</li>
                <li>You can name a guardian for your minor children.</li>
                <li>It can prevent family disputes over your property.</li>
                <li>Unmarried partners and friends may not automatically inherit without a will.</li>
                <li>It can simplify the legal process (probate) for your loved ones and potentially reduce inheritance tax.</li>
              </ul>
            </div>
          </div>

          <div className="card bg-base-200 shadow-md">
            <div className="card-body">
              <h2 className="card-title text-2xl">Key Requirements for a Valid Will</h2>
              <p>While laws vary by state and country, some general requirements for a will to be legally valid are:</p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>The will must be in writing.</li>
                <li>You (the testator) must be of legal age (typically 18 or older) and of sound mind.</li>
                <li>You must sign the will in the presence of two witnesses.</li>
                <li>The two witnesses must also sign the will in your presence. The witnesses generally cannot be beneficiaries in the will.</li>
              </ul>
            </div>
          </div>

          <div className="card bg-base-200 shadow-md">
            <div className="card-body">
              <h2 className="card-title text-2xl">Common Terms</h2>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Testator:</strong> The person making the will.</li>
                <li><strong>Executor:</strong> The person or institution you appoint to carry out the will's instructions.</li>
                <li><strong>Beneficiary:</strong> A person or organization who will inherit assets from your estate.</li>
                <li><strong>Guardian:</strong> A person appointed to care for minor children.</li>
                <li><strong>Probate:</strong> The official legal process of proving in court that a will is valid.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalResourcesPage;