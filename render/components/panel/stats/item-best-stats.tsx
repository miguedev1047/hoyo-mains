import { IconPencil } from '@tabler/icons-react'
import { Characters } from '@/types'
import { useEditStatStore } from '@/utils/store/use-edit-substat'
import { Button } from '@nextui-org/button'
import { Card } from '@nextui-org/card'

const ItemBestStat = ({ character }: { character: Characters | undefined }) => {
  const UNDEFINED_STATS = character?.bestStats === null

  const editStat = useEditStatStore((state) => state.isEditingStat)
  const updatedSubstat = useEditStatStore((state) => state.startEditingStat)

  if (UNDEFINED_STATS) return null
  if (editStat) return null

  return (
    <div className='grid grid-cols-3 gap-4'>
      <Card className='col-span-1 bg-color-darkest p-5 capitalize select-none'>
        <h3 className='text-base text-center capitalize font-light'>
          <span className='font-bold'>Reloj:</span>{' '}
          {character?.bestStats?.sandStat}
        </h3>
      </Card>
      <Card className='col-span-1 bg-color-darkest p-5 capitalize select-none'>
        <h3 className='text-base text-center capitalize font-light'>
          <span className='font-bold'>Caliz:</span>{' '}
          {character?.bestStats?.globetStat}
        </h3>
      </Card>
      <Card className='col-span-1 bg-color-darkest p-5 capitalize select-none'>
        <h3 className='text-base text-center capitalize font-light'>
          <span className='font-bold'>Tiara:</span>{' '}
          {character?.bestStats?.circletStat}
        </h3>
      </Card>
      <Card className='col-span-3 bg-color-darkest p-5 capitalize select-none'>
        <h3 className='text-base text-center capitalize font-light'>
          <span className='font-bold'>Substats:</span>{' '}
          {character?.bestStats?.substatPriority}
        </h3>
      </Card>

      <Button
        color='success'
        size='lg'
        onPress={() => updatedSubstat(!editStat)}
        startContent={<IconPencil size={20} />}
        className='col-span-3 bg-color-light font-bold'
      >
        Editar
      </Button>
    </div>
  )
}

export default ItemBestStat
