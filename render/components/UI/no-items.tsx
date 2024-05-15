const NoItems = ({ message }: { message?: string }) => {
  return (
    <div className='w-full h-[calc(100vh_-_332px)] grid place-content-center'>
      <h2 className='text-4xl text-center font-bold text-color-light/50'>
        {message ? message : 'No hay elementos para mostrar'}
      </h2>
    </div>
  )
}

export default NoItems
