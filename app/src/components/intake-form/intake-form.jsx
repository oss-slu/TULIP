import React, { useState } from 'react'

// TULIP Specific Intake Form Fields:

const IntakeForm = ({ onSubmit }) => {

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    address: '',
    phone: '',
    birthDate: '',
    ssn: '',
    caseType: '',
    reasonForIntake: '',
    legalIssue: '',
    legalHistory: '',
    consent: false,
    signature: '',
  }) //Initial state for the form fields

  const [errors, setErrors] = useState({})
  const [showSSN, setShowSSN] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const validate = () => { //Validation function to check required fields 
    const errs = {}

    if (!form.fullName.trim()) errs.fullName = 'Required'
    if (!form.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) errs.email = 'Invalid email'
    if (!form.address.trim()) errs.address = 'Required'
    if (!form.phone.trim()) errs.phone = 'Required'
    if (!form.birthDate.trim()) errs.birthDate = 'Required'
    if (!form.ssn.trim()) errs.ssn = 'Required'
    if (!form.caseType.trim()) errs.caseType = 'Required'
    if (!form.reasonForIntake.trim()) errs.reasonForIntake = 'Required'
    if (!form.consent) errs.consent = 'Consent required'
    if (!form.signature.trim()) errs.signature = 'Required'

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    if (onSubmit) onSubmit(form)
  }

  return (

    <form onSubmit={handleSubmit} style={{width:"80%", margin:"0 auto", fontFamily:"Arial,Helvetica,sans-serif"}}>

      <h2>TULIP Intake Form</h2>

      <p>Fields marked * are required.</p>

      <label style={{display:"flex", flexDirection:"column", marginTop:10, width:"100%"}}>
        Full name *
        <input name="fullName" value={form.fullName} onChange={handleChange} />
        <div style={{color:"red"}}>{errors.fullName}</div>
      </label>

      <label style={{display:"flex", flexDirection:"column", marginTop:10, width:"100%"}}>
        Email *
        <input type="email" name="email" value={form.email} onChange={handleChange} />
        <div style={{color:"red"}}>{errors.email}</div>
      </label>

      <label style={{display:"flex", flexDirection:"column", marginTop:10, width:"100%"}}>
        Mailing address *
        <input name="address" value={form.address} onChange={handleChange} />
        <div style={{color:"red"}}>{errors.address}</div>
      </label>

      <label style={{display:"flex", flexDirection:"column", marginTop:10, width:"100%"}}>
        Phone number *
        <input type="tel" name="phone" value={form.phone} onChange={handleChange} />
        <div style={{color:"red"}}>{errors.phone}</div>
      </label>

      <label style={{display:"flex", flexDirection:"column", marginTop:10, width:"100%"}}>
        Date of birth *
        <input type="date" name="birthDate" value={form.birthDate} onChange={handleChange} />
        <div style={{color:"red"}}>{errors.birthDate}</div>
      </label>

      <label style={{display:"flex", flexDirection:"column", marginTop:10, width:"100%"}}>
        Social Security number *

        <div>
          <input
            type={showSSN ? "text" : "password"}
            name="ssn"
            value={form.ssn}
            onChange={handleChange}
          />

          <button
            type="button"
            onClick={() => setShowSSN((s) => !s)}
            aria-label={showSSN ? "Hide SSN" : "Show SSN"}
            style={{marginLeft:8}}
          >
            {showSSN ? "Hide" : "Show"}
          </button>
        </div>

        <div style={{color:"red"}}>{errors.ssn}</div>
      </label>

      <label style={{display:"flex", flexDirection:"column", marginTop:10, width:"100%"}}>
        Case type selection *

        <select name="caseType" value={form.caseType} onChange={handleChange}> //all updated with TULIP specific fields
          <option value="">-- select --</option>
          <option value="CPC">CPC</option>
          <option value="MLP">MLP</option>
          <option value="Human Rights">Human Rights</option>
          <option value="ECD">ECD</option>
          <option value="Civil">Civil</option>
          <option value="Criminal">Criminal</option>
        </select>

        <div style={{color:"red"}}>{errors.caseType}</div>
      </label>

      <label style={{display:"flex", flexDirection:"column", marginTop:10, width:"100%"}}>
        Reason for intake *

        <textarea
          name="reasonForIntake" //new field added for TULIP specific intake form
          value={form.reasonForIntake}
          onChange={handleChange}
          rows={4}
        />

        <div style={{color:"red"}}>{errors.reasonForIntake}</div>
      </label>

      <label style={{display:"flex", flexDirection:"column", marginTop:10, width:"100%"}}>
        Legal issue description

        <textarea
          name="legalIssue" //new field added for TULIP specific intake form
          value={form.legalIssue}
          onChange={handleChange}
          rows={5}
        />
      </label>

      <label style={{display:"flex", flexDirection:"column", marginTop:10, width:"100%"}}>
        Basic legal history

        <textarea
          name="legalHistory" //new field added for TULIP specific intake form
          value={form.legalHistory}
          onChange={handleChange}
          rows={5}
          placeholder="Prior attorneys, prior case types, etc."
        />
      </label>

      <label style={{display:"flex", alignItems:"center", marginTop:10, width:"100%"}}>
        <input
          type="checkbox"
          name="consent"
          checked={form.consent}
          onChange={handleChange}
        />
        
        <span style={{marginLeft:8}}> 
          I acknowledge the clinic's consent and confidentiality terms * 
        </span> 
        
        <div style={{color:"red", marginLeft:8}}>{errors.consent}</div>
      </label>

      <label style={{display:"flex", flexDirection:"column", marginTop:10, width:"100%"}}>
        Digital signature *

        <input 
          type="text"
          name="signature"
          value={form.signature}
          onChange={handleChange}
          placeholder="Sign here"
        />

        <div style={{color:"red"}}>{errors.signature}</div>
      </label>

      <div style={{marginTop:12}}>
        <button type="submit">Submit</button>
      </div>

    </form>
  )
}

export default IntakeForm