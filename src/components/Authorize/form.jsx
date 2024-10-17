import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// import { useToast } from "@/components/hooks/use-toast"

const PriorAuthorizationSchema = Yup.object().shape({
  treatmentType: Yup.string().required("Treatment type is required"),
  insurancePlan: Yup.string().required("Insurance plan is required"),
  dateOfService: Yup.date().required("Date of service is required"),
  diagnosisCode: Yup.string().required("Diagnosis code is required"),
  providerId: Yup.string().required("Provider ID is required"),
  patientId: Yup.string().required("Patient ID is required"),
});

export default function PriorAuthorizationForm({ patientId }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(values);
    setIsSubmitting(false);
    setIsDialogOpen(false);
    resetForm();
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
              treatmentType: "",
              insurancePlan: "",
              dateOfService: "",
              diagnosisCode: "",
              providerId: "",
              patientId: "",
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
                  <Label htmlFor="providerId">Provider ID</Label>
                  <Field
                    as={Input}
                    id="providerId"
                    name="providerId"
                    placeholder="Enter provider ID"
                    className={
                      errors.providerId && touched.providerId
                        ? "border-red-500"
                        : ""
                    }
                  />
                  <ErrorMessage
                    name="providerId"
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

                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </Button>
              </Form>
            )}
          </Formik>
        )}
      </DialogContent>
    </>
  );
}
