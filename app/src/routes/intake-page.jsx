import React, { useState } from "react";
import IntakeForm from "../components/intake-form/intake-form";

const IntakePage = () => {
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = (data) => {
    setSubmittedData(data);
    console.log("Form submitted:", data);
  };

  return (
    <div>
      <h1>Legal Intake Form</h1>
      <IntakeForm onSubmit={handleSubmit} />
    </div>
  );
}

export default IntakePage;