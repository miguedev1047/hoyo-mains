import LoginForm from "@/render/components/auth/login-form"

export async function generateMetadata() {
  return {
    title: 'HoYo Panel | Acceder',
    description: 'Acceder al panel de HoYo Mains.'
  }
}


const LoginPage = () => {
  return (
    <section className='w-full'>
      <LoginForm />
    </section>
  )
}

export default LoginPage
