import LoginBrand from '@/render/src/admin/login/components/login-brand'
import LoginForm from '@/render/src/admin/login/login'

export async function generateMetadata() {
  return {
    title: 'HoYo Panel | Acceder',
    description: 'Acceder al panel de HoYo Mains.'
  }
}

const LoginPage = () => {
  return (
    <section className='w-full h-full flex gap-4'>
      <LoginBrand />
      <LoginForm />
    </section>
  )
}

export default LoginPage
