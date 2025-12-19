import { useState } from "react";

const PersonalDataSection = ({ formData, setFormData }) => {
  const [guardianType, setGuardianType] = useState("");
  const [bayatStatus, setBayatStatus] = useState("");

  const handleGuardianNameChange = (e) => {
    const name = e.target.value;
    setFormData((prev) => ({
      ...prev,
      guardian_name_temp: name,
    }));
    updateGuardianName(name, guardianType);
  };

  const handleGuardianTypeChange = (type) => {
    setGuardianType(type);
    updateGuardianName(formData.guardian_name_temp || "", type);
  };

  const updateGuardianName = (name, type) => {
    if (name && type) {
      setFormData((prev) => ({
        ...prev,
        guardian_name: `${type}: ${name}`,
        guardian_name_temp: name,
      }));
    } else if (name) {
      setFormData((prev) => ({
        ...prev,
        guardian_name_temp: name,
      }));
    }
  };

  const handleBayatChange = (e) => {
    const value = e.target.value;
    setBayatStatus(value);
    if (value === "না") {
      setFormData((prev) => ({
        ...prev,
        bayat: "না",
        pir_name: "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        bayat: prev.pir_name || "",
      }));
    }
  };

  const handlePirNameChange = (e) => {
    const pirName = e.target.value;
    setFormData((prev) => ({
      ...prev,
      pir_name: pirName,
      bayat: bayatStatus === "হ্যাঁ" ? pirName : prev.bayat,
    }));
  };

  const handleAddressChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value,
      },
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-[#1F3B45] mb-6">
        ব্যক্তিগত তথ্য
      </h2>

      <div className="space-y-6">
        {/* Guardian Information */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-3">
            অভিভাবক
          </label>

          <div className="space-y-4">
            {/* Guardian Name */}
            <div>
              <label
                htmlFor="guardian_name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                অভিভাবকের নাম
              </label>
              <input
                type="text"
                id="guardian_name"
                value={formData.guardian_name_temp || ""}
                onChange={handleGuardianNameChange}
                placeholder="অভিভাবকের নাম লিখুন"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F3B45] focus:border-transparent"
              />
            </div>

            {/* Guardian Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                অভিভাবকের ধরন
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => handleGuardianTypeChange("স্বামী")}
                  className={`px-6 py-2 rounded-lg border-2 transition-colors ${
                    guardianType === "স্বামী"
                      ? "bg-[#1F3B45] text-white border-[#1F3B45]"
                      : "bg-white text-gray-700 border-gray-300 hover:border-[#1F3B45]"
                  }`}
                >
                  স্বামী
                </button>
                <button
                  type="button"
                  onClick={() => handleGuardianTypeChange("পিতা")}
                  className={`px-6 py-2 rounded-lg border-2 transition-colors ${
                    guardianType === "পিতা"
                      ? "bg-[#1F3B45] text-white border-[#1F3B45]"
                      : "bg-white text-gray-700 border-gray-300 hover:border-[#1F3B45]"
                  }`}
                >
                  পিতা
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Age */}
        <div>
          <label
            htmlFor="age"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            বয়স
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                age: e.target.value,
              }))
            }
            placeholder="বয়স লিখুন"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F3B45] focus:border-transparent"
            min="0"
          />
        </div>

        {/* Bayat Information */}
        <div>
          <label
            htmlFor="bayat_status"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            বায়াত নিয়েছেন কি?
          </label>
          <select
            id="bayat_status"
            value={bayatStatus}
            onChange={handleBayatChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F3B45] focus:border-transparent"
          >
            <option value="">নির্বাচন করুন</option>
            <option value="হ্যাঁ">হ্যাঁ</option>
            <option value="না">না</option>
          </select>

          {/* Conditional Pir Name Field */}
          {bayatStatus === "হ্যাঁ" && (
            <div className="mt-4">
              <label
                htmlFor="pir_name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                পীরের নাম
              </label>
              <input
                type="text"
                id="pir_name"
                value={formData.pir_name || ""}
                onChange={handlePirNameChange}
                placeholder="পীরের নাম লিখুন"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F3B45] focus:border-transparent"
              />
            </div>
          )}
        </div>

        {/* Address Information */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-3">
            ঠিকানা
          </label>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="bari_name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                বাড়ির নাম
              </label>
              <input
                type="text"
                id="bari_name"
                value={formData.address?.bari_name || ""}
                onChange={(e) => handleAddressChange("bari_name", e.target.value)}
                placeholder="সংশ্লিষ্ট তথ্য লিখুন"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F3B45] focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="gram"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                গ্রামের নাম
              </label>
              <input
                type="text"
                id="gram"
                value={formData.address?.gram || ""}
                onChange={(e) => handleAddressChange("gram", e.target.value)}
                placeholder="সংশ্লিষ্ট তথ্য লিখুন"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F3B45] focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="upazila"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                উপজেলা
              </label>
              <input
                type="text"
                id="upazila"
                value={formData.address?.upazila || ""}
                onChange={(e) => handleAddressChange("upazila", e.target.value)}
                placeholder="সংশ্লিষ্ট তথ্য লিখুন"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F3B45] focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="district"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                জেলা
              </label>
              <input
                type="text"
                id="district"
                value={formData.address?.district || ""}
                onChange={(e) => handleAddressChange("district", e.target.value)}
                placeholder="সংশ্লিষ্ট তথ্য লিখুন"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F3B45] focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="division"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                বিভাগ
              </label>
              <input
                type="text"
                id="division"
                value={formData.address?.division || ""}
                onChange={(e) => handleAddressChange("division", e.target.value)}
                placeholder="সংশ্লিষ্ট তথ্য লিখুন"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F3B45] focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDataSection;

