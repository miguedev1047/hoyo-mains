import { TalentsType } from '@/render/src/types'
import { IconPencil, IconTrash } from '@tabler/icons-react'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { Button, CircularProgress, Divider, Image } from '@nextui-org/react'
import { useModalStore } from '@/render/src/panel/shared/utilities/store/use-modal-store'
import { deleteTalent } from '@/render/src/panel/character/tabs/talents/utilities/services/delete'
import { Figure } from '@/render/src/shared/components/figure'
import DeleteButton from '@/render/src/panel/shared/components/buttons/delete-button'
import Output from '@/render/src/shared/components/editor/output'

interface TalentItemProps {
  talent: TalentsType
}

const TalentItem = ({ talent }: TalentItemProps) => {
  const { onOpen, setModalId } = useModalStore((state) => ({
    onOpen: state.onOpen,
    setModalId: state.setModalId
  }))

  const handleEdit = (talentId: string) => {
    setModalId(talentId)
    onOpen({ name: 'talent' })
  }

  return (
    <li className='w-full'>
      <Card className='px-2 py-5 md:px-8 bg-color-darkest space-y-3'>
        <CardHeader>
          <article className='w-full flex items-center gap-4'>
            <Figure size='lg' radius='lg'>
              {talent.imageUrl ? (
                <Image
                  className='w-full h-full object-cover'
                  src={talent.imageUrl!}
                  alt={talent.name}
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
              {talent.name}
            </h3>
          </article>
          <div className='flex space-x-2'>
            <DeleteButton
              size='md'
              deleteType='image'
              path='talents'
              id={talent.id}
              onCallback={deleteTalent}
              className='bg-color-red font-bold text-color-lightest'
            >
              <IconTrash />
            </DeleteButton>
            <Button
              size='md'
              onPress={() => handleEdit(talent.id)}
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
          <Output description={talent.description!} />
        </CardBody>
      </Card>
    </li>
  )
}

export default TalentItem
