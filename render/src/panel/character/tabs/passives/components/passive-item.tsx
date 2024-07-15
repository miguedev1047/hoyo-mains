import { PassivesType } from '@/render/src/types'
import { useModalStore } from '@/render/src/panel/shared/utilities/store/use-modal-store'
import { Button, CircularProgress, Divider, Image } from '@nextui-org/react'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { deletePassive } from '@/render/src/panel/character/tabs/passives/utilities/services/delete'
import { IconPencil, IconTrash } from '@tabler/icons-react'
import DeleteButton from '@/render/src/panel/shared/components/buttons/delete-button'
import Output from '@/render/src/shared/components/editor/output'
import Figure from '@/render/src/shared/components/figure'

interface PassiveItemProps {
  passive: PassivesType
}
const PassiveItem = ({ passive }: PassiveItemProps) => {
  const { onOpen, setModalId } = useModalStore((state) => ({
    onOpen: state.onOpen,
    setModalId: state.setModalId
  }))

  const handleEdit = (passiveId: string) => {
    setModalId(passiveId)
    onOpen({ name: 'passive' })
  }

  return (
    <li className='w-full'>
      <Card className='px-2 py-5 md:px-8 bg-color-darkest space-y-3'>
        <CardHeader>
          <article className='w-full flex items-center max-md:justify-between gap-4'>
            <Figure
              background='bg-primary-color'
              width='w-20'
              height='h-20'
              radius='rounded-full'
            >
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
            <h3 className='text-xl font-semibold text-secondary-color line-clamp-1'>
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
