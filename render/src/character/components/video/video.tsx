import { CharacterType } from '@/render/src/types'
import VideoIframe from '@/render/src/character/components/video/video-iframe'

interface VideoProps {
  character: CharacterType
}

const Video = ({ character }: VideoProps) => {
  return (
    <div className='col-span-4 space-y-4'>
      <article className='flex items-center space-x-4'>
        <h3 className='text-xl font-semibold capitalize text-secondary-color'>
          {character?.name} Video guía
        </h3>
      </article>

      <VideoIframe character={character} />
    </div>
  )
}

export default Video
