import { useOpenStore } from '@/render/src/panel/shared/utilities/store/use-open'
import { PassivesType } from '@/render/src/types'
import { Button, CircularProgress, Divider, Image } from '@nextui-org/react'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { deletePassive } from '@/render/src/panel/character/tabs/passives/utilities/services/delete'
import { IconPencil, IconTrash } from '@tabler/icons-react'
import { Figure } from '@/render/src/shared/components/figure'
import DeleteButton from '@/render/src/panel/shared/components/buttons/delete-button'
import Output from '@/render/src/shared/components/editor/output'

interface PassiveItemProps {
  passive: PassivesType
}
const PassiveItem = ({ passive }: PassiveItemProps) => {
  const { onOpenThis, setId } = useOpenStore((state) => ({
    onOpenThis: state.onOpenThis,
    setId: state.setId
  }))

  const handleEdit = (passiveId: string) => {
    setId(passiveId)
    onOpenThis({ name: 'passive' })
  }

  return (
    <li className='w-full'>
      <Card className='px-2 py-5 md:px-8 bg-color-darkest space-y-3'>
        <CardHeader>
          <article className='w-full flex items-center gap-4'>
            <Figure size='lg' radius='lg'>
              {passive.imageUrl ? (
                <Image
                  className='w-full h-full object-cover'
                  src={passive.imageUrl!}
                  alt={passive.name}
                />
              ) : (
                <CircularProgress
                  aria-label='Loading...'
                  size='lg'
                  classNames={{
                    svg: 'w-full h-full drop-shadow-md',
                    indicator: 'stroke-color-success',
                    track: 'stroke-white/10',
                    value: 'text-sm font-semibold text-white'
                  }}
                  strokeWidth={5}
                />
              )}
            </Figure>
            <h3 className='texb-base md:text-xl font-semibold text-secondary-color line-clamp-1'>
              {passive.name}
            </h3>
          </article>
          <div className='flex space-x-2'>
            <DeleteButton
              size='md'
              deleteType='image'
              path='passives'
              id={passive.id}
              onCallback={deletePassive}
              className='bg-color-red font-bold text-color-lightest'
            >
              <IconTrash />
            </DeleteButton>
            <Button
              size='md'
              onPress={() => handleEdit(passive.id)}
              color='success'
              isIconOnly
              className='bg-color-light font-bold text-color-darkest'
            >
              <IconPencil />
            </Button>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <Output description={passive.description!} />
        </CardBody>
      </Card>
    </li>
  )
}

export default PassiveItem
