import React, { useState } from "react";
import tulipLogo from "../assets/TULIPlogo.svg";


export default function AccountPage() {
  const [signupMessage, setSignupMessage] = useState("");


  function handleSignup(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);


    if (formData.get("password") !== formData.get("confirmPassword")) {
      setSignupMessage("The passwords do not match.");
      return;
    }


    setSignupMessage(
      "This is a prototype. Your information has not been saved."
    );
  }


  // Temporary sample data until backend functionality
  // is implemented.
  const user = {
    fullName: "Jane Doe",
    email: "jane.doe@example.com",
    initials: "JD",
  };


  const pastSubmissions = [
    {
      id: 1,
      caseType: "Civil Litigation",
      date: "October 20, 2026",
      status: "Submitted",
    },
    {
      id: 2,
      caseType: "Criminal Defense",
      date: "October 10, 2026",
      status: "Submitted",
    },
  ];


  return (
    <div
      style={{
        maxWidth: 760,
        margin: "0 auto",
        padding: "70px 24px",
        fontFamily: "Arial, sans-serif",
        color: "black",
        background: "white",
        minHeight: "100vh",
        boxSizing: "border-box",
      }}
    >
      {/* Page heading */}
      <p
        style={{
          fontSize: 13,
          letterSpacing: 2,
          marginBottom: 18,
        }}
      >
        SAINT LOUIS UNIVERSITY LEGAL CLINICS PROGRAM
      </p>


      <h1
        style={{
          fontFamily: "Georgia, serif",
          fontSize: 52,
          lineHeight: 1.05,
          margin: "0 0 20px",
          fontWeight: "normal",
        }}
      >
        Your account.
      </h1>


      <p
        style={{
          fontSize: 16,
          lineHeight: 1.6,
          color: "#444",
          marginBottom: 36,
        }}
      >
        View your profile information and past legal intake
        submissions.
      </p>


      {/* Profile information */}
      <section
        style={{
          padding: "28px 0",
          borderTop: "1px solid #ddd",
          borderBottom: "1px solid #ddd",
        }}
      >
        <h2
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 28,
            fontWeight: "normal",
            margin: "0 0 24px",
          }}
        >
          Profile Information
        </h2>


        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
          }}
        >
          {/* Profile picture placeholder */}
          <div
            role="img"
            aria-label={`Profile placeholder for ${user.fullName}`}
            style={{
              width: 88,
              height: 88,
              minWidth: 88,
              borderRadius: "50%",
              background: "#eee",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: "bold",
            }}
          >
            {user.initials}
          </div>


          <div>
            <h3
              style={{
                fontSize: 20,
                margin: "0 0 10px",
              }}
            >
              {user.fullName}
            </h3>


            <p
              style={{
                fontSize: 16,
                color: "#555",
                margin: 0,
                overflowWrap: "anywhere",
              }}
            >
              {user.email}
            </p>
          </div>
        </div>
      </section>


      {/* Past submissions */}
      <section style={{ marginTop: 40 }}>
        <h2
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 32,
            fontWeight: "normal",
            margin: "0 0 12px",
          }}
        >
          Past submissions.
        </h2>


        <p
          style={{
            color: "#444",
            fontSize: 15,
            lineHeight: 1.6,
            marginBottom: 24,
          }}
        >
          Review the legal intake forms you have previously
          submitted.
        </p>


        {pastSubmissions.length === 0 ? (
          <div
            style={{
              padding: "28px 0",
              borderTop: "1px solid #ddd",
              borderBottom: "1px solid #ddd",
            }}
          >
            <p style={{ margin: 0, lineHeight: 1.6 }}>
              You have no past submissions yet.
            </p>
          </div>
        ) : (
          <div>
            {pastSubmissions.map((submission) => (
              <article
                key={submission.id}
                style={{
                  padding: "22px 0",
                  borderTop: "1px solid #ddd",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 16,
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontSize: 18,
                        margin: "0 0 8px",
                      }}
                    >
                      {submission.caseType}
                    </h3>


                    <p
                      style={{
                        fontSize: 14,
                        color: "#555",
                        margin: 0,
                      }}
                    >
                      Submitted {submission.date}
                    </p>
                  </div>


                  <span
                    style={{
                      fontSize: 13,
                      padding: "6px 12px",
                      border: "1px solid #ccc",
                      borderRadius: 20,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {submission.status}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* To be conditionally rendered when auth pipeline implemented */}
      <section
        aria-labelledby="create-account-title"
        style={{
          marginTop: 48,
          padding: "28px 0",
          borderTop: "1px solid #ddd",
        }}
      >
        <img
          src={tulipLogo}
          alt="TULIP logo"
          style={{
            display: "block",
            width: 52,
            height: 60,
            objectFit: "contain",
            marginBottom: 18,
          }}
        />
        <h2
          id="create-account-title"
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 32,
            fontWeight: "normal",
            margin: "0 0 12px",
          }}
        >
          Create an account.
        </h2>
        <p style={{ color: "#444", fontSize: 15, lineHeight: 1.6 }}>
          Set up an account to keep your legal intake information together.
        </p>


        <form
          onSubmit={handleSignup}
          style={{ display: "grid", gap: 16, maxWidth: 480, marginTop: 24 }}
        >
          <label style={{ display: "grid", gap: 8 }}>
            First name
            <input autoComplete="given-name" name="firstName" required />
          </label>
          <label style={{ display: "grid", gap: 8 }}>
            Last name
            <input autoComplete="family-name" name="lastName" required />
          </label>
          <label style={{ display: "grid", gap: 8 }}>
            Email address
            <input
              autoComplete="email"
              name="email"
              type="email"
              required
            />
          </label>
          <label style={{ display: "grid", gap: 8 }}>
            Password
            <input
              autoComplete="new-password"
              name="password"
              type="password"
              minLength={8}
              required
            />
            <span style={{ color: "#555", fontSize: 13 }}>
              Use at least 8 characters.
            </span>
          </label>
          <label style={{ display: "grid", gap: 8 }}>
            Confirm password
            <input
              autoComplete="new-password"
              name="confirmPassword"
              type="password"
              minLength={8}
              required
            />
          </label>
          <button type="submit">Create account</button>
        </form>


        {signupMessage && (
          <p role="status" style={{ marginTop: 16 }}>
            {signupMessage}
          </p>
        )}
      </section>
    </div>
  );
}
