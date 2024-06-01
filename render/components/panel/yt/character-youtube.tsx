import { Characters } from '@/types'
import { Link } from '@nextui-org/link'
import { Card } from '@nextui-org/card'
import FormCharacterYoutube from './form-character-youtube'

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
        <FormCharacterYoutube character={character} />
        <h3 className='text-xl font-semibold capitalize text-secondary-color'>
          {character?.name} Video guía
        </h3>
      </article>

      <Card className='p-8 space-y-4 bg-color-darkest'>
        {videoGuide === videoIsNull && (
          <article className='text-xl text-color-gray/50 font-bold text-center'>
            <h2>No hay video disponible para mostrar</h2>
            <h2>agregue uno para mostrarlo aqui.</h2>
          </article>
        )}

        {videoGuide !== videoIsNull && (
          <h3 className='text-lg'>
            {character?.name} video guía por&nbsp;
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
    </div>
  )
}

export default CharacterYoutube
