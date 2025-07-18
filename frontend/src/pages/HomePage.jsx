import { Shield, FileText, Bot } from 'lucide-react';
import { Link } from 'react-router';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const FeatureCard = ({ icon, title, children }) => (
  <div className="card bg-base-100 shadow-xl">
    <div className="card-body items-center text-center">
      <div className="text-primary">{icon}</div>
      <h2 className="card-title">{title}</h2>
      <p>{children}</p>
    </div>
  </div>
);

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-base-200">
      <Navbar />
      <main className="flex-grow">
        <section className="hero min-h-[60vh] bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">Secure Your Legacy</h1>
              <p className="py-6">Create a legally-sound will with confidence and ease. Our platform guides you through every step, ensuring your final wishes are clearly documented.</p>
              <Link to="/register" className="btn btn-primary">Get Started for Free</Link>
            </div>
          </div>
        </section>

        <section className="py-20 bg-base-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard icon={<FileText size={48} />} title="Simple Will Creation">
                Our guided, step-by-step process makes creating a comprehensive will straightforward and stress-free. No legal jargon, just clear instructions.
              </FeatureCard>
              <FeatureCard icon={<Shield size={48} />} title="Bank-Level Security">
                Your data is encrypted and stored with the highest level of security. Your privacy and peace of mind are our top priorities.
              </FeatureCard>
              <FeatureCard icon={<Bot size={48} />} title="AI Legal Assistant">
                Have questions? Our AI-powered legal assistant is available 24/7 to provide information on estate planning and will creation.
              </FeatureCard>
            </div>
          </div>
        </section>
        
        <section className="py-20 bg-base-200">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Trusted by Families</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                  <p>"I never thought making a will could be this easy. The platform was intuitive and gave me peace of mind knowing my family is protected."</p>
                  <div className="card-actions justify-end font-bold">- Jane D.</div>
                </div>
              </div>
              <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                  <p>"The AI assistant was incredibly helpful for answering my initial questions. A fantastic service that I'd recommend to anyone."</p>
                  <div className="card-actions justify-end font-bold">- John S.</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;