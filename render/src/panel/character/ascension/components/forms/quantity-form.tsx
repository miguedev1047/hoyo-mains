import { Input } from '@nextui-org/input'
import { Controller } from 'react-hook-form'
import { InputWrapper } from '@/render/src/shared/utilities/classes'
import { MaterialByAscension } from '@prisma/client'
import { useAscensionQuantity } from '../../hooks/use-ascension-quantity'

interface AscensionProps {
  material: MaterialByAscension
}
const QuantityForm = ({ material }: AscensionProps) => {
  const { control, errors, isPending, onSubmit } = useAscensionQuantity({
    material
  })

  return (
    <form onSubmit={onSubmit} className='flex gap-2 items-center'>
      <Controller
        control={control}
        name='quantity'
        render={({ field }) => (
          <Input
            autoFocus
            label='Cantidad'
            placeholder='Cantidad de material'
            type='number'
            size='sm'
            isDisabled={isPending}
            isInvalid={!!errors.quantity}
            errorMessage={errors.quantity?.message}
            classNames={InputWrapper}
            {...field}
          />
        )}
      />
    </form>
  )
}

export default QuantityForm
