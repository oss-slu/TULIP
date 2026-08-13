import React, { useState } from 'react'

// Simple legal intake form UI (fields inspired by a typical Prisma IntakeForm schema)
const IntakeForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    clientFirstName: '',
    clientLastName: '',
    email: '',
    mobile: '',
    home: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    birthDate: '',
    ssn: '',
    caseType: '',
    description: '',
    consent: false,
  })

  const [errors, setErrors] = useState({})
  const [showSSN, setShowSSN] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const validate = () => {
    const errs = {}
    if (!form.clientFirstName.trim()) errs.clientFirstName = 'Required'
    if (!form.clientLastName.trim()) errs.clientLastName = 'Required'
    if (!form.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) errs.email = 'Invalid email'
    if (!form.mobile.trim()) errs.mobile = 'Required'
    if (!form.home.trim()) errs.home = 'Required'
    if (!form.address.trim()) errs.address = 'Required'
    if (!form.city.trim()) errs.city = 'Required'
    if (!form.state.trim()) errs.state = 'Required'
    if (!form.zip.trim()) errs.zip = 'Required'
    if (!form.birthDate.trim()) errs.birthDate = 'Required'
    if (!form.ssn.trim()) errs.ssn = 'Required'
    if (!form.caseType.trim()) errs.caseType = 'Required'
    if (!form.description.trim()) errs.description = 'Please describe the issue'
    if (!form.consent) errs.consent = 'Consent required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    if (onSubmit) onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} style={{width:"80%",margin:'0 auto',fontFamily:'Arial,Helvetica,sans-serif'}}>
      <h2>Intake Form</h2>

      <label style={{display:'flex',marginTop:10,width:"100%"}}>
        First name: 
        <input name="clientFirstName" value={form.clientFirstName} onChange={handleChange} />
        <div style={{color:'red'}}>{errors.clientFirstName}</div>
      </label>

      <label style={{display:'flex',marginTop:10,width:"100%"}}>
        Last name: 
        <input name="clientLastName" value={form.clientLastName} onChange={handleChange} />
        <div style={{color:'red'}}>{errors.clientLastName}</div>
      </label>

      <label style={{display:'flex',marginTop:10,width:"100%"}}>
        Email: 
        <input type="email" name="email" value={form.email} onChange={handleChange} />
        <div style={{color:'red'}}>{errors.email}</div>
      </label>

      <label style={{display:'flex',marginTop:10,width:"100%"}}>
        Mobile phone number: 
        <input type="tel" name="mobile" value={form.mobile} onChange={handleChange} />
        <div style={{color:'red'}}>{errors.mobile}</div>
      </label>

      <label style={{display:'flex',marginTop:10,width:"100%"}}>
        Home phone number: 
        <input type="tel" name="home" value={form.home} onChange={handleChange} />
        <div style={{color:'red'}}>{errors.home}</div>
      </label>

      <label style={{display:'flex',marginTop:10,width:"100%"}}>
        Street Address: 
        <input name="address" value={form.address} onChange={handleChange} />
        <div style={{color:'red'}}>{errors.address}</div>
      </label>

      <label style={{display:'flex',marginTop:10,width:"100%"}}>
        City/Town: 
        <input name="city" value={form.city} onChange={handleChange} />
        <div style={{color:'red'}}>{errors.city}</div>
      </label>

      <label style={{display:'flex',marginTop:10,width:"100%"}}>
        State/Province: 
        <input name="state" value={form.state} onChange={handleChange} />
        <div style={{color:'red'}}>{errors.state}</div>
      </label>

      <label style={{display:'flex',marginTop:10,width:"100%"}}>
        Zip/Postal Code: 
        <input type="number" name="zip" value={form.zip} onChange={handleChange} />
        <div style={{color:'red'}}>{errors.zip}</div>
      </label>

      <label style={{display:'flex',marginTop:10,width:"100%"}}>
        Date of birth: 
        <input type="date" name="birthDate" value={form.birthDate} onChange={handleChange} />
        <div style={{color:'red'}}>{errors.birthDate}</div>
      </label>

      <label style={{display:'flex', alignItems:'center'}}>
        Social Security Number: 
        <div>
          <input
            type={showSSN ? 'text' : 'password'}
            name="ssn"
            value={form.ssn}
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={() => setShowSSN((s) => !s)}
            aria-label={showSSN ? 'Hide SSN' : 'Show SSN'}
            style={{marginLeft:8}}
          >
            {showSSN ? 'Hide' : 'Show'}
          </button>
        </div>
        <div style={{color:'red'}}>{errors.ssn}</div>
      </label>

      <label style={{display:'flex',marginTop:10,width:"100%"}}>
        Case type: 
        <select name="caseType" value={form.caseType} onChange={handleChange}>
          <option value="">-- select --</option>
          <option>Children's Permanency</option>
          <option>Civil Litigation</option>
          <option>Criminal Defense</option>
          <option>Entrepreneurship and Community Development</option>
          <option>Human Rights at Home Litigation</option>
          <option>Medical-Legal Partnership</option>
        </select>
        <div style={{color:'red'}}>{errors.caseType}</div>
      </label>

      <label style={{display:'flex',marginTop:10,width:"100%"}}>
        Issue description: 
        <textarea name="description" value={form.description} onChange={handleChange} rows={5} />
        <div style={{color:'red'}}>{errors.description}</div>
      </label>

      <label style={{display:'flex',marginTop:10,width:"100%"}}>
        <input type="checkbox" name="consent" checked={form.consent} onChange={handleChange} /> I consent to be contacted
        <div style={{color:'red'}}>{errors.consent}</div>
      </label>

      <div style={{marginTop:12}}>
        <button type="submit">Submit</button>
      </div>
    </form>
  )
}

export default IntakeForm