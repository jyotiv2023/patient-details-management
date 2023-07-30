import { useState, useEffect } from "react";
import axios from "axios";

const useFetchPatientsByAge = (minAge, maxAge) => {
  const [patients, setPatients] = useState([]);

  const [filteredPatients, setFilteredPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      const apiUrl = "https://hapi.fhir.org/baseR4/Patient?_pretty=true";

      try {
        const response = await axios.get(apiUrl);
        if (response.status === 200) {
          const data = response.data;
          console.log(" data", data);
          if (data?.entry) {
            const processedPatients = data.entry.map((entry) => {
              const patient = entry.resource;
              console.log("patient", patient);
              const age = patient.birthDate
                ? calculateAge(patient.birthDate)
                : "--";

              // Fetch the address components individually
              const addressLine = patient.address?.[0]?.line?.[0];
              const city = patient.address?.[0]?.city;
              const postalCode = patient.address?.[0]?.postalCode;

              // Construct the address string based on available components
              let address = "N/A";
              if (addressLine || city || postalCode) {
                address = [
                  addressLine || "N/A",
                  city || "N/A",
                  `Postal Code: ${postalCode || "N/A"}`,
                ].join(", ");
              }

              return {
                id: patient.id,
                name: `${patient.name?.[0]?.given?.[0]} ${patient.name?.[0]?.family}`,
                gender: patient.gender || "--",
                birthDate: patient.birthDate || "--",
                address: address,
                phone: patient.telecom?.[0]?.value || "--",
                age: age,
              };
            });

            console.log("processedPatients", processedPatients);
            setPatients(processedPatients);
          }
        } else {
          console.error("Request failed with status:", response.status);
        }
      } catch (error) {
        console.error("Error occurred:", error);
      }
    };

    fetchPatients();
  }, []);

  useEffect(() => {
    if (minAge === 0 && maxAge === 100) {
      setFilteredPatients(patients);
    } else {
      const filtered = patients.filter((patient) => {
        if (patient.age === "--" || isNaN(patient.age)) {
          return false;
        }
        return patient.age >= minAge && patient.age <= maxAge;
      });
      setFilteredPatients(filtered);
    }
  }, [minAge, maxAge, patients]);

  const calculateAge = (birthdate) => {
    if (!birthdate) {
      return "--"; // or return any default value you prefer for missing birthdate
    }

    const birthDate = new Date(birthdate);
    if (isNaN(birthDate.getTime())) {
      return "--"; // or return any default value for invalid birthdate
    }

    const ageInMilliseconds = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageInMilliseconds);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  return filteredPatients;
};

export default useFetchPatientsByAge;
