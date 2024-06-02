import { Button } from '@nextui-org/button'

interface Props {
  isPending: boolean
  isEdit: boolean
}

const EditorButton = ({ isPending, isEdit }: Props) => {
  return (
    <Button
      fullWidth
      isDisabled={isPending}
      color='success'
      className='bg-color-light font-bold'
    >
      {isEdit ? 'Editar' : 'Crear'} Descripción
    </Button>
  )
}

export default EditorButton
