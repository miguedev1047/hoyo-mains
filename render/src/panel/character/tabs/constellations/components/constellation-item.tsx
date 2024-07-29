import { useOpenStore } from '@/render/src/panel/shared/utilities/store/use-open'
import { ConstellationsType } from '@/render/src/types'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { Button, CircularProgress, Divider, Image } from '@nextui-org/react'
import { IconPencil, IconTrash } from '@tabler/icons-react'
import { deleteConstellation } from '@/render/src/panel/character/tabs/constellations/utilities/services/delete'
import { Figure } from '@/render/src/shared/components/figure'
import DeleteButton from '@/render/src/panel/shared/components/buttons/delete-button'
import Output from '@/render/src/shared/components/editor/output'

interface ConstellationItemProps {
  constellation: ConstellationsType
}

const ConstellationItem = ({ constellation }: ConstellationItemProps) => {
  const { onOpenThis, setId } = useOpenStore((state) => ({
    onOpenThis: state.onOpenThis,
    setId: state.setId
  }))

  const handleEdit = (constellationId: string) => {
    setId(constellationId)
    onOpenThis({ name: 'constellation' })
  }

  return (
    <li className='w-full'>
      <Card className='px-2 py-5 md:px-8 bg-color-darkest space-y-3'>
        <CardHeader>
          <article className='w-full flex items-center gap-4'>
            <Figure size='lg' radius='lg'>
              {constellation.imageUrl ? (
                <Image
                  className='w-full h-full object-cover'
                  src={constellation.imageUrl!}
                  alt={constellation.name}
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
              {constellation.name}
            </h3>
          </article>
          <div className='flex space-x-2'>
            <DeleteButton
              size='md'
              deleteType='image'
              path='constellations'
              id={constellation.id}
              onCallback={deleteConstellation}
              className='bg-color-red font-bold text-color-lightest'
            >
              <IconTrash />
            </DeleteButton>
            <Button
              size='md'
              onPress={() => handleEdit(constellation.id)}
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
          <Output description={constellation.description!} />
        </CardBody>
      </Card>
    </li>
  )
}

export default ConstellationItem
