import { useState,useEffect } from "react";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Modal from "@/components/Patient/modal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogTrigger,DialogContent } from "@/components/ui/dialog";
import PriorAuthorizationForm from "@/components/Authorize/form";
import axios from "axios";

// Placeholder data
// const patients = [
//   { id: 1, name: "John Doe", age: 45, condition: "Hypertension" },
//   { id: 2, name: "Jane Smith", age: 32, condition: "Diabetes" },
//   { id: 3, name: "Bob Johnson", age: 58, condition: "Arthritis" },
//   { id: 4, name: "Alice Brown", age: 27, condition: "Asthma" },
//   { id: 5, name: "Charlie Davis", age: 63, condition: "Heart Disease" },
// ];

export default function PatientDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [openDialogPatientId, setOpenDialogPatientId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [patients, setPatients] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  useEffect(() => {
    setLoading(true);

    const fetchPatient=async()=>{
      try{
        const res=await axios.get(process.env.VITE_API_URL+"/patients")
        console.log(res.data)
        setPatients(res.data)
        setLoading(false)
      }catch(e){
        console.log(e)
        setLoading(false)
      }
    }
    fetchPatient()
  },[]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedPatients = [...filteredPatients].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const handleViewDetails = (patient) => {
    setSelectedPatient(patient);
  };
  const handleDialogOpen = (patientId) => {
    setOpenDialogPatientId(patientId); // Open the dialog for the selected patient
  };
  const handleDialogClose = () => {
    setOpenDialogPatientId(null); // Close the dialog
  };

  if(loading){
    return <Modal open={loading} setOpen={setLoading}></Modal>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Patient Dashboard</h1>
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search patients..."
            className="pl-8"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                onClick={() => handleSort("name")}
                className="cursor-pointer"
              >
                Name{" "}
                {sortConfig.key === "name" &&
                  (sortConfig.direction === "ascending" ? (
                    <ChevronUp className="inline" />
                  ) : (
                    <ChevronDown className="inline" />
                  ))}
              </TableHead>
              <TableHead
                onClick={() => handleSort("age")}
                className="cursor-pointer"
              >
                Age{" "}
                {sortConfig.key === "age" &&
                  (sortConfig.direction === "ascending" ? (
                    <ChevronUp className="inline" />
                  ) : (
                    <ChevronDown className="inline" />
                  ))}
              </TableHead>
              <TableHead
                onClick={() => handleSort("condition")}
                className="cursor-pointer"
              >
                Condition{" "}
                {sortConfig.key === "condition" &&
                  (sortConfig.direction === "ascending" ? (
                    <ChevronUp className="inline" />
                  ) : (
                    <ChevronDown className="inline" />
                  ))}
              </TableHead>
              <TableHead>Actions</TableHead>
              <TableHead>Authorised form</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedPatients.map((patient) => (
              <TableRow key={patient._id}>
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.age}</TableCell>
                <TableCell>{patient.condition}</TableCell>
                <TableCell>
                  <Button onClick={() => handleViewDetails(patient)}>
                    View Details
                  </Button>
                </TableCell>
                <TableCell>
                <Dialog
                    open={openDialogPatientId === patient._id} // Check if the dialog should be open for this patient
                    onOpenChange={(isOpen) => {
                      if (isOpen) {
                        handleDialogOpen(patient._id);
                      } else {
                        handleDialogClose();
                      }
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        Start Prior Authorization Request
                      </Button>
                    </DialogTrigger>
                    <PriorAuthorizationForm patientId={patient._id} />
                  </Dialog>
                  
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {selectedPatient && (
        <div className="mt-4 p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Patient Details</h2>
          <p>
            <strong>Name:</strong> {selectedPatient.name}
          </p>
          <p>
            <strong>Age:</strong> {selectedPatient.age}
          </p>
          <p>
            <strong>Condition:</strong> {selectedPatient.condition}
          </p>
          {/* Add more detailed information here */}
        </div>
      )}
    </div>
  );
}
