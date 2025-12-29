import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import ButtonLoader from "./ButtonLoader";
import { Eye, EyeOff } from "lucide-react";

export default function Profile() {
  const [user, setUser] = useState({});
  const [passwords, setPasswords] = useState({ old: "", new: "" });
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  useEffect(() => {
    api.get("/users/profile").then(res => setUser(res.data));
  }, []);

  const updateProfile = async () => {
    setIsUpdatingProfile(true);
    try {
      await api.patch("/users/profile-update", {
        fullName: user.fullName,
        email: user.email,
      });
      toast.success("Profile updated");
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const changePassword = async () => {
    setIsChangingPassword(true);
    try {
      await api.patch("/users/change-password", {
        oldPassword: passwords.old,
        newPassword: passwords.new,
      });
      toast.success("Password changed");
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-2">Profile Settings</h1>
          <p className="text-slate-600">Manage your account information and security</p>
        </div>

        {/* Profile Information Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6 transition-all hover:shadow-xl">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
              {user.fullName?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800">Personal Information</h2>
              <p className="text-sm text-slate-500">Update your profile details</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Full Name
              </label>
              <input
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-slate-800"
                value={user.fullName || ""}
                onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address
              </label>
              <input
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-slate-800"
                value={user.email || ""}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Enter your email"
                type="email"
              />
            </div>
          </div>

          <button
            onClick={updateProfile}
            disabled={isUpdatingProfile}
            className="w-full sm:w-auto mt-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-3 rounded-lg transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
          >
            {isUpdatingProfile && <ButtonLoader />}
            {isUpdatingProfile ? "Saving..." : "Save Changes"}
          </button>
        </div>

        {/* Change Password Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 transition-all hover:shadow-xl">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
              🔒
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800">Security</h2>
              <p className="text-sm text-slate-500">Update your password</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Current Password
              </label>
              <div className="relative">
                <input
                  className="w-full px-4 py-3 pr-12 border-2 border-slate-200 rounded-lg focus:border-red-500 focus:outline-none transition-colors text-slate-800"
                  type={showOldPassword ? "text" : "password"}
                  placeholder="Enter current password"
                  onChange={(e) => setPasswords({ ...passwords, old: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors"
                >
                  {showOldPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  className="w-full px-4 py-3 pr-12 border-2 border-slate-200 rounded-lg focus:border-red-500 focus:outline-none transition-colors text-slate-800"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors"
                >
                  {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={changePassword}
            disabled={isChangingPassword}
            className="w-full sm:w-auto mt-6 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold px-8 py-3 rounded-lg transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
          >
            {isChangingPassword && <ButtonLoader />}
            {isChangingPassword ? "Changing..." : "Change Password"}
          </button>
        </div>
      </div>
    </div>
  );
}