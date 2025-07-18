import { useState, useEffect } from 'react';
import { getUserWills, getWillById, deleteWill } from '../services/willService';
import { generateWillPDF } from '../utils/pdfGenerator';
import { FileText, Download, Edit, Trash2, FilePlus } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import toast from 'react-hot-toast';

const WillHistoryPage = () => {
    const [wills, setWills] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        getUserWills()
            .then(userWills => setWills(userWills))
            .catch(error => toast.error("Could not fetch your wills."))
            .finally(() => setLoading(false));
    }, []);

    const handleDownload = async (willId) => {
        const toastId = toast.loading("Preparing your document...");
        try {
            const willData = await getWillById(willId);
            const ans=generateWillPDF(willData);
            console.log(ans);
            toast.success("PDF generated successfully!", { id: toastId });
        } catch (error) {
            toast.error("Could not generate your PDF.", { id: toastId });
        }
    };

    const handleDelete = async (willId) => {
        if (window.confirm("Are you sure you want to permanently delete this will? This action cannot be undone.")) {
            const toastId = toast.loading("Deleting will...");
            try {
                await deleteWill(willId);
                setWills(wills.filter(w => w._id !== willId));
                toast.success("Will deleted successfully.", { id: toastId });
            } catch (error) {
                toast.error("Failed to delete will.", { id: toastId });
            }
        }
    };

    if (loading) {
        return <div className="text-center"><span className="loading loading-spinner loading-lg"></span></div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Your Will History</h1>
                <Link to="/create-will" className="btn btn-primary">
                    <FilePlus size={16}/> New Will
                </Link>
            </div>

            {wills.length === 0 ? (
                <div className="text-center py-16 card bg-base-100">
                    <div className="card-body">
                        <p className="text-xl">You haven't created any wills yet.</p>
                        <p className="text-base-content/70">Click "New Will" to get started.</p>
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    {wills.map(will => (
                        <div key={will._id} className="card bg-base-100 shadow-md">
                            <div className="card-body flex-col md:flex-row justify-between items-start md:items-center">
                                <div className="flex items-center gap-4">
                                    <FileText className="text-primary flex-shrink-0" size={32} />
                                    <div>
                                        <h2 className="card-title">{will.title || "Untitled Will"}</h2>
                                        <p className="text-sm">Created on: {new Date(will.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className="card-actions mt-4 md:mt-0">
                                    <button onClick={() => handleDelete(will._id)} className="btn btn-ghost btn-sm text-error"><Trash2 size={16}/> Delete</button>
                                    <button onClick={() => navigate(`/edit-will/${will._id}`)} className="btn btn-secondary btn-sm"><Edit size={16}/> Edit</button>
                                    <button onClick={() => handleDownload(will._id)} className="btn btn-primary btn-sm"><Download size={16}/> Download </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WillHistoryPage;