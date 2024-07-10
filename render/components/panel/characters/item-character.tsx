'use client'

import { Card } from '@nextui-org/card'
import { CircularProgress } from '@nextui-org/react'
import { getStarBorderColor } from '@/utils/helpers/get-color'
import { Tooltip } from '@nextui-org/tooltip'
import { Character } from '@prisma/client'
import { Button } from '@nextui-org/button'
import { IconTrash } from '@tabler/icons-react'
import { useTransition } from 'react'
import { deleteImage } from '@/utils/helpers/delete-image'
import { deleteCharacter } from '@/render/services/panel/characters/delete'
import { toast } from 'sonner'
import { mutate } from 'swr'
import { Image } from '@nextui-org/image'
import Link from 'next/link'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { DeleteButton } from '../../UI/buttons/delete/delete-button'

interface Props {
  character: Character
}

const ItemCharacter = ({ character }: Props) => {

  const characterName = character.name.toLowerCase().replace(/\s/g, '-')
  const url = `/panel/character?name=${characterName}`

  return (
    <Tooltip
      className='bg-color-light text-color-darkest px-8'
      placement='bottom'
      content={<p className='font-medium capitalize'>{character.name}</p>}
    >
      <Card
        as={Link}
        href={url}
        isPressable
        className={clsx(
          'bg-color-dark border-2 p-0 aspect-square',
          getStarBorderColor(character.stars)
        )}
      >
        {character.imageUrl ? (
          <Image
            classNames={{
              wrapper: 'bg-color-darkest w-full h-full aspect-square'
            }}
            className='object-cover w-full h-full'
            src={character.imageUrl!}
            alt={character.name}
          />
        ) : (
          <CircularProgress
            aria-label='Loading...'
            className='absolute top-0 left-[50%] translate-x-[-50%] size-full'
            size='lg'
            classNames={{
              svg: 'w-36 h-36 drop-shadow-md',
              indicator: 'stroke-color-success',
              track: 'stroke-white/10',
              value: 'text-sm font-semibold text-white'
            }}
            strokeWidth={5}
          />
        )}

        <DeleteButton
          id={character.id}
          onCallback={deleteCharacter}
          className='bg-color-red absolute right-0 bottom-0 z-10 m-2'
          deleteType='image'
          path='characters'
        >
          <IconTrash size={18} />
        </DeleteButton>
      </Card>
    </Tooltip>
  )
}

export default ItemCharacter
