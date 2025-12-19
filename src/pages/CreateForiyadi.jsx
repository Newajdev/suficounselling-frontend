import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

const CreateForiyadi = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    gender: "",
    problem: "",
    marital_status: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Step 1: Validate required fields
    if (!formData.name.trim()) {
      setError("ফরিয়াদীর নাম আবশ্যক");
      return;
    }
    if (!formData.mobile.trim()) {
      setError("মোবাইল নম্বর আবশ্যক");
      return;
    }
    if (!formData.problem) {
      setError("সমস্যা নির্বাচন করুন");
      return;
    }

    setLoading(true);

    try {
      // Step 2: Call API to create patient file
      const response = await api.post("/patients/init", {
        name: formData.name.trim(),
        mobile: formData.mobile.trim(),
        problem_name: formData.problem,
      });

      // Step 3: Get patient_id from response
      if (response.data.success && response.data.data.patient_id) {
        const patientId = response.data.data.patient_id;

        // Step 4: Redirect to Page 2 with patient_id
        navigate(`/dashboard/foriyadi/create/${patientId}`);
      } else {
        setError(response.data.message || "রেকর্ড তৈরি করতে ব্যর্থ হয়েছে");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.errors?.join(", ") ||
          "রেকর্ড তৈরি করতে ব্যর্থ হয়েছে। আবার চেষ্টা করুন।"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-full max-w-[560px] bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-[#1F3B45] mb-6 text-center">
          ফরিয়াদি তথ্য
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Field 1: ফরিয়াদীর নাম */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              ফরিয়াদীর নাম
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="ফরিয়াদীর নাম লিখুন"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F3B45] focus:border-transparent"
              required
            />
          </div>

          {/* Field 2: ফরিয়াদীর মোবাইল নম্বর */}
          <div>
            <label
              htmlFor="mobile"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              ফরিয়াদীর মোবাইল নম্বর
            </label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="মোবাইল নম্বর লিখুন"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F3B45] focus:border-transparent"
              required
            />
          </div>

          <div className="flex gap-4 justify-between items-center">
            {/* Field 3: লিঙ্গ */}
            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                লিঙ্গ
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F3B45] focus:border-transparent"
              >
                <option value="">লিঙ্গ নির্বাচন করুন</option>
                <option value="পুরুষ">পুরুষ</option>
                <option value="মহিলা">মহিলা</option>
              </select>
            </div>
            {/* Field 5: বৈবাহিক অবস্থা */}
            <div>
              <label
                htmlFor="marital_status"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                বৈবাহিক অবস্থা
              </label>
              <select
                id="marital_status"
                name="marital_status"
                value={formData.marital_status}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F3B45] focus:border-transparent"
              >
                <option value="">বৈবাহিক অবস্থা নির্বাচন করুন</option>
                <option value="বিবাহিত">বিবাহিত</option>
                <option value="অবিবাহিত">অবিবাহিত</option>
                <option value="তালাকপ্রাপ্ত">তালাকপ্রাপ্ত</option>
                <option value="বিধবা">বিধবা</option>
              </select>
            </div>
          </div>

          {/* Field 4: সমস্যা */}
          <div>
            <label
              htmlFor="problem"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              সমস্যা
            </label>
            <select
              id="problem"
              name="problem"
              value={formData.problem}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F3B45] focus:border-transparent"
              required
            >
              <option value="">সমস্যা নির্বাচন করুন</option>
              <option value="সন্তানের ফরিয়াদ">সন্তানের ফরিয়াদ</option>
              <option value="বিয়ের ফরিয়াদ">বিয়ের ফরিয়াদ</option>
              <option value="আয় উন্নতির ফরিয়াদ">আয় উন্নতির ফরিয়াদ</option>
              <option value="পারিবারিক সমস্যা">পারিবারিক সমস্যা</option>
              <option value="শারীরিক সমস্যা">শারীরিক সমস্যা</option>
              <option value="আছরের সমস্যা">আছরের সমস্যা</option>
              <option value="অন্যান্য">অন্যান্য</option>
            </select>
          </div>

          {/* Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1F3B45] text-white py-2 px-4 rounded-lg hover:bg-[#315e68] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "তৈরি হচ্ছে..." : "Get full data"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateForiyadi;
