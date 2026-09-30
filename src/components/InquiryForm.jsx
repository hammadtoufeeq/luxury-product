import { useState } from 'react'
import api from '../api/axios.js'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
function InquiryForm(props) {
  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [submitted, setsubmitted] = useState(false)

  const InquiryMutation = useMutation({
    mutationFn: async function (inquiryData) {
      const response = await api.post('/inquiries', inquiryData)
      return response.data
    },
    onSuccess: function (data) {
      toast.success(`Inquiry about ${data.inquiry.productName} sent successfully`)
      setsubmitted(true)
    },
    onError: function (err) {
      toast.error(err.response?.data?.message || 'Failed to send inquiry')
    }
  })

  function handleSubmit(e) {
    e.preventDefault()
    InquiryMutation.mutate({ name, email, productName: props.productName })
  }
  if (submitted) {
    return <p className='thank-you'>Thank you! We'll contact you about {props.productName} soon.</p>
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
      <button type="submit" disabled={InquiryMutation.isPending}>
      {InquiryMutation.isPending ? 'Sending...' : 'Send Inquiry'}
      </button>
    </form>
  )
}
export default InquiryForm;