'use client'
import { Grid } from 'react-loader-spinner'

export const CharacterListLoader = () => {
  return (
    <div className='mx-auto'>
      <Grid
        visible={true}
        height='160'
        width='160'
        color='#D6D4E8'
        ariaLabel='grid-loading'
        radius='12.5'
        wrapperStyle={{}}
        wrapperClass='grid-wrapper'
      />
    </div>
  )
}
