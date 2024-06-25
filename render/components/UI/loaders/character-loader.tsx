import { Grid } from 'react-loader-spinner'

interface CharacterLoaderProps {
  className?: string
}

const CharacterLoader = ({ className = 'h-[calc(100vh_-_64px)]' }: CharacterLoaderProps) => {
  return (
    <div
      className={`w-full  ${className} grid place-content-center`}
    >
      <Grid
        visible={true}
        height='240'
        width='240'
        color='#D6D4E8'
        ariaLabel='grid-loading'
        radius='12.5'
        wrapperStyle={{}}
        wrapperClass='grid-wrapper'
      />
    </div>
  )
}

export default CharacterLoader
