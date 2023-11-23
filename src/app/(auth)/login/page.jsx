import Form from '@/app/components/Form'

export default function Page() {
  return (
    <Form
      buttonText="Sign In"
      signHref="/register"
      signLink="Sign Up"
      signText="Don't have an account? "
      title="Sign In"
    />
  )
}
