
import React, { useState } from 'react'

// TULIP Specific Intake Form Fields:

const IntakeForm = ({ onSubmit }) => {

  const [form, setForm] = useState({
    // Basic identifying and contact information
    fullName: '',
    businessName: '',
    primaryContactName: '',
    preferredName: '',
    formerNames: '',
    birthDate: '',
    ssn: '',
    pronouns: '',
    mailingAddress: '',
    physicalAddress: '',
    phone: '',
    email: '',
    preferredContactMethod: '',
    safeContactTime: '',
    language: '',
    interpreterNeeded: '',
    interpreterLanguage: '',
    safeVoicemail: '',
    safeMessages: '',
    monthlyIncome: '',
    incomeSource: '',
    employerName: '',
    employerAddress: '',
    employerPhone: '',
    currentAttorney: '',
    referralSource: '',
    referralOther: '',

    // Household / Family Information
    householdInfo: '',
    maritalStatus: '',
    spouseName: '',
    spouseAddress: '',
    spouseBirthDate: '',
    childrenNames: '',
    childrenBirthDates: '',
    householdMembers: '',
    householdRelationships: '',
    othersInvolved: '',
    opposingParties: '',
    opposingPartyAttorney: '',

    // Legal matter
    caseType: '',
    reasonForIntake: '',
    institutionsInvolved: '',
    agencyName: '',
    agencyPersonDepartment: '',
    agencyRelationship: '',
    agencyOtherIndividuals: '',

    // Consent
    consent: false,
    signature: '',
  })

  const [errors, setErrors] = useState({})
  const [showSSN, setShowSSN] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((f) => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const validate = () => { // validation for required fields and email format
    const errs = {}

    const requiredFields = [ //changed this to validate all as a group rather than idiv
      'fullName',
      'mailingAddress',
      'physicalAddress',
      'phone',
      'email',
      'preferredContactMethod',
      'safeContactTime',
      'language',
      'interpreterNeeded',
      'safeVoicemail',
      'safeMessages',
      'monthlyIncome',
      'incomeSource',
      'employerName',
      'employerAddress',
      'employerPhone',
      'currentAttorney',
      'referralSource',
      'householdInfo',
      'caseType',
      'reasonForIntake',
      'institutionsInvolved',
      'signature'
    ]

    requiredFields.forEach((field) => {
      if (!form[field].trim()) errs[field] = 'Required'
    })

    if (
      form.email &&
      !form.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)
    ) {
      errs.email = 'Invalid email'
    }

    if (form.caseType === 'ecp') {
      if (!form.businessName.trim()) errs.businessName = 'Required'
      if (!form.primaryContactName.trim()) errs.primaryContactName = 'Required'
    }

    if (
      form.interpreterNeeded === 'yes' &&
      !form.interpreterLanguage.trim()
    ) {
      errs.interpreterLanguage = 'Required'
    }

    if (
      form.referralSource === 'other' &&
      !form.referralOther.trim()
    ) {
      errs.referralOther = 'Required' //required fields if they answer yes to first questions
    }

    if (form.householdInfo === 'yes') { //for now just having it be a yes/no dropdown
      const householdFields = [
        'maritalStatus',
        'spouseName',
        'spouseAddress',
        'spouseBirthDate',
        'childrenNames',
        'childrenBirthDates',
        'householdMembers',
        'householdRelationships',
        'othersInvolved',
        'opposingParties',
        'opposingPartyAttorney'
      ]

      householdFields.forEach((field) => {
        if (!form[field].trim()) errs[field] = 'Required'
      })
    }

    if (form.institutionsInvolved === 'yes') { //yes no dropdown for institutions involved, if yes then required fields for agency name, person/department, relationship, and other individuals
      const institutionFields = [
        'agencyName',
        'agencyPersonDepartment',
        'agencyRelationship',
        'agencyOtherIndividuals'
      ]

      institutionFields.forEach((field) => {
        if (!form[field].trim()) errs[field] = 'Required'
      })
    }

    if (!form.consent) errs.consent = 'Consent required'

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e) => { // submit form if validation passes
    e.preventDefault()

    if (!validate()) return

    if (onSubmit) onSubmit(form)

    setSubmitted(true)
  }

  const labelStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    marginTop: 22
  }

  const inputStyle = {
    padding: '12px',
    border: '1px solid black',
    fontSize: 16,
    background: 'white',
    color: 'black',
    boxSizing: 'border-box',
    width: '100%'
  }

  const errorStyle = {
    color: 'red',
    fontSize: 14
  }

  if (submitted) {
    return (
      <div style={{
        maxWidth: 760,
        margin: '0 auto',
        padding: '70px 24px',
        fontFamily: 'Arial, sans-serif',
        color: 'black',
        background: 'white'
      }}>
        <p style={{ fontSize: 13, letterSpacing: 2, marginBottom: 18 }}>
          SAINT LOUIS UNIVERSITY LEGAL CLINICS PROGRAM
        </p>

        <h1 style={{
          fontFamily: 'Georgia, serif',
          fontSize: 52,
          lineHeight: 1.05,
          margin: '0 0 20px'
        }}>
          Thank you.
        </h1>

        <p style={{ fontSize: 18, lineHeight: 1.6 }}>
          Your intake form has been submitted successfully.
        </p>

        <p style={{ fontSize: 18, lineHeight: 1.6 }}>
          We will review your information and help determine the right next step.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: 760,
        margin: '0 auto',
        padding: '70px 24px',
        fontFamily: 'Arial, sans-serif',
        color: 'black',
        background: 'white'
      }}
    >

      <p style={{ fontSize: 13, letterSpacing: 2, marginBottom: 18 }}>
        SAINT LOUIS UNIVERSITY LEGAL CLINICS PROGRAM
      </p>

      <h1 style={{
        fontFamily: 'Georgia, serif',
        fontSize: 52,
        lineHeight: 1.05,
        margin: '0 0 20px'
      }}>
        Tell us how we can help.
      </h1>

      <p style={{
        fontSize: 18,
        lineHeight: 1.6,
        maxWidth: 650,
        marginBottom: 8
      }}>
        This intake form is the first step in connecting you with legal assistance.
      </p>

      <p style={{ fontSize: 14, marginBottom: 35 }}>
        Fields marked * are required.
      </p>

      {/* BASIC IDENTIFYING AND CONTACT INFORMATION */}

      <h2 style={{ fontFamily: 'Georgia, serif', marginTop: 40 }}>
        Basic Information
      </h2>

      <label style={labelStyle}>
        Full Legal Name *
        <input
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <div style={errorStyle}>{errors.fullName}</div>
      </label>

      <label style={labelStyle}>
        Preferred Name/Nickname
        <input
          name="preferredName"
          value={form.preferredName}
          onChange={handleChange}
          style={inputStyle}
        />
      </label>

      <label style={labelStyle}>
        Maiden Name, Former Married Names
        <input
          name="formerNames"
          value={form.formerNames}
          onChange={handleChange}
          style={inputStyle}
        />
      </label>

      <label style={labelStyle}>
        Date of Birth *
        <input
          type="date"
          name="birthDate"
          value={form.birthDate}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <div style={errorStyle}>{errors.birthDate}</div>
      </label>

      <label style={labelStyle}>
        Social Security Number
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            type={showSSN ? 'text' : 'password'}
            name="ssn"
            value={form.ssn}
            onChange={handleChange}
            style={inputStyle}
          />

          <button
            type="button"
            onClick={() => setShowSSN((s) => !s)}
            style={{
              padding: '0 16px',
              background: 'white',
              border: '1px solid black'
            }}
          >
            {showSSN ? 'Hide' : 'Show'}
          </button>
        </div>
      </label>

      <label style={labelStyle}>
        Pronouns
        <input
          name="pronouns"
          value={form.pronouns}
          onChange={handleChange}
          style={inputStyle}
        />
      </label>

      {/* CLINIC DROPDOWN */}

      <label style={labelStyle}>
        What type of legal help do you need? *
        <select
          name="caseType"
          value={form.caseType}
          onChange={handleChange}
          style={inputStyle}
          required
        >
          <option value="">-- select --</option>
          <option value="cpc">Children's Permanency</option>
          <option value="civil">Civil Litigation</option>
          <option value="criminal">Criminal Defense</option>
          <option value="ecp">
            Entrepreneurship and Community Development
          </option>
          <option value="hrl">Human Rights at Home Litigation</option>
          <option value="mlp">Medical-Legal Partnership</option>
        </select>
        <div style={errorStyle}>{errors.caseType}</div>
      </label>

      {/* ECD CLIENTS */}

      {form.caseType === 'ecp' && (
        <>
          <label style={labelStyle}>
            Business Name *
            <input
              name="businessName"
              value={form.businessName}
              onChange={handleChange}
              style={inputStyle}
              required
            />
            <div style={errorStyle}>{errors.businessName}</div>
          </label>

          <label style={labelStyle}>
            Primary Contact Name *
            <input
              name="primaryContactName"
              value={form.primaryContactName}
              onChange={handleChange}
              style={inputStyle}
              required
            />
            <div style={errorStyle}>{errors.primaryContactName}</div>
          </label>
        </>
      )}

      <label style={labelStyle}>
        Mailing Address *
        <input
          name="mailingAddress"
          value={form.mailingAddress}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <div style={errorStyle}>{errors.mailingAddress}</div>
      </label>

      <label style={labelStyle}>
        Physical Address, if different *
        <input
          name="physicalAddress"
          value={form.physicalAddress}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <div style={errorStyle}>{errors.physicalAddress}</div>
      </label>

      <label style={labelStyle}>
        Phone Number *
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <div style={errorStyle}>{errors.phone}</div>
      </label>

      <label style={labelStyle}>
        Email Address *
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <div style={errorStyle}>{errors.email}</div>
      </label>

      <label style={labelStyle}>
        Preferred Method of Contact *
        <select
          name="preferredContactMethod"
          value={form.preferredContactMethod}
          onChange={handleChange}
          style={inputStyle}
          required
        >
          <option value="">-- select --</option>
          <option value="phone">Phone</option>
          <option value="email">Email</option>
          <option value="text">Text message</option>
          <option value="mail">Mail</option>
        </select>
        <div style={errorStyle}>{errors.preferredContactMethod}</div>
      </label>

      <label style={labelStyle}>
        Safe/Preferred Time to Contact *
        <input
          name="safeContactTime"
          value={form.safeContactTime}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <div style={errorStyle}>{errors.safeContactTime}</div>
      </label>

      <label style={labelStyle}>
        Best Language for Communication *
        <input
          name="language"
          value={form.language}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <div style={errorStyle}>{errors.language}</div>
      </label>

      <label style={labelStyle}>
        Interpreter Needed? *
        <select
          name="interpreterNeeded"
          value={form.interpreterNeeded}
          onChange={handleChange}
          style={inputStyle}
          required
        >
          <option value="">-- select --</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        <div style={errorStyle}>{errors.interpreterNeeded}</div>
      </label>

      {form.interpreterNeeded === 'yes' && (
        <label style={labelStyle}>
          If yes, what language? *
          <input
            name="interpreterLanguage"
            value={form.interpreterLanguage}
            onChange={handleChange}
            style={inputStyle}
            required
          />
          <div style={errorStyle}>{errors.interpreterLanguage}</div>
        </label>
      )}

      <label style={labelStyle}>
        Is it safe to leave a voicemail? *
        <select
          name="safeVoicemail"
          value={form.safeVoicemail}
          onChange={handleChange}
          style={inputStyle}
          required
        >
          <option value="">-- select --</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        <div style={errorStyle}>{errors.safeVoicemail}</div>
      </label>

      <label style={labelStyle}>
        Is it safe to send email/text messages? *
        <select
          name="safeMessages"
          value={form.safeMessages}
          onChange={handleChange}
          style={inputStyle}
          required
        >
          <option value="">-- select --</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        <div style={errorStyle}>{errors.safeMessages}</div>
      </label>

      <label style={labelStyle}>
        Monthly Income and Source *
        <input
          name="monthlyIncome"
          value={form.monthlyIncome}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <div style={errorStyle}>{errors.monthlyIncome}</div>
      </label>

      <label style={labelStyle}>
        Income Source *
        <input
          name="incomeSource"
          value={form.incomeSource}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <div style={errorStyle}>{errors.incomeSource}</div>
      </label>

      <label style={labelStyle}>
        Employer Name *
        <input
          name="employerName"
          value={form.employerName}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <div style={errorStyle}>{errors.employerName}</div>
      </label>

      <label style={labelStyle}>
        Employer Address *
        <input
          name="employerAddress"
          value={form.employerAddress}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <div style={errorStyle}>{errors.employerAddress}</div>
      </label>

      <label style={labelStyle}>
        Employer Phone *
        <input
          type="tel"
          name="employerPhone"
          value={form.employerPhone}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <div style={errorStyle}>{errors.employerPhone}</div>
      </label>

      <label style={labelStyle}>
        Are you currently working with an attorney? If so, provide name/firm. *
        <textarea
          name="currentAttorney"
          value={form.currentAttorney}
          onChange={handleChange}
          rows={3}
          style={inputStyle}
          required
        />
        <div style={errorStyle}>{errors.currentAttorney}</div>
      </label>

      <label style={labelStyle}>
        How were you referred to the clinic? *
        <select
          name="referralSource"
          value={form.referralSource}
          onChange={handleChange}
          style={inputStyle}
          required
        >
          <option value="">-- select --</option>
          <option value="walk-in">Walk-in</option>
          <option value="phone">Phone</option>
          <option value="email">Email</option>
          <option value="website">Website</option>
          <option value="organization">Referral from another organization</option>
          <option value="attorney">Referral from attorney</option>
          <option value="court">Referral from court</option>
          <option value="former-client">Existing/Former Clinic Client</option>
          <option value="other">Other</option>
        </select>
        <div style={errorStyle}>{errors.referralSource}</div>
      </label>

      {form.referralSource === 'other' && (
        <label style={labelStyle}>
          Other Referral Source *
          <input
            name="referralOther"
            value={form.referralOther}
            onChange={handleChange}
            style={inputStyle}
            required
          />
          <div style={errorStyle}>{errors.referralOther}</div>
        </label>
      )}

      {/* HOUSEHOLD / FAMILY INFORMATION */}

      <h2 style={{ fontFamily: 'Georgia, serif', marginTop: 50 }}>
        Household / Family Information
      </h2>

      <label style={labelStyle}>
        Is household/family information relevant to your legal matter? *
        <select
          name="householdInfo"
          value={form.householdInfo}
          onChange={handleChange}
          style={inputStyle}
          required
        >
          <option value="">-- select --</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        <div style={errorStyle}>{errors.householdInfo}</div>
      </label>

      {form.householdInfo === 'yes' && (
        <>
          <label style={labelStyle}>
            Marital/relationship status *
            <input
              name="maritalStatus"
              value={form.maritalStatus}
              onChange={handleChange}
              style={inputStyle}
              required
            />
            <div style={errorStyle}>{errors.maritalStatus}</div>
          </label>

          <label style={labelStyle}>
            Spouse/Partner's Name *
            <input
              name="spouseName"
              value={form.spouseName}
              onChange={handleChange}
              style={inputStyle}
              required
            />
            <div style={errorStyle}>{errors.spouseName}</div>
          </label>

          <label style={labelStyle}>
            Spouse/Partner's Address *
            <input
              name="spouseAddress"
              value={form.spouseAddress}
              onChange={handleChange}
              style={inputStyle}
              required
            />
            <div style={errorStyle}>{errors.spouseAddress}</div>
          </label>

          <label style={labelStyle}>
            Spouse/Partner's Date of Birth *
            <input
              type="date"
              name="spouseBirthDate"
              value={form.spouseBirthDate}
              onChange={handleChange}
              style={inputStyle}
              required
            />
            <div style={errorStyle}>{errors.spouseBirthDate}</div>
          </label>

          <label style={labelStyle}>
            Names of Children *
            <textarea
              name="childrenNames"
              value={form.childrenNames}
              onChange={handleChange}
              rows={3}
              style={inputStyle}
              required
            />
            <div style={errorStyle}>{errors.childrenNames}</div>
          </label>

          <label style={labelStyle}>
            Children's Dates of Birth *
            <textarea
              name="childrenBirthDates"
              value={form.childrenBirthDates}
              onChange={handleChange}
              rows={3}
              style={inputStyle}
              required
            />
            <div style={errorStyle}>{errors.childrenBirthDates}</div>
          </label>

          <label style={labelStyle}>
            Who lives in the household? *
            <textarea
              name="householdMembers"
              value={form.householdMembers}
              onChange={handleChange}
              rows={4}
              style={inputStyle}
              required
            />
            <div style={errorStyle}>{errors.householdMembers}</div>
          </label>

          <label style={labelStyle}>
            Relationship of each household member to client *
            <textarea
              name="householdRelationships"
              value={form.householdRelationships}
              onChange={handleChange}
              rows={4}
              style={inputStyle}
              required
            />
            <div style={errorStyle}>{errors.householdRelationships}</div>
          </label>

          <label style={labelStyle}>
            Is anyone else involved in the legal matter? *
            <textarea
              name="othersInvolved"
              value={form.othersInvolved}
              onChange={handleChange}
              rows={4}
              style={inputStyle}
              required
            />
            <div style={errorStyle}>{errors.othersInvolved}</div>
          </label>

          <label style={labelStyle}>
            Opposing Parties (Name, Address, Phone) *
            <textarea
              name="opposingParties"
              value={form.opposingParties}
              onChange={handleChange}
              rows={5}
              style={inputStyle}
              required
            />
            <div style={errorStyle}>{errors.opposingParties}</div>
          </label>

          <label style={labelStyle}>
            Does any party involved have an attorney? If so, provide name/law firm, if known. *
            <textarea
              name="opposingPartyAttorney"
              value={form.opposingPartyAttorney}
              onChange={handleChange}
              rows={4}
              style={inputStyle}
              required
            />
            <div style={errorStyle}>{errors.opposingPartyAttorney}</div>
          </label>
        </>
      )}

      {/* BASIC INFORMATION ABOUT THE LEGAL MATTER */}

      <h2 style={{ fontFamily: 'Georgia, serif', marginTop: 50 }}>
        Basic Information About the Legal Matter
      </h2>

      <label style={labelStyle}>
        What brings you to the Law Clinic? Please briefly explain, in your own words, why you are seeking legal assistance. *
        <textarea
          name="reasonForIntake"
          value={form.reasonForIntake}
          onChange={handleChange}
          rows={6}
          style={inputStyle}
          required
        />
        <div style={errorStyle}>{errors.reasonForIntake}</div>
      </label>

      <label style={labelStyle}>
        Are any government agencies, courts, schools, hospitals, employers, or other institutions involved in this matter? *
        <select
          name="institutionsInvolved"
          value={form.institutionsInvolved}
          onChange={handleChange}
          style={inputStyle}
          required
        >
          <option value="">-- select --</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        <div style={errorStyle}>{errors.institutionsInvolved}</div>
      </label>

      {form.institutionsInvolved === 'yes' && (
        <>
          <label style={labelStyle}>
            Name of Agency/Institution *
            <input
              name="agencyName"
              value={form.agencyName}
              onChange={handleChange}
              style={inputStyle}
              required
            />
            <div style={errorStyle}>{errors.agencyName}</div>
          </label>

          <label style={labelStyle}>
            Person/Department Involved *
            <input
              name="agencyPersonDepartment"
              value={form.agencyPersonDepartment}
              onChange={handleChange}
              style={inputStyle}
              required
            />
            <div style={errorStyle}>{errors.agencyPersonDepartment}</div>
          </label>

          <label style={labelStyle}>
            Your Relationship to the Organization *
            <input
              name="agencyRelationship"
              value={form.agencyRelationship}
              onChange={handleChange}
              style={inputStyle}
              required
            />
            <div style={errorStyle}>{errors.agencyRelationship}</div>
          </label>

          <label style={labelStyle}>
            Other Individuals Involved *
            <textarea
              name="agencyOtherIndividuals"
              value={form.agencyOtherIndividuals}
              onChange={handleChange}
              rows={4}
              style={inputStyle}
              required
            />
            <div style={errorStyle}>{errors.agencyOtherIndividuals}</div>
          </label>
        </>
      )}

      {/* CONSENT AND SIGNATURE */}

      <label style={{
        display: 'flex',
        gap: 10,
        alignItems: 'flex-start',
        marginTop: 28
      }}>
        <input
          type="checkbox"
          name="consent"
          checked={form.consent}
          onChange={handleChange}
          required
        />
        <span>
          I acknowledge the clinic's consent and confidentiality terms *
        </span>
      </label>

      <div style={errorStyle}>{errors.consent}</div>

      <label style={labelStyle}>
        Your signature *
        <input
          name="signature"
          value={form.signature}
          onChange={handleChange}
          placeholder="Sign here"
          style={inputStyle}
          required
        />
        <div style={errorStyle}>{errors.signature}</div>
      </label>

      <button
        type="submit"
        style={{
          marginTop: 30,
          padding: '14px 28px',
          background: 'black',
          color: 'white',
          border: '1px solid black',
          fontSize: 16
        }}
      >
        Submit intake →
      </button>

    </form>
  )
}

export default IntakeForm