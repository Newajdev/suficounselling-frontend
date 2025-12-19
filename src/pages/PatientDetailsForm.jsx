import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import PersonalDataSection from "../components/PersonalDataSection";

const PatientDetailsForm = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [patientName, setPatientName] = useState("");
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    guardian_name: "",
    guardian_name_temp: "",
    age: "",
    bayat: "",
    pir_name: "",
    address: {
      bari_name: "",
      gram: "",
      upazila: "",
      district: "",
      division: "",
    },
  });

  useEffect(() => {
    // Check if patient_id is missing or invalid
    if (!patientId || patientId.trim() === "") {
      // Redirect back to Step 1 if patient_id is missing
      navigate("/dashboard/foriyadi/create", { replace: true });
      return;
    }

    // Fetch patient data to get the name
    const fetchPatientData = async () => {
      try {
        const response = await api.get(`/patients/${patientId}`);
        if (response.data.success && response.data.data.patient) {
          setPatientName(response.data.data.patient.name || "");
        }
      } catch (err) {
        console.error("Failed to fetch patient data:", err);
        // If fetch fails, still show the page but without name
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [patientId, navigate]);

  // If no patient_id, don't render (will redirect)
  if (!patientId || patientId.trim() === "") {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#1F3B45] mb-2">
          সম্পন্ন ফরিয়াদী তথ্য গ্রহণ করুন
        </h1>
        {loading ? (
          <p className="text-gray-600">লোড হচ্ছে...</p>
        ) : (
          <p className="text-gray-600">
            ফরিয়াদীর নাম: {patientName || "N/A"}
          </p>
        )}
      </div>

      {/* Personal Data Section */}
      <PersonalDataSection formData={formData} setFormData={setFormData} />
    </div>
  );
};

export default PatientDetailsForm;
