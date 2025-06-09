import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Edit3,
  Save,
  X,
  Camera,
  BookOpen,
  Download,
  Key,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../redux/user/userSlice";

export default function StudentProfile() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [isProcessing, setIsProcessing] = useState(false);

  // Initialize student data from Redux currentUser
  const [studentData, setStudentData] = useState({
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    profilePicture: "",
  });

  const [formData, setFormData] = useState(studentData);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Update student data when currentUser changes
  useEffect(() => {
    if (currentUser) {
      const userData = {
        name: currentUser.user.name || "",
        email: currentUser.user.email || "",
        phone: currentUser.user.phone || "",
        dateOfBirth: currentUser.user.dateOfBirth || "",
        gender: currentUser.user.gender || "",
        profilePicture: currentUser.user.profilePicture || "",
      };

      setStudentData(userData);
      setFormData(userData);
    }
  }, [currentUser]);

  // Sample certificates
  const certificates = [
    {
      id: 1,
      title: "HTML & CSS Basics Certificate",
      issueDate: "2024-01-15",
      courseTitle: "HTML & CSS Basics",
    },
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
   
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/updateProfile", 
        formData,
        { withCredentials: true }
      );
    
      console.log("Profile updated successfully:", response.data);
      
      // Update Redux store
      dispatch(updateUser(response.data));
      
      // Update local state immediately
      const updatedUserData = {
        name: response.data.user.name || "",
        email: response.data.user.email || "",
        phone: response.data.user.phone || "",
        dateOfBirth: response.data.user.dateOfBirth || "",
        gender: response.data.user.gender || "",
        profilePicture: response.data.user.profilePicture || "",
      };
      
      setStudentData(updatedUserData);
      setFormData(updatedUserData);
      setIsEditing(false);
      

    } catch (error) {
      console.error("Profile update error:", error);
      alert("Something went wrong.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePasswordUpdate = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    if (passwordData.newPassword.length < 6) {
      alert("Password must be at least 6 characters long!");
      return;
    }
    alert("Password updated successfully!");
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  // Show loading if currentUser is not loaded yet
  if (!currentUser) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Student Profile</h1>
        <p className="text-gray-600">
          Manage your account information and settings
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: "profile", label: "Profile Information" },
              { id: "certificates", label: "Certificates" },
              { id: "settings", label: "Account Settings" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Profile Information Tab */}
      {activeTab === "profile" && (
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-2xl"></div>

          <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
            <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 px-8 py-6">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">
                    Profile Information
                  </h2>
                  <p className="text-blue-100">Manage your personal details</p>
                </div>

                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center space-x-2 px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 hover:shadow-lg hover:scale-105 transform transition-all duration-300 border border-white/30"
                  >
                    <Edit3 size={18} />
                    <span className="font-medium">Edit Profile</span>
                  </button>
                ) : (
                  <div className="flex space-x-3">
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setFormData(studentData);
                      }}
                      disabled={isProcessing}
                      className="flex items-center space-x-2 px-5 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/30 disabled:opacity-50"
                    >
                      <X size={16} />
                      <span>Cancel</span>
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={isProcessing}
                      className="flex items-center space-x-2 px-5 py-3 bg-white text-blue-600 rounded-xl hover:bg-blue-50 hover:shadow-lg hover:scale-105 transform transition-all duration-300 font-medium disabled:opacity-75"
                    >
                      <Save
                        size={16}
                        className={isProcessing ? "animate-spin" : ""}
                      />
                      <span>{isProcessing ? "Saving..." : "Save Changes"}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="p-8">
              <div className="grid lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1 flex flex-col items-center">
                  <div className="relative group mb-6">
                    <div className="relative">
                      <img
                        src={
                          formData.profilePicture || "/api/placeholder/150/150"
                        }
                        alt="Profile"
                        className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-xl ring-4 ring-blue-100"
                        onError={(e) => {
                          e.target.src = "/api/placeholder/150/150";
                        }}
                      />
                      {isEditing && (
                        <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer">
                          <Camera className="text-white" size={28} />
                        </div>
                      )}
                    </div>
                    {isEditing && (
                      <button className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:shadow-xl hover:bg-blue-700 transition-all duration-300">
                        Change Photo
                      </button>
                    )}
                  </div>

                  <div className="w-full space-y-3">
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-800">
                          {currentUser?.user?.studentId
                            ? currentUser.user.studentId
                            : "N/A"}
                        </div>
                        <div className="text-sm text-gray-600">Student ID</div>
                      </div>
                    </div>

                    {currentUser?.user?.role && (
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                        <div className="text-center">
                          <div className="text-lg font-semibold text-gray-800 capitalize">
                            {currentUser.user.role}
                          </div>
                          <div className="text-sm text-gray-600">
                            Account Type
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="lg:col-span-3 space-y-6">
                  <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <User className="mr-2 text-blue-600" size={20} />
                      Personal Information
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          Full Name *
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="name"
                            value={formData.name || ""}
                            onChange={handleInputChange}
                            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white"
                            required
                          />
                        ) : (
                          <div className="flex items-center space-x-3 p-4 bg-white rounded-xl border-2 border-gray-100 shadow-sm">
                            <User size={18} className="text-gray-400" />
                            <span className="text-gray-800 font-medium">
                              {studentData.name || "Not provided"}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          Email Address
                        </label>
                        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl border-2 border-gray-100">
                          <Mail size={18} className="text-gray-400" />
                          <span className="text-gray-700">
                            {studentData.email || "Not provided"}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 flex items-center mt-1">
                          <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                          Email cannot be changed
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <Phone className="mr-2 text-purple-600" size={20} />
                      Contact & Personal Details
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          Mobile Number
                        </label>
                        {isEditing ? (
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone || ""}
                            onChange={handleInputChange}
                            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-white"
                          />
                        ) : (
                          <div className="flex items-center space-x-3 p-4 bg-white rounded-xl border-2 border-gray-100 shadow-sm">
                            <Phone size={18} className="text-gray-400" />
                            <span className="text-gray-800 font-medium">
                              {studentData.phone || "Not provided"}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          Date of Birth
                        </label>
                        {isEditing ? (
                          <input
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth || ""}
                            onChange={handleInputChange}
                            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-white"
                          />
                        ) : (
                          <div className="flex items-center space-x-3 p-4 bg-white rounded-xl border-2 border-gray-100 shadow-sm">
                            <Calendar size={18} className="text-gray-400" />
                            <span className="text-gray-800 font-medium">
                              {studentData.dateOfBirth || "Not provided"}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-6 space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        Gender
                      </label>
                      {isEditing ? (
                        <select
                          name="gender"
                          value={formData.gender || ""}
                          onChange={handleInputChange}
                          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-white"
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                          <option value="Prefer-not-to-say">
                            Prefer not to say
                          </option>
                        </select>
                      ) : (
                        <div className="p-4 bg-white rounded-xl border-2 border-gray-100 shadow-sm">
                          <span className="capitalize text-gray-800 font-medium">
                            {studentData.gender || "Not specified"}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Certificates Tab */}
      {activeTab === "certificates" && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            My Certificates
          </h2>

          {certificates.length > 0 ? (
            <div className="space-y-4">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {cert.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Course: {cert.courseTitle}
                      </p>
                      <p className="text-sm text-gray-600">
                        Issued: {new Date(cert.issueDate).toLocaleDateString()}
                      </p>
                    </div>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                      <Download size={16} />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">No certificates earned yet</p>
              <p className="text-sm text-gray-500">
                Complete courses to earn certificates
              </p>
            </div>
          )}
        </div>
      )}

      {/* Account Settings Tab */}
      {activeTab === "settings" && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <Key className="mr-2" size={20} />
              Change Password
            </h2>

            <div className="max-w-md space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              <button
                onClick={handlePasswordUpdate}
                className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
              >
                Update Password
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-red-200">
            <h2 className="text-xl font-semibold text-red-800 mb-4 flex items-center">
              <Trash2 className="mr-2" size={20} />
              Danger Zone
            </h2>

            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
              <p className="text-red-800 font-medium">Delete Account</p>
              <p className="text-red-600 text-sm mt-1">
                Once you delete your account, there is no going back. This will
                permanently delete your profile, course progress, and
                certificates.
              </p>
            </div>

            <button
              onClick={() => {
                if (
                  confirm(
                    "Are you sure you want to delete your account? This action cannot be undone."
                  )
                ) {
                  alert("Account deletion feature would be implemented here");
                }
              }}
              className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors font-medium"
            >
              Delete My Account
            </button>
          </div>
        </div>
      )}
    </div>
  );  
}