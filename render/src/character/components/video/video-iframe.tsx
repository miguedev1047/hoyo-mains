import { CharacterType } from '@/render/src/types'
import { Card } from '@nextui-org/card'
import { Link } from '@nextui-org/link'

interface VideoIframeProps {
  character: CharacterType
}

const VideoIframe = ({ character }: VideoIframeProps) => {
  const characterVideo = character?.videoGuide

  return (
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
  )
}

export default VideoIframe
