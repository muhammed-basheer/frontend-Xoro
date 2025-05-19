import { useState } from "react";
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Shield, 
  Edit, 
  Lock, 
  Ban, 
  Check, 
  AlertTriangle, 
  MoreVertical, 
  ChevronLeft,
  BookOpen,
  Award,
  Clock,
  CreditCard,
  PieChart,
  UserCheck,
  History
} from "lucide-react";

const UserManagement = () => {
  // In a real app, you'd fetch this data from your API
  const [user, setUser] = useState({
    id: "USR1234567",
    name: "Alexandra Morrison",
    email: "alex.morrison@example.com", 
    phone: "+1 (555) 123-4567",
    avatar: null, // Placeholder for user avatar
    address: "123 Learning Street, Education City, 10001",
    joinDate: "2023-06-15",
    lastActive: "2025-05-18T14:22:00",
    status: "active", // active, inactive, banned
    role: "student", // student, instructor, admin
    verified: true,
    courses: [
      { id: "CRS001", name: "Advanced React Development", progress: 78, completed: false },
      { id: "CRS002", name: "UX Design Fundamentals", progress: 100, completed: true },
      { id: "CRS003", name: "Digital Marketing Strategy", progress: 45, completed: false }
    ],
    paymentInfo: {
      method: "Credit Card",
      last4: "4242",
      expiryDate: "09/26"
    },
    subscriptionTier: "Premium",
    subscriptionRenewal: "2025-07-15",
    certifications: [
      { id: "CERT001", name: "UX Design Foundations", issueDate: "2024-02-10" }
    ],
    notes: "Very engaged student. Consistently completes assignments on time."
  });

  const [activeTab, setActiveTab] = useState("profile");
  const [showConfirmBan, setShowConfirmBan] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({...user});

  // Calculate time since last active
  const getTimeAgo = (dateString) => {
    const now = new Date();
    const lastActive = new Date(dateString);
    const diffInMinutes = Math.floor((now - lastActive) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)} days ago`;
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setUser(editForm);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm({
      ...editForm,
      [name]: value
    });
  };

  const handleBanUser = () => {
    setUser({
      ...user,
      status: user.status === "banned" ? "active" : "banned"
    });
    setShowConfirmBan(false);
  };

  // Status badge color classes
  const getStatusClasses = (status) => {
    switch(status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "inactive":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "banned":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      {/* Back button and header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">User Details</h1>
        </div>
        <div className="flex items-center space-x-2">
          {!isEditing && (
            <>
              <button 
                onClick={() => setIsEditing(true)}
                className="flex items-center px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-md hover:bg-indigo-100 dark:bg-indigo-900 dark:text-indigo-200 dark:hover:bg-indigo-800"
              >
                <Edit className="h-4 w-4 mr-1" />
                <span>Edit</span>
              </button>
              <button className="flex items-center px-3 py-1.5 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800">
                <Lock className="h-4 w-4 mr-1" />
                <span>Reset Password</span>
              </button>
              <button 
                onClick={() => setShowConfirmBan(true)}
                className={`flex items-center px-3 py-1.5 rounded-md ${
                  user.status === "banned" 
                    ? "bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-900 dark:text-green-200 dark:hover:bg-green-800" 
                    : "bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-800"
                }`}
              >
                {user.status === "banned" ? (
                  <>
                    <Check className="h-4 w-4 mr-1" />
                    <span>Unban</span>
                  </>
                ) : (
                  <>
                    <Ban className="h-4 w-4 mr-1" />
                    <span>Ban</span>
                  </>
                )}
              </button>
            </>
          )}
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <MoreVertical className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-6">
        {!isEditing ? (
          <div className="flex flex-col md:flex-row md:space-x-6">
            {/* Left column with avatar and basic info */}
            <div className="md:w-1/3">
              <div className="flex flex-col items-center">
                <div className="w-28 h-28 rounded-full bg-indigo-600 flex items-center justify-center text-3xl font-bold text-white">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <h2 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">{user.name}</h2>
                <span className={`mt-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusClasses(user.status)}`}>
                  {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                </span>
                <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Shield className="h-4 w-4 mr-1" />
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </div>
                <div className="mt-4 w-full">
                  <div className="flex items-center px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg mb-2">
                    <UserCheck className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Account Status</p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white flex items-center">
                        {user.verified ? (
                          <>
                            <Check className="h-4 w-4 text-green-500 mr-1" />
                            Verified
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="h-4 w-4 text-yellow-500 mr-1" />
                            Not Verified
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg mb-2">
                    <History className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Last Active</p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white">{getTimeAgo(user.lastActive)}</p>
                    </div>
                  </div>
                  <div className="flex items-center px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Joined</p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white">{formatDate(user.joinDate)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column with tabs */}
            <div className="md:w-2/3 mt-6 md:mt-0">
              {/* Tab navigation */}
              <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="flex space-x-4">
                  <button 
                    onClick={() => setActiveTab("profile")}
                    className={`px-3 py-2 text-sm font-medium ${
                      activeTab === "profile" 
                        ? "border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400" 
                        : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    }`}
                  >
                    Profile
                  </button>
                  <button 
                    onClick={() => setActiveTab("courses")}
                    className={`px-3 py-2 text-sm font-medium ${
                      activeTab === "courses" 
                        ? "border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400" 
                        : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    }`}
                  >
                    Courses
                  </button>
                  <button 
                    onClick={() => setActiveTab("billing")}
                    className={`px-3 py-2 text-sm font-medium ${
                      activeTab === "billing" 
                        ? "border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400" 
                        : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    }`}
                  >
                    Billing
                  </button>
                </nav>
              </div>

              {/* Tab content */}
              <div className="mt-4">
                {activeTab === "profile" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <Mail className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
                          <p className="text-sm font-medium text-gray-800 dark:text-white">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <Phone className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Phone</p>
                          <p className="text-sm font-medium text-gray-800 dark:text-white">{user.phone}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <MapPin className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Address</p>
                        <p className="text-sm font-medium text-gray-800 dark:text-white">{user.address}</p>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white mt-6">Additional Information</h3>
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Notes</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{user.notes}</p>
                    </div>
                    
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white mt-6">Certifications</h3>
                    <div className="space-y-2">
                      {user.certifications.map(cert => (
                        <div key={cert.id} className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <Award className="h-5 w-5 text-indigo-500 mr-2" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800 dark:text-white">{cert.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Issued on {formatDate(cert.issueDate)}</p>
                          </div>
                        </div>
                      ))}
                      {user.certifications.length === 0 && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">No certifications yet.</p>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === "courses" && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Enrolled Courses</h3>
                    <div className="space-y-4">
                      {user.courses.map(course => (
                        <div key={course.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div className="flex justify-between items-start">
                            <div className="flex items-start">
                              <BookOpen className="h-5 w-5 text-indigo-500 mr-2 mt-1" />
                              <div>
                                <h4 className="text-sm font-medium text-gray-800 dark:text-white">{course.name}</h4>
                                <div className="flex items-center mt-1">
                                  <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                                    <Clock className="h-3 w-3 mr-1" />
                                    Progress: {course.progress}%
                                  </div>
                                  {course.completed && (
                                    <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs rounded-full">
                                      Completed
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <button className="text-xs text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
                              View Details
                            </button>
                          </div>
                          <div className="mt-2 w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5">
                            <div 
                              className="bg-indigo-600 h-1.5 rounded-full" 
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                      {user.courses.length === 0 && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">Not enrolled in any courses.</p>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === "billing" && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Subscription</h3>
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-start space-x-3 mb-4">
                      <PieChart className="h-6 w-6 text-indigo-500" />
                      <div>
                        <div className="flex items-center">
                          <h4 className="text-sm font-medium text-gray-800 dark:text-white">{user.subscriptionTier} Plan</h4>
                          <span className="ml-2 px-2 py-0.5 bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 text-xs rounded-full">
                            Active
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Renews on {formatDate(user.subscriptionRenewal)}
                        </p>
                      </div>
                    </div>

                    <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Payment Method</h3>
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-start space-x-3">
                      <CreditCard className="h-6 w-6 text-indigo-500" />
                      <div>
                        <h4 className="text-sm font-medium text-gray-800 dark:text-white">{user.paymentInfo.method}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          **** **** **** {user.paymentInfo.last4}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Expires {user.paymentInfo.expiryDate}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Edit Form */
          <form onSubmit={handleEditSubmit}>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">Basic Information</h3>
                <div className="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Full Name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={editForm.name}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={editForm.email}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Phone Number
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        value={editForm.phone}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Status
                    </label>
                    <div className="mt-1">
                      <select
                        id="status"
                        name="status"
                        value={editForm.status}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="banned">Banned</option>
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Address
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="address"
                        id="address"
                        value={editForm.address}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Notes
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="notes"
                        name="notes"
                        rows={3}
                        value={editForm.notes}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        )}
      </div>

      {/* Confirmation Modal for Ban/Unban */}
      {showConfirmBan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md mx-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              {user.status === "banned" ? "Confirm Unban User" : "Confirm Ban User"}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {user.status === "banned" 
                ? "Are you sure you want to unban this user? They will regain access to the platform."
                : "Are you sure you want to ban this user? They will lose access to the platform."
              }
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirmBan(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleBanUser}
                className={`px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  user.status === "banned"
                    ? "bg-green-600 hover:bg-green-700 focus:ring-green-500"
                    : "bg-red-600 hover:bg-red-700 focus:ring-red-500"
                }`}
              >
                {user.status === "banned" ? "Unban User" : "Ban User"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;