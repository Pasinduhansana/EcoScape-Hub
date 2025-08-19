import React, { useState, useEffect } from "react";
import {
  XMarkIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  PencilIcon,
  StarIcon,
  HeartIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { toast } from "react-hot-toast";

const CustomerDetails = ({ customer, onClose, onEdit }) => {
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (customer) {
      fetchMaintenanceRequests();
    }
  }, [customer]);

  const fetchMaintenanceRequests = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/maintenance?customerId=${customer._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setMaintenanceRequests(data.data.requests);
      }
    } catch (error) {
      console.error("Error fetching maintenance requests:", error);
      toast.error("Failed to fetch maintenance requests");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getLoyaltyBadgeColor = (status) => {
    switch (status) {
      case "bronze":
        return "bg-amber-100 text-amber-800";
      case "silver":
        return "bg-gray-100 text-gray-800";
      case "gold":
        return "bg-yellow-100 text-yellow-800";
      case "platinum":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-gray-100 text-gray-800";
      case "in-progress":
        return "bg-orange-100 text-orange-800";
      case "scheduled":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return "N/A";
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  if (!customer) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-10 mx-auto p-5 border w-full max-w-6xl shadow-lg rounded-md bg-white">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-full bg-gray-300 flex items-center justify-center">
              <UserIcon className="h-8 w-8 text-gray-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                {customer.name}
              </h3>
              <p className="text-gray-600">#{customer.registrationNumber}</p>
              <div className="flex items-center space-x-2 mt-1">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(
                    customer.status
                  )}`}
                >
                  {customer.status}
                </span>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLoyaltyBadgeColor(
                    customer.loyaltyStatus
                  )}`}
                >
                  {customer.loyaltyStatus}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={onEdit}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <PencilIcon className="h-4 w-4" />
              <span>Edit</span>
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("overview")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "overview"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("services")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "services"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Service History
            </button>
            <button
              onClick={() => setActiveTab("referrals")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "referrals"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Referrals & Loyalty
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="max-h-96 overflow-y-auto">
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Personal Information
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-900">{customer.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <PhoneIcon className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-900">{customer.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CalendarIcon className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-900">
                      {customer.dateOfBirth
                        ? `${formatDate(
                            customer.dateOfBirth
                          )} (Age: ${calculateAge(customer.dateOfBirth)})`
                        : "Not provided"}
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPinIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div className="text-gray-900">
                      {customer.address?.street && (
                        <div>{customer.address.street}</div>
                      )}
                      {(customer.address?.city ||
                        customer.address?.state ||
                        customer.address?.zipCode) && (
                        <div>
                          {customer.address.city && customer.address.city}
                          {customer.address.city &&
                            customer.address.state &&
                            ", "}
                          {customer.address.state && customer.address.state}
                          {customer.address.zipCode &&
                            ` ${customer.address.zipCode}`}
                        </div>
                      )}
                      {customer.address?.country &&
                        customer.address.country !== "USA" && (
                          <div>{customer.address.country}</div>
                        )}
                      {!customer.address?.street && !customer.address?.city && (
                        <span className="text-gray-500">
                          No address provided
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Statistics */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Customer Statistics
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {customer.totalServicesCount || 0}
                    </div>
                    <div className="text-sm text-gray-600">Total Services</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {formatCurrency(customer.totalSpent || 0)}
                    </div>
                    <div className="text-sm text-gray-600">Total Spent</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {customer.loyaltyPoints || 0}
                    </div>
                    <div className="text-sm text-gray-600">Loyalty Points</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {customer.referralCount || 0}
                    </div>
                    <div className="text-sm text-gray-600">Referrals Made</div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-600">
                    <div>Customer since: {formatDate(customer.createdAt)}</div>
                    {customer.lastServiceDate && (
                      <div>
                        Last service: {formatDate(customer.lastServiceDate)}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Preferences */}
              <div className="bg-gray-50 rounded-lg p-6 lg:col-span-2">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Preferences & Notes
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">
                      Preferred Services
                    </h5>
                    {customer.preferences?.serviceTypes?.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {customer.preferences.serviceTypes.map(
                          (service, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {service}
                            </span>
                          )
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-500 text-sm">
                        No preferences set
                      </span>
                    )}
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">
                      Communication Method
                    </h5>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {customer.preferences?.communicationMethod || "Email"}
                    </span>
                  </div>
                  {customer.preferences?.specialInstructions && (
                    <div className="md:col-span-2">
                      <h5 className="font-medium text-gray-900 mb-2">
                        Special Instructions
                      </h5>
                      <p className="text-gray-700 text-sm bg-white p-3 rounded border">
                        {customer.preferences.specialInstructions}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "services" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-900">
                  Service History
                </h4>
                <span className="text-sm text-gray-600">
                  {maintenanceRequests.length} total requests
                </span>
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-2 text-gray-600">
                    Loading service history...
                  </span>
                </div>
              ) : maintenanceRequests.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No service requests found for this customer.
                </div>
              ) : (
                <div className="space-y-4">
                  {maintenanceRequests.map((request) => (
                    <div
                      key={request._id}
                      className="bg-white border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <h5 className="font-medium text-gray-900">
                            {request.serviceType}
                          </h5>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(
                              request.status
                            )}`}
                          >
                            {request.status}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {formatDate(request.createdAt)}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm mb-2">
                        {request.description}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Priority: {request.priority}</span>
                        {request.estimatedCost && (
                          <span>
                            Estimated: {formatCurrency(request.estimatedCost)}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "referrals" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Loyalty Information */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <StarIcon className="h-5 w-5 text-yellow-500" />
                  <h4 className="text-lg font-semibold text-gray-900">
                    Loyalty Program
                  </h4>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Current Status
                      </span>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLoyaltyBadgeColor(
                          customer.loyaltyStatus
                        )}`}
                      >
                        {customer.loyaltyStatus}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Current Points
                      </span>
                      <span className="font-medium text-gray-900">
                        {customer.loyaltyPoints || 0}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Points to Next Level
                      </span>
                      <span className="font-medium text-gray-900">
                        {customer.loyaltyStatus === "platinum"
                          ? "Max Level"
                          : customer.loyaltyStatus === "gold"
                          ? 5000 - (customer.loyaltyPoints || 0)
                          : customer.loyaltyStatus === "silver"
                          ? 1000 - (customer.loyaltyPoints || 0)
                          : 500 - (customer.loyaltyPoints || 0)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Referral Information */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <UsersIcon className="h-5 w-5 text-blue-500" />
                  <h4 className="text-lg font-semibold text-gray-900">
                    Referral Program
                  </h4>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Total Referrals
                      </span>
                      <span className="font-medium text-gray-900">
                        {customer.referralCount || 0}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Referral Discount Used
                      </span>
                      <span className="font-medium text-gray-900">
                        {customer.referralDiscountUsed ? "Yes" : "No"}
                      </span>
                    </div>
                  </div>
                  {customer.referredBy && (
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          Referred By
                        </span>
                        <span className="font-medium text-gray-900">
                          Customer ID: {customer.referredBy}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
