import { useState } from 'react'
function InquiryForm(props) {
  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [submitted, setsubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    console.log("Inquiry:", { product: props.productName, name, email })
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