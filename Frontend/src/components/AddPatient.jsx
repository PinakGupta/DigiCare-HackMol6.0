import React, { useState, useEffect } from "react";

// PatientSearchBox Component
const PatientSearchBox = ({ searchQuery, setSearchQuery, isSearching }) => {
  return (
    <div className="relative mb-6">
      <input 
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Enter patient name..."
        className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition duration-200"
      />
      <span className="absolute left-3 top-3.5 text-gray-400">
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </span>
      {isSearching && (
        <span className="absolute right-3 top-3.5 text-blue-500">
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </span>
      )}
    </div>
  );
};

// PatientCard Component
// PatientCard Component - Updated to display profile photo
const PatientCard = ({ patient, isLinked, onAddPatient }) => {
    const avatarLetter = patient.name.charAt(0).toUpperCase();
    const genderColors = {
      Male: "bg-blue-100 text-blue-800",
      Female: "bg-pink-100 text-pink-800",
      Other: "bg-purple-100 text-purple-800"
    };
    
    return (
      <div className="flex justify-between items-center border border-gray-200 rounded-lg p-4 hover:bg-blue-50 transition-colors shadow-sm">
        <div className="flex items-center gap-4">
          {patient.profilePhoto ? (
            <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden">
              <img 
                src={patient.profilePhoto} 
                alt={patient.name} 
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-semibold text-xl">
              {avatarLetter}
            </div>
          )}
          <div>
            <h3 className="font-medium text-gray-800">{patient.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-gray-600">{patient.age} yrs</span>
              <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${genderColors[patient.gender] || "bg-gray-100 text-gray-800"}`}>
                {patient.gender}
              </span>
              <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
              <span className="text-sm font-medium text-gray-700">{patient.condition}</span>
            </div>
          </div>
        </div>
        <button 
          onClick={() => onAddPatient(patient)}
          className={`px-4 py-2 rounded-lg text-white font-medium transition-all transform hover:scale-105 ${
            isLinked 
              ? "bg-green-500 hover:bg-green-600" 
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isLinked ? (
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Added</span>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              <span>Add Patient</span>
            </div>
          )}
        </button>
      </div>
    );
  };

// SearchResults Component
const SearchResults = ({ searchResults, searchQuery, isSearching, linkedPatients, onAddPatient, error }) => {
  return (
    <div className="space-y-4">
      {error && (
        <div className="text-center py-10 bg-red-50 rounded-lg border border-red-200 border-dashed">
          <svg className="w-12 h-12 mx-auto text-red-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <p className="text-red-600 font-medium">Error loading patients</p>
          <p className="text-sm mt-2 text-red-500">{error}</p>
        </div>
      )}
      
      {!error && searchResults.length === 0 && searchQuery.trim() !== "" && !isSearching ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg border border-gray-200 border-dashed">
          <svg className="w-12 h-12 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <p className="text-gray-500">No patients found matching "<span className="font-medium">{searchQuery}</span>"</p>
          <p className="text-sm mt-2 text-gray-400">Try a different search term</p>
        </div>
      ) : (
        !error && searchResults.map(patient => (
          <PatientCard 
            key={patient.id}
            patient={patient}
            isLinked={linkedPatients.some(p => p.id === patient.id)}
            onAddPatient={onAddPatient}
          />
        ))
      )}
      
      {isSearching && (
        <div className="flex justify-center py-12">
          <div className="w-10 h-10 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

// Toast notification function
const toast = (message, type = "success") => {
  const bgColor = type === "success" ? "bg-blue-500" : "bg-red-500";
  
  const toastElement = document.createElement("div");
  toastElement.className = `fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-500 ease-in-out`;
  toastElement.textContent = message;
  document.body.appendChild(toastElement);
  
  setTimeout(() => {
    toastElement.classList.add("opacity-0");
    setTimeout(() => document.body.removeChild(toastElement), 500);
  }, 3000);
};

// LinkedPatients Component
// LinkedPatients Component - Updated to display profile photos
const LinkedPatients = ({ linkedPatients, onRemovePatient }) => {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
        <h2 className="text-xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          Your Patients
        </h2>
        
        {linkedPatients.length === 0 ? (
          <div className="text-center py-10 bg-gray-50 rounded-lg border border-gray-200 border-dashed">
            <svg className="w-14 h-14 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
            <p className="text-gray-500 font-medium">No patients added yet</p>
            <p className="text-sm mt-2 text-gray-400">Search and add patients to your list</p>
          </div>
        ) : (
          <div className="space-y-3">
            {linkedPatients.map(patient => (
              <div key={patient.id} className="flex justify-between items-center p-3 border border-gray-200 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
                <div className="flex items-center gap-3">
                  {patient.profilePhoto ? (
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <img 
                        src={patient.profilePhoto} 
                        alt={patient.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                      {patient.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <h3 className="font-medium text-gray-800">{patient.name}</h3>
                    <p className="text-xs text-gray-600">{patient.condition}</p>
                  </div>
                </div>
                <button 
                  onClick={() => onRemovePatient(patient.id)}
                  className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100 transition-colors"
                  title="Remove patient"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>
            ))}
  
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="bg-blue-100 rounded-lg p-3 flex items-center justify-between">
                <div className="text-sm font-medium text-blue-800">Total patients</div>
                <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                  {linkedPatients.length}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

// SearchSection Component
const SearchSection = ({ 
  searchQuery, 
  setSearchQuery, 
  searchResults, 
  isSearching, 
  linkedPatients, 
  handleAddPatient,
  error
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        Find Patients
      </h2>
      
      <PatientSearchBox 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        isSearching={isSearching} 
      />

      <SearchResults 
        searchResults={searchResults}
        searchQuery={searchQuery}
        isSearching={isSearching}
        linkedPatients={linkedPatients}
        onAddPatient={handleAddPatient}
        error={error}
      />
    </div>
  );
};

// API Service for Patient data
// API Service for Patient data
const PatientService = {
    // Base API URL - replace with your actual API endpoint
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost5000',
    
    // Get headers for API requests
    getHeaders() {
      // You can add authorization headers here if needed
      return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}` // If using token-based auth
      };
    },
    
    // Search patients by name
    async searchPatients(query) {
      try {
        const response = await fetch(`${this.baseUrl}/api/doctor-patient/patients/search?query=${encodeURIComponent(query)}`, {
          method: 'GET',
          headers: this.getHeaders(),
          credentials: 'include' // For cookies if using cookie-based auth
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch patients');
        }
        
        return await response.json();
      } catch (error) {
        console.error('Error searching patients:', error);
        throw error;
      }
    },
    
    // Add a patient to doctor's linked patients
    async addPatientToDoctor(patientId) {
      try {
        const response = await fetch(`${this.baseUrl}/api/doctor-patient/doctor/patients`, {
          method: 'POST',
          headers: this.getHeaders(),
          credentials: 'include',
          body: JSON.stringify({ patientId })
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to add patient');
        }
        
        return await response.json();
      } catch (error) {
        console.error('Error adding patient:', error);
        throw error;
      }
    },
    
    // Remove a patient from doctor's linked patients
    async removePatientFromDoctor(patientId) {
      try {
        const response = await fetch(`${this.baseUrl}/api/doctor-patient/doctor/patients/${patientId}`, {
          method: 'DELETE',
          headers: this.getHeaders(),
          credentials: 'include'
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to remove patient');
        }
        
        return await response.json();
      } catch (error) {
        console.error('Error removing patient:', error);
        throw error;
      }
    },
    
    // Get all linked patients for the current doctor
    async getDoctorPatients() {
      try {
        const response = await fetch(`${this.baseUrl}/api/doctor-patient/doctor/patients`, {
          method: 'GET',
          headers: this.getHeaders(),
          credentials: 'include'
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch doctor patients');
        }
        
        return await response.json();
      } catch (error) {
        console.error('Error fetching doctor patients:', error);
        throw error;
      }
    }
  };

// Main PatientSearch Component
const PatientSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [linkedPatients, setLinkedPatients] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);
  
  // Load doctor's linked patients on component mount
  useEffect(() => {
    const fetchLinkedPatients = async () => {
      try {
        const data = await PatientService.getDoctorPatients();
        setLinkedPatients(data);
      } catch (err) {
        toast(`Failed to load your patients: ${err.message}`, "error");
      }
    };
    
    fetchLinkedPatients();
  }, []);

  // Search for patients when query changes
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      setError(null);
      return;
    }

    setIsSearching(true);
    setError(null);
    
    // Debounce the API call with setTimeout
    const timeoutId = setTimeout(async () => {
      try {
        const data = await PatientService.searchPatients(searchQuery);
        setSearchResults(data);
        setIsSearching(false);
      } catch (err) {
        setError(err.message);
        setSearchResults([]);
        setIsSearching(false);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Handle adding patient to doctor
  const handleAddPatient = async (patient) => {
    // Check if patient is already linked
    if (linkedPatients.some(p => p.id === patient.id)) {
      toast("Patient is already linked to your account");
      return;
    }

    try {
      // Call API to add patient
      await PatientService.addPatientToDoctor(patient.id);
      
      // Update UI
      setLinkedPatients([...linkedPatients, patient]);
      toast("Patient added successfully");
    } catch (err) {
      toast(`Failed to add patient: ${err.message}`, "error");
    }
  };

  // Handle removing linked patient
  const handleRemovePatient = async (patientId) => {
    try {
      // Call API to remove patient
      await PatientService.removePatientFromDoctor(patientId);
      
      // Update UI
      setLinkedPatients(linkedPatients.filter(p => p.id !== patientId));
      toast("Patient removed from your list");
    } catch (err) {
      toast(`Failed to remove patient: ${err.message}`, "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100"> 
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
              </svg>
              <h1 className="text-xl font-bold text-gray-800">MediConnect</h1>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-gray-600 hover:text-gray-800">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                </svg>
              </button>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                D
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section - Search */}
          <div className="col-span-1 lg:col-span-2">
            <SearchSection
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              searchResults={searchResults}
              isSearching={isSearching}
              linkedPatients={linkedPatients}
              handleAddPatient={handleAddPatient}
              error={error}
            />
          </div>

          {/* Right Section - Linked Patients */}
          <div className="col-span-1">
            <LinkedPatients 
              linkedPatients={linkedPatients} 
              onRemovePatient={handleRemovePatient} 
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientSearch;