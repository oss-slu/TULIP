import React, { useState } from 'react'

// TULIP Specific Intake Form Fields:

const IntakeForm = ({ onSubmit }) => {

  const [form, setForm] = useState({ //wireframe requirements 
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
  })

  const [errors, setErrors] = useState({})
  const [showSSN, setShowSSN] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const validate = () => { //validation for required fields and email format
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

  const handleSubmit = (e) => { //all of the following are in black and white until color is decided
    e.preventDefault()
    if (!validate()) return
    if (onSubmit) onSubmit(form)
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

  return (
    <form onSubmit={handleSubmit} style={{maxWidth:760, margin:'0 auto', padding:'70px 24px', fontFamily:'Arial, sans-serif', color:'black', background:'white'}}>

      <p style={{fontSize:13, letterSpacing:2, marginBottom:18}}>SAINT LOUIS UNIVERSITY LEGAL CLINICS PROGRAM</p>

      <h1 style={{fontFamily:'Georgia, serif', fontSize:52, lineHeight:1.05, margin:'0 0 20px'}}>Tell us how we can help.</h1>

      <p style={{fontSize:18, lineHeight:1.6, maxWidth:650, marginBottom:8}}>
        This intake form is the first step in connecting you with legal assistance. 
      </p> 

      <p style={{fontSize:14, marginBottom:35}}>Fields marked * are required.</p>

      <label style={labelStyle}>
        Full name *
        <input name="fullName" value={form.fullName} onChange={handleChange} style={inputStyle} />
        <div>{errors.fullName}</div>
      </label>

      <label style={labelStyle}>
        Email *
        <input type="email" name="email" value={form.email} onChange={handleChange} style={inputStyle} />
        <div>{errors.email}</div>
      </label>

      <label style={labelStyle}>
        Mailing address *
        <input name="address" value={form.address} onChange={handleChange} style={inputStyle} />
        <div>{errors.address}</div>
      </label>

      <label style={labelStyle}>
        Phone number *
        <input type="tel" name="phone" value={form.phone} onChange={handleChange} style={inputStyle} />
        <div>{errors.phone}</div>
      </label>

      <label style={labelStyle}>
        Date of birth *
        <input type="date" name="birthDate" value={form.birthDate} onChange={handleChange} style={inputStyle} />
        <div>{errors.birthDate}</div>
      </label>

      <label style={labelStyle}> 
        Social Security number *
        <div style={{display:'flex', gap:8}}>
          <input type={showSSN ? 'text' : 'password'} name="ssn" value={form.ssn} onChange={handleChange} style={inputStyle} />
          <button type="button" onClick={() => setShowSSN((s) => !s)} style={{padding:'0 16px', background:'white', border:'1px solid black'}}>
            {showSSN ? 'Hide' : 'Show'}
          </button>
        </div>
        <div>{errors.ssn}</div>
      </label>

      <label style={labelStyle}>
        What type of legal help do you need? *
        <select name="caseType" value={form.caseType} onChange={handleChange} style={inputStyle}>
          <option value="">-- select --</option>
          <option value="CPC">CPC</option>
          <option value="MLP">MLP</option>
          <option value="Human Rights">Human Rights</option>
          <option value="ECD">ECD</option>
          <option value="Civil">Civil</option>
          <option value="Criminal">Criminal</option>
        </select>
        <div>{errors.caseType}</div>
      </label>

      <label style={labelStyle}>
        What brings you to the clinic? *
        <textarea name="reasonForIntake" value={form.reasonForIntake} onChange={handleChange} rows={5} style={inputStyle} />
        <div>{errors.reasonForIntake}</div>
      </label>

      <label style={labelStyle}>
        Tell us more about your legal issue
        <textarea name="legalIssue" value={form.legalIssue} onChange={handleChange} rows={5} style={inputStyle} />
      </label>

      <label style={labelStyle}>
        Have you received legal help for this issue before?
        <textarea name="legalHistory" value={form.legalHistory} onChange={handleChange} rows={4} placeholder="Please tell us about any previous attorneys or legal cases related to this issue." style={inputStyle} />
      </label>

      <label style={{display:'flex', gap:10, alignItems:'flex-start', marginTop:28}}>
        <input type="checkbox" name="consent" checked={form.consent} onChange={handleChange} />
        <span>I acknowledge the clinic's consent and confidentiality terms *</span>
      </label>
      <div>{errors.consent}</div>

      <label style={labelStyle}>
        Your signature *
        <input name="signature" value={form.signature} onChange={handleChange} placeholder="Sign here" style={inputStyle} />
        <div>{errors.signature}</div>
      </label>

      <button type="submit" style={{marginTop:30, padding:'14px 28px', background:'black', color:'white', border:'1px solid black', fontSize:16}}>
        Submit intake →
      </button>

    </form>
  )
}
//changed a lot of wording to go with existing homepage that is more welcoming and less formal, and to make it more clear what the form is for. Also added a few more fields that were in the wireframe but not in the original form.

export default IntakeForm