import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
// import { useToast } from "@/components/hooks/use-toast"

const PriorAuthorizationSchema = Yup.object().shape({
  treatmentType: Yup.string().required("Treatment type is required"),
  insurancePlan: Yup.string().required("Insurance plan is required"),
  dateOfService: Yup.date().required("Date of service is required"),
  diagnosisCode: Yup.string().required("Diagnosis code is required"),
  doctorNotes: Yup.string(),
  patientId: Yup.string().required("Patient ID is required"),
});

export default function PriorAuthorizationForm({
  patientId,
  setOpenDialogPatientId,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authData, setAuthData] = useState(null);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);

  useEffect(() => {
    setAuthData(null);
    setAlreadySubmitted(false);

    if (!patientId) return;
    setLoading(true);

    const fetchAuthorization = async () => {
      try {
        console.log(import.meta.env.VITE_API_URL);
        const res = await axios.get(
          "https://basys-ai-server.vercel.app/api/authorizations/"+patientId
        );
        if (!res.data.success) {
          setLoading(false);
          return;
        }
        setAuthData(res.data.data);
        setAlreadySubmitted(true);
      } catch (error) {
        console.error("Error fetching authorization data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorization();
  }, [patientId]);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    try {
      const res = await axios.post(
        "https://basys-ai-server.vercel.app/api"+"/authorizations/post",
        values
      );
      alert("Request submitted successfully");
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
      resetForm();
      setOpenDialogPatientId(null);
    }
  };

  return (
    <>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Prior Authorization Request</DialogTitle>
          <DialogDescription>
            Please fill out the form below to submit a prior authorization
            request.
          </DialogDescription>
        </DialogHeader>
        {loading ? (
          <div className="text-center">
            <p>Loading...</p>
          </div>
        ) : (
          <Formik
            initialValues={{
              treatmentType: authData?.[0]?.treatmentType || "",
              insurancePlan: authData?.[0]?.insurancePlan || "",
              dateOfService: authData?.[0]?.dateOfService || "",
              diagnosisCode: authData?.[0]?.diagnosisCode || "",
              doctorNotes: authData?.[0]?.doctorNotes || "",
              patientId: patientId,
            }}
            validationSchema={PriorAuthorizationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form className="space-y-4">
                <div>
                  <Label htmlFor="treatmentType">Treatment Type</Label>
                  <Field
                    as={Input}
                    id="treatmentType"
                    name="treatmentType"
                    disabled={alreadySubmitted}
                    placeholder="Enter treatment type"
                    className={
                      errors.treatmentType && touched.treatmentType
                        ? "border-red-500"
                        : ""
                    }
                  />
                  <ErrorMessage
                    name="treatmentType"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="insurancePlan">Insurance Plan</Label>
                  <Field
                    as={Input}
                    id="insurancePlan"
                    name="insurancePlan"
                    disabled={alreadySubmitted}
                    placeholder="Enter insurance plan"
                    className={
                      errors.insurancePlan && touched.insurancePlan
                        ? "border-red-500"
                        : ""
                    }
                  />
                  <ErrorMessage
                    name="insurancePlan"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="dateOfService">Date of Service</Label>
                  <Field
                    as={Input}
                    id="dateOfService"
                    name="dateOfService"
                    disabled={alreadySubmitted}
                    type="date"
                    className={
                      errors.dateOfService && touched.dateOfService
                        ? "border-red-500"
                        : ""
                    }
                  />
                  <ErrorMessage
                    name="dateOfService"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="diagnosisCode">Diagnosis Code</Label>
                  <Field
                    as={Input}
                    id="diagnosisCode"
                    name="diagnosisCode"
                    disabled={alreadySubmitted}
                    placeholder="Enter diagnosis code"
                    className={
                      errors.diagnosisCode && touched.diagnosisCode
                        ? "border-red-500"
                        : ""
                    }
                  />
                  <ErrorMessage
                    name="diagnosisCode"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="providerId">Doctor Notes</Label>
                  <Field
                    as={Input}
                    id="doctorNotes"
                    name="doctorNotes"
                    disabled={alreadySubmitted}
                    placeholder="Enter Doctor Notes"
                    className={
                      errors.doctorNotes && touched.doctorNotes
                        ? "border-red-500"
                        : ""
                    }
                  />
                  <ErrorMessage
                    name="doctorNotes"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="patientId">Patient ID</Label>
                  <Field
                    as={Input}
                    id="patientId"
                    name="patientId"
                    disabled={alreadySubmitted}
                    value={patientId}
                    placeholder="Enter patient ID"
                    className={
                      errors.patientId && touched.patientId
                        ? "border-red-500"
                        : ""
                    }
                  />
                  <ErrorMessage
                    name="patientId"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="flex gap-x-8">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Request"}
                  </Button>
                  {alreadySubmitted && (
                    <Badge className="bg-[#ffde21]">Pending</Badge>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        )}
      </DialogContent>
    </>
  );
}
