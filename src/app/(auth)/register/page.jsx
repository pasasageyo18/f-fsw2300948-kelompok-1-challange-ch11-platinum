import Form from '@/app/components/Form'

export default function Page() {
  return (
    <Form
      buttonText="Sign Up"
      signHref="/login"
      signLink="Sign In"
      signText="Already have an account? "
      title="Sign Up"
    />
  )
}
