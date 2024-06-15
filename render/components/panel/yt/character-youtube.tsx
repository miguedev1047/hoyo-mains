import { Characters } from '@/types'
import { Link } from '@nextui-org/link'
import { Card } from '@nextui-org/card'
import { IconMovieOff } from '@tabler/icons-react'
import { Tooltip } from '@nextui-org/react'
import FormCharacterYoutube from '@/render/components/panel/yt/form-character-youtube'

const CharacterYoutube = ({
  character
}: {
  character: Characters | undefined
}) => {
  const videoGuide = character?.videoGuide
  const videoIsNull = null

  return (
    <div className='col-span-4 space-y-4'>
      <article className='flex items-center space-x-4'>
        <h3 className='text-xl font-semibold capitalize text-secondary-color'>
          {character?.name} Video guía
        </h3>
      </article>

      <Card className='p-4 md:p-8 space-y-4 bg-color-darkest'>
        {videoGuide === videoIsNull && (
          <article className='text-xl text-color-gray/50 font-bold flex  flex-col items-center justify-center'>
            <Tooltip
              placement='bottom'
              radius='sm'
              showArrow
              className='bg-color-dark p-4'
              content={
                <div className='text-center'>
                  <h2>No hay video disponible para mostrar</h2>
                  <h2>agregue uno para mostrarlo aqui.</h2>
                </div>
              }
            >
              <IconMovieOff size={120} />
            </Tooltip>
          </article>
        )}

        {videoGuide !== videoIsNull && (
          <h3 className='text-lg'>
            <span className='capitalize'>{character?.name}</span> video guía
            por&nbsp;
            <Link
              isExternal
              href={videoGuide?.youtuberChannel}
              className='text-lg text-secondary-color'
            >
              <span>{videoGuide?.youtuberName} ¡Mira su contenido!</span>
            </Link>
          </h3>
        )}

        {videoGuide !== null && (
          <iframe
            className='aspect-video rounded-xl'
            src={videoGuide?.embedVideoUrl}
            title={`Guia por: ${videoGuide?.youtuberName}`}
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            referrerPolicy='strict-origin-when-cross-origin'
            allowFullScreen
          ></iframe>
        )}
      </Card>

      <FormCharacterYoutube character={character} />
    </div>
  )
}

export default CharacterYoutube
