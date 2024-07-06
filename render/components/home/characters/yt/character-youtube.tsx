import { CharacterTypes } from '@/types'
import { Card } from '@nextui-org/card'
import { Link } from '@nextui-org/link'

const CharacterVideo = ({ character }: { character: CharacterTypes }) => {
  const characterVideo = character?.videoGuide

  return (
    <div className='col-span-4 space-y-4'>
      <article className='flex items-center space-x-4'>
        <h3 className='text-xl font-semibold capitalize text-secondary-color'>
          {character?.name} Video guía
        </h3>
      </article>
      {characterVideo && (
        <Card className='p-4 md:p-8 space-y-4 bg-color-darkest select-none'>
          <h3 className='text-lg'>
            <span className='capitalize'>{character?.name}</span> video guía
            por&nbsp;
            <Link
              isExternal
              href={characterVideo?.youtuberChannel}
              className='text-lg text-secondary-color'
            >
              <span>{characterVideo?.youtuberName} ¡Mira su contenido!</span>
            </Link>
          </h3>
          <iframe
            className='aspect-video rounded-xl'
            src={characterVideo?.embedVideoUrl}
            title={`Guia por: ${characterVideo?.youtuberName}`}
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            referrerPolicy='strict-origin-when-cross-origin'
            allowFullScreen
          ></iframe>
        </Card>
      )}
    </div>
  )
}

export default CharacterVideo
