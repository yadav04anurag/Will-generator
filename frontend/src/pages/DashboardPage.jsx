import { useEffect, useState } from 'react';
import { FilePlus, History, BookOpen, Download, Edit } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { getUserWills, getWillById } from '../services/willService';
import { generateWillPDF } from '../utils/pdfGenerator';
import toast from 'react-hot-toast';

const DashboardCard = ({ to, icon, title, children }) => (
    <Link to={to} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
        <div className="card-body">
            <div className="text-primary">{icon}</div>
            <h2 className="card-title">{title}</h2>
            <p className="text-base-content/80">{children}</p>
        </div>
    </Link>
);

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [recentWill, setRecentWill] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserWills()
      .then(wills => {
        if (wills.length > 0) setRecentWill(wills[0]);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // const handleDownload = async (willId) => {
  //   const toastId = toast.loading("Preparing your document...");
  //   try {
  //       const willData = await getWillById(willId);
  //       generateWillPDF(willData);
  //       toast.success("PDF generated successfully!", { id: toastId });
  //   } catch (error) {
  //       toast.error("Could not generate your PDF.", { id: toastId });
  //   }
  // };

  const handleDownload = async (willId) => {
    const toastId = toast.loading("Preparing your document...");
    try {
        const willData = await getWillById(willId);
        await generateWillPDF(willData);
        toast.success("PDF generated successfully!", { id: toastId });
    } catch (error) {
        console.error("PDF generation failed:", error);
        toast.error("Could not generate your PDF.", { id: toastId });
    }
};

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
        <p className="text-lg text-base-content/70 mt-1">Ready to manage your legacy?</p>
      </div>

      {loading ? (
        <div className="text-center"><span className="loading loading-spinner loading-lg"></span></div>
      ) : recentWill ? (
        <div className="card bg-base-100 shadow-xl border border-primary/20">
            <div className="card-body">
                <h2 className="card-title">Recent Activity</h2>
                <p>Here's the last will you worked on. You can continue editing or download it.</p>
                <div className="mt-4 p-4 bg-base-200 rounded-lg flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <h3 className="font-bold text-lg">{recentWill.title}</h3>
                        <p className="text-sm">Last modified: {new Date(recentWill.testator.date).toLocaleDateString()}</p>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => navigate(`/edit-will/${recentWill._id}`)} className="btn btn-secondary btn-sm"><Edit size={16}/> Edit</button>
                        <button onClick={() => handleDownload(recentWill._id)} className="btn btn-primary btn-sm"><Download size={16}/> Download</button>
                    </div>
                </div>
            </div>
        </div>
      ) : (
         <div className="card bg-base-100 shadow-xl">
             <div className="card-body items-center text-center">
                 <h2 className="card-title">You're all set!</h2>
                 <p>You haven't created a will yet. Get started today to secure your family's future.</p>
                 <Link to="/create-will" className="btn btn-primary mt-4">Create Your First Will</Link>
             </div>
         </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard to="/create-will" icon={<FilePlus size={40} />} title="Create a New Will">
          Start the guided process to create a new, comprehensive will from scratch.
        </DashboardCard>
        <DashboardCard to="/wills" icon={<History size={40} />} title="View All Wills">
          Review, edit, or download all of your previously created and saved wills.
        </DashboardCard>
        <DashboardCard to="/legal-resources" icon={<BookOpen size={40} />} title="Legal Resources">
          Learn more about the importance of wills and key legal terms.
        </DashboardCard>
      </div>
    </div>
  );
};

export default DashboardPage;