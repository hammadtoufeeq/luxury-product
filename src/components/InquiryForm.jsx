import { useState } from 'react'
import api from '../api/axios.js'
function InquiryForm(props) {
  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [submitted, setsubmitted] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    await api.post('/inquiries', { name, email, productName: props.productName })
    setsubmitted(true)
  }

  if (submitted) {
    return <p className="thank-you">Thank you! We'll contact you about {props.productName} soon.</p>
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setname(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setemail(e.target.value)}
        required
      />
      <button type="submit">Send Inquiry</button>
    </form>
  )
}
export default InquiryForm;