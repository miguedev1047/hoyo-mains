import { Material } from '@prisma/client'
import { Image } from '@nextui-org/image'
import Output from '@/render/components/UI/editor/output'

const TooltipMaterials = ({ material }: { material: Material }) => {
  return (
    <div className='w-[440px] max-w-full select-none space-y-4'>
      <div className='flex items-center gap-4'>
        <Image
          isBlurred
          width={240}
          height={240}
          classNames={{
            wrapper: 'w-16 h-16'
          }}
          className='object-cover'
          src={material.imageUrl!}
          alt={material.name}
        />
        <h3 className='text-xl font-semibold line-clamp-1'>
          {material.name}
        </h3>
      </div>

      <Output description={material.description} />
    </div>
  )
}

export default TooltipMaterials
