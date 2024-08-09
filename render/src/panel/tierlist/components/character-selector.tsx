import {
  MultiSelectModal,
  MultiSelectModalContent,
  MultiSelectModalFooter,
  MultiSelectModalItems,
  MultiSelectModalList,
  MultiSelectModalSearch,
  MultiSelectModalTrigger,
} from '@/render/src/shared/components/multi-select-modal'
import {
  CharacterTierType,
  CharacterType,
  TierlistType,
} from '@/render/src/types'
import { Button } from '@nextui-org/button'
import { useDisclosure } from '@nextui-org/react'
import { IconPlus } from '@tabler/icons-react'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { addCharacterToTier } from '@/render/src/panel/tierlist/utilities/services/create'

interface CharacterSelectorProps {
  tier: TierlistType
  tierlist: TierlistType
  characters: CharacterType[]
  disabledItems: CharacterTierType[]
}

const CharacterSelector = ({
  tierlist,
  tier,
  characters,
  disabledItems,
}: CharacterSelectorProps) => {
  const { refresh } = useRouter()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [searchValue, setSearchValue] = useState('')
  const [filteredItems, setFilteredItems] =
    useState<Array<Record<string, any>>>(characters)
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set([]))
  const [isPending, startTransition] = useTransition()

  const disabledKeys = disabledItems.map((item) => item.characterId)

  const onSubmit = (e: any) => {
    e.preventDefault()

    const tierId = tier.id
    const tierlistId = tierlist.id

    const data = Array.from(selectedKeys)

    if (!data.length) {
      toast.error('Debes seleccionar al menos un personaje')
      return
    }

    const newValues = data.map((item, index) => ({
      characterId: item,
      order: index++,
      tierId,
      tierlistId,
    }))

    startTransition(async () => {
      const { status, message, error } = await addCharacterToTier(newValues)

      if (status === 201) {
        toast.success(message)
        onOpenChange()
        refresh()
        selectedKeys.clear()
        return
      }

      toast.error(error)
    })
  }

  return (
    <MultiSelectModal className='col-span-1'>
      <MultiSelectModalTrigger
        tooltipContent='Añadir personaje'
        isSquared
        asChild
      >
        <Button
          onPress={onOpen}
          color='success'
          variant='flat'
        >
          <IconPlus size={48} />
        </Button>
      </MultiSelectModalTrigger>

      <MultiSelectModalContent
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onSubmit={onSubmit}
      >
        <MultiSelectModalSearch
          value={searchValue}
          onValueChange={setSearchValue}
          searchPlaceholder='Buscar personaje'
        />

        <MultiSelectModalList>
          <MultiSelectModalItems
            emptyContent='No hay personajes'
            items={characters}
            searchValue={searchValue}
            selectedKeys={selectedKeys}
            defaultSelectedKeys={selectedKeys}
            filteredItems={filteredItems}
            disabledKeys={disabledKeys}
            setSelectedKeys={setSelectedKeys}
            setFilteredItems={setFilteredItems}
          />
        </MultiSelectModalList>

        <MultiSelectModalFooter>
          <Button
            fullWidth
            color='success'
            type='submit'
            isLoading={isPending}
            className='bg-color-lightest text-color-darkest font-bold'
          >
            Agregar
          </Button>
        </MultiSelectModalFooter>
      </MultiSelectModalContent>
    </MultiSelectModal>
  )
}

export default CharacterSelector
