import { Card } from '@nextui-org/card'
import { Spinner } from '@nextui-org/react'

export const HomeCharacterTeamLoader = () => {
  return (
    <Card className='bg-primary-color aspect-square flex items-center justify-center'>
      <Spinner color='success' size='lg' />
    </Card>
  )
}
