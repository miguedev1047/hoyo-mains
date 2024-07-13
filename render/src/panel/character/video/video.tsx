import { CharacterType } from '@/render/src/types'
import VideoCardView from '@/render/src/panel/character/video/components/video-card-view'
import FormVideo from '@/render/src/panel/character/video/components/video-form'

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

      <VideoCardView character={character} />
      <FormVideo character={character} />
    </div>
  )
}

export default Video
