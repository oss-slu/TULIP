
import { useState } from "react";

export default function SubmissionReviewPage() {
  const [checklist, setChecklist] = useState({
    completeness: false,
    conflict: false,
    documents: false,
    identity: false,
    caseEntry: false,
  });

  const [flagReason, setFlagReason] = useState("");
  const [staffComment, setStaffComment] = useState("");

  // Sample data until the page is connected to the backend
  const submission = {
    name: "Jane Doe",
    id: "TULIP-001",
    caseType: "Civil Litigation",
    dateSubmitted: "November 5, 2026",
    status: "Under Review",
    assignedStaff: "Not assigned",
    lastUpdated: "Not available",
  };

  const reviewItems = [
    {
      key: "completeness",
      title: "Form completeness",
      description: "Confirm all required intake fields are complete.",
    },
    {
      key: "conflict",
      title: "Conflict check",
      description: "Record whether a potential conflict was identified.",
    },
    {
      key: "documents",
      title: "Document receipt",
      description: "Confirm required supporting documents have been received.",
    },
    {
      key: "identity",
      title: "Client ID verification",
      description: "Confirm the client's identity has been verified.",
    },
    {
      key: "caseEntry",
      title: "Case management entry",
      description:
        "Confirm the submission has been entered into the case management system.",
    },
  ];

  const toggleChecklist = (key) => {
    setChecklist((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));
  };

  const styles = {
    page: {
      maxWidth: "900px",
      margin: "40px auto",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      color: "#111",
    },
    heading: {
      fontFamily: "Georgia, serif",
      fontSize: "42px",
      fontWeight: "normal",
      marginBottom: "10px",
    },
    sectionHeading: {
      fontFamily: "Georgia, serif",
      fontSize: "28px",
      fontWeight: "normal",
      marginBottom: "12px",
    },
    description: {
      fontSize: "14px",
      color: "#555",
      marginBottom: "30px",
    },
    detailsGrid: {
      display: "grid",
      gridTemplateColumns: "2fr 1fr",
      border: "1px solid #ddd",
      marginBottom: "40px",
    },
    detailsCell: {
      padding: "16px",
      borderBottom: "1px solid #ddd",
    },
    statusCell: {
      padding: "16px",
      borderBottom: "1px solid #ddd",
      borderLeft: "1px solid #ddd",
    },
    smallLabel: {
      fontSize: "12px",
      fontWeight: "bold",
      color: "#666",
      textTransform: "uppercase",
    },
    checklistRow: {
      display: "flex",
      alignItems: "center",
      gap: "20px",
      padding: "20px 10px",
      borderBottom: "1px solid #ddd",
      cursor: "pointer",
    },
    checkbox: {
      width: "18px",
      height: "18px",
      accentColor: "#111",
      cursor: "pointer",
    },
    input: {
      width: "100%",
      padding: "12px",
      marginTop: "8px",
      marginBottom: "20px",
      border: "1px solid #ccc",
      fontFamily: "Arial, sans-serif",
      fontSize: "14px",
      boxSizing: "border-box",
    },
  };

  return (
    <main style={styles.page}>
      <p style={styles.smallLabel}>
        Saint Louis University Legal Clinics Program
      </p>

      <h1 style={styles.heading}>Submission Review.</h1>
      <p style={styles.description}>
        Review intake information and confirm all required steps
        before moving a submission forward.
      </p>

      {/* Submission Details */}
      <section style={styles.detailsGrid}>
        <div style={styles.detailsCell}>
          <span style={styles.smallLabel}>Submission Details</span>
        </div>

        <div style={styles.statusCell}>
          <span style={styles.smallLabel}>Review Status</span>
        </div>

        <div style={styles.detailsCell}>
          <h2 style={{ margin: 0, fontSize: "22px" }}>
            {submission.name}
          </h2>
        </div>

        <div style={styles.statusCell}>
          {submission.status}
        </div>

        <div style={{ ...styles.detailsCell, borderBottom: "none" }}>
          <p>Submission ID: {submission.id}</p>
          <p>Case Type: {submission.caseType}</p>
          <p>Date Submitted: {submission.dateSubmitted}</p>
        </div>

        <div style={{ ...styles.statusCell, borderBottom: "none" }}>
          <p>Assigned staff: {submission.assignedStaff}</p>
          <p>Last updated: {submission.lastUpdated}</p>
        </div>
      </section>

      {/* Staff Review Checklist */}
      <section style={{ marginBottom: "40px" }}>
        <h2 style={styles.sectionHeading}>
          Staff review checklist.
        </h2>
        <p style={styles.description}>
          Mark each item when it has been reviewed and confirmed.
        </p>

        <div style={{ borderTop: "1px solid #ddd" }}>
          {reviewItems.map((item) => (
            <label key={item.key} style={styles.checklistRow}>
              <input
                type="checkbox"
                checked={checklist[item.key]}
                onChange={() => toggleChecklist(item.key)}
                style={styles.checkbox}
              />
              <div>
                <strong>{item.title}</strong>
                <p style={{ fontSize: "13px", color: "#666" }}>
                  {item.description}
                </p>
              </div>
            </label>
          ))}
        </div>
      </section>

      {/* Flag or Comment */}
      <section>
        <h2 style={styles.sectionHeading}>Flag or comment.</h2>
        <p style={styles.description}>
          Use this area to identify missing information, concerns,
          or follow-up needed from the client.
        </p>

        <label htmlFor="flagReason">Flag reason</label>
        <input
          id="flagReason"
          type="text"
          placeholder="Example: Supporting documentation is missing."
          value={flagReason}
          onChange={(e) => setFlagReason(e.target.value)}
          style={styles.input}
        />

        <label htmlFor="staffComment">Staff comment</label>
        <textarea
          id="staffComment"
          placeholder="Enter any additional review notes..."
          value={staffComment}
          onChange={(e) => setStaffComment(e.target.value)}
          rows={4}
          style={{ ...styles.input, resize: "vertical" }}
        />
      </section>
    </main>
  );
}
