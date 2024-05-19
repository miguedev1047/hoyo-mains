import { Material } from '@prisma/client'
import { Divider, Tooltip } from '@nextui-org/react'
import Output from '@/render/components/UI/editor/output'
import Image from 'next/image'

interface Props {
  material: Material
  children: React.ReactNode
}

const TooltipMaterials = ({ material, children }: Props) => {
  return (
    <Tooltip
      placement='bottom-start'
      className='bg-color-dark p-8 shadow-2xl'
      content={
        <div className='w-[480px]  max-w-full select-none space-y-4'>
          <div className='flex items-center gap-4'>
            <Image
              width={40}
              height={40}
              className='object-cover'
              src={material.imageUrl!}
              alt={material.name}
            />
            <h3 className='text-2xl font-semibold line-clamp-1'>
              {material.name}
            </h3>
          </div>

          <Divider />

          <Output description={material.description} />
        </div>
      }
    >
      {children}
    </Tooltip>
  )
}

export default TooltipMaterials
