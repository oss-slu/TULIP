import React, { useState } from "react";
import Header from "../components/header/header";
import "../App.css";
import "./submission-queue.css";

const createIntake = (
  id,
  client,
  date,
  status,
  assignedTo,
  updated,
  caseType
) => ({
  id,
  client,
  date,
  status,
  assignedTo,
  updated,
  caseType,
});

const initialIntakes = [
  createIntake(
    "TUL-1042",
    "Sarah Miller",
    "Nov 12, 2026",
    "New",
    "Unassigned",
    "Nov 12, 2026",
    "Housing"
  ),
  createIntake(
    "TUL-1041",
    "James Carter",
    "Nov 11, 2026",
    "Under Review",
    "Alex P.",
    "Nov 12, 2026",
    "Family Law"
  ),
  createIntake(
    "TUL-1040",
    "Maria Lopez",
    "Nov 10, 2026",
    "Assigned",
    "Taylor M.",
    "Nov 11, 2026",
    "Housing"
  ),
];

const statuses = ["New", "Under Review", "Assigned", "Awaiting Information"];

function SubmissionQueue() {
  const [intakes, setIntakes] = useState(initialIntakes);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [staffFilter, setStaffFilter] = useState("All Staff");

  const updateStatus = (id, newStatus) => {
    setIntakes((currentIntakes) =>
      currentIntakes.map((intake) =>
        intake.id === id
          ? { ...intake, status: newStatus, updated: "Just now" }
          : intake
      )
    );
  };

  const filteredIntakes = intakes.filter((intake) => {
    const matchesSearch =
      intake.id.toLowerCase().includes(search.toLowerCase()) ||
      intake.client.toLowerCase().includes(search.toLowerCase()) ||
      intake.caseType.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All Statuses" || intake.status === statusFilter;

    const matchesStaff =
      staffFilter === "All Staff" || intake.assignedTo === staffFilter;

    return matchesSearch && matchesStatus && matchesStaff;
  });

  const countStatus = (status) =>
    intakes.filter((intake) => intake.status === status).length;

  return (
    <div className="queue-page">
      <Header />

      <main className="queue-container">
        <section className="queue-heading">
          <div>
            <p className="queue-eyebrow">SLU LEGAL CLINICS PROGRAM</p>
            <h1>Clinic Submission Queue</h1>
            <p className="queue-subtitle">
              Track and manage submitted clinic intakes.
            </p>
          </div>

          <a href="/intake" className="queue-new-button">
            + New Intake
          </a>
        </section>

        <section className="queue-summary">
          <div className="summary-card new-card">
            <div className="summary-icon">01</div>
            <div>
              <p>New</p>
              <h2>{countStatus("New")}</h2>
              <span>Awaiting initial review</span>
            </div>
          </div>

          <div className="summary-card review-card">
            <div className="summary-icon">02</div>
            <div>
              <p>Under Review</p>
              <h2>{countStatus("Under Review")}</h2>
              <span>Currently being reviewed</span>
            </div>
          </div>

          <div className="summary-card assigned-card">
            <div className="summary-icon">03</div>
            <div>
              <p>Assigned</p>
              <h2>{countStatus("Assigned")}</h2>
              <span>Assigned to clinic staff</span>
            </div>
          </div>

          <div className="summary-card waiting-card">
            <div className="summary-icon">04</div>
            <div>
              <p>Awaiting Information</p>
              <h2>{countStatus("Awaiting Information")}</h2>
              <span>Waiting for client response</span>
            </div>
          </div>
        </section>

        <section className="queue-controls">
          <div className="queue-search">
            <span>⌕</span>
            <input
              type="text"
              placeholder="Search by client name, intake ID, or case type..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter by status"
          >
            <option>All Statuses</option>
            {statuses.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>

          <select
            value={staffFilter}
            onChange={(e) => setStaffFilter(e.target.value)}
            aria-label="Filter by assigned staff"
          >
            <option>All Staff</option>
            <option>Unassigned</option>
            <option>Alex P.</option>
            <option>Taylor M.</option>
            <option>Jordan K.</option>
          </select>
        </section>

        <section className="queue-table-section">
          <div className="queue-table-wrapper">
            <table className="queue-table">
              <thead>
                <tr>
                  <th>INTAKE ID</th>
                  <th>CLIENT NAME</th>
                  <th>DATE SUBMITTED</th>
                  <th>STATUS</th>
                  <th>ASSIGNED TO</th>
                  <th>LAST UPDATED</th>
                  <th>CASE TYPE</th>
                </tr>
              </thead>

              <tbody>
                {filteredIntakes.length > 0 ? (
                  filteredIntakes.map((intake) => (
                    <tr key={intake.id}>
                      <td className="intake-id">{intake.id}</td>
                      <td>{intake.client}</td>
                      <td>{intake.date}</td>
                      <td>
                        <select
                          className={`status-select status-${intake.status
                            .toLowerCase()
                            .replaceAll(" ", "-")}`}
                          value={intake.status}
                          onChange={(e) =>
                            updateStatus(intake.id, e.target.value)
                          }
                          aria-label={`Update status for ${intake.id}`}
                        >
                          {statuses.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>{intake.assignedTo}</td>
                      <td>{intake.updated}</td>
                      <td>{intake.caseType}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="empty-queue">
                      No intakes match your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="queue-footer">
            <p>
              Showing {filteredIntakes.length} of {intakes.length} intakes
            </p>
            <span>Updated as intake statuses change</span>
          </div>
        </section>

        <p className="queue-note">
          TULIP — Trusted Unified Legal Intake Portal
        </p>
      </main>
    </div>
  );
}

export default SubmissionQueue;
