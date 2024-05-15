import { Card, CardBody } from '@nextui-org/card'

interface Props {
  message?: string
  className?: string
}

const AlertError = ({ message, className }: Props) => {
  return (
    <Card
      className={`${className} text-color-red border-color-red border-2 bg-color-red/20 p-4`}
    >
      <CardBody>
        <h1 className='text-center text-4xl font-bold'>Error</h1>
        <p className='text-center text-xl'>
          {message ? message : 'Hubo un problema al cargar los datos'}
        </p>
      </CardBody>
    </Card>
  )
}

export default AlertError
