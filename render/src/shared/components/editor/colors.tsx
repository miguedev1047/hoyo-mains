import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@nextui-org/react'
import { type Editor } from '@tiptap/react'

interface Props {
  editor: Editor | null
}

const Colors = ({ editor }: Props) => {
  if (!editor) return null

  return (
    <Popover placement='bottom-start'>
      <PopoverTrigger>
        <Button size='sm' color='success' className='bg-color-light font-bold'>
          Colores
        </Button>
      </PopoverTrigger>
      <PopoverContent className='bg-color-dark p-4'>
        <div className='flex gap-2'>
          <Button
            size='sm'
            isIconOnly
            onClick={() => editor.chain().focus().setColor('#D6D4E8').run()}
            className={
              editor.isActive('textStyle', { color: '#D6D4E8' })
                ? 'bg-[#D6D4E8]'
                : 'bg-[#B3B1D1]'
            }
          />
          <Button
            size='sm'
            isIconOnly
            onClick={() => editor.chain().focus().setColor('#FF4B4B').run()}
            className={
              editor.isActive('textStyle', { color: '#FF4B4B' })
                ? 'bg-[#FF4B4B]'
                : 'bg-[#BF3636]'
            }
          />
          <Button
            size='sm'
            isIconOnly
            onClick={() => editor.chain().focus().setColor('#4BC8FF').run()}
            className={
              editor.isActive('textStyle', { color: '#4BC8FF' })
                ? 'bg-[#4BC8FF]'
                : 'bg-[#3793BF]'
            }
          />
          <Button
            size='sm'
            isIconOnly
            onClick={() => editor.chain().focus().setColor('#C874FF').run()}
            className={
              editor.isActive('textStyle', { color: '#C874FF' })
                ? 'bg-[#C874FF]'
                : 'bg-[#964AC8]'
            }
          />
          <Button
            size='sm'
            isIconOnly
            onClick={() => editor.chain().focus().setColor('#4BFFA5').run()}
            className={
              editor.isActive('textStyle', { color: '#4BFFA5' })
                ? 'bg-[#4BFFA5]'
                : 'bg-[#36BF7A]'
            }
          />
          <Button
            size='sm'
            isIconOnly
            onClick={() => editor.chain().focus().setColor('#4BFFFF').run()}
            className={
              editor.isActive('textStyle', { color: '#4BFFFF' })
                ? 'bg-[#4BFFFF]'
                : 'bg-[#36BFBF]'
            }
          />
          <Button
            size='sm'
            isIconOnly
            onClick={() => editor.chain().focus().setColor('#FFD74B').run()}
            className={
              editor.isActive('textStyle', { color: '#FFD74B' })
                ? 'bg-[#FFD74B]'
                : 'bg-[#BFAB36]'
            }
          />
          <Button
            size='sm'
            isIconOnly
            onClick={() => editor.chain().focus().setColor('#74FF4B').run()}
            className={
              editor.isActive('textStyle', { color: '#74FF4B' })
                ? 'bg-[#74FF4B]'
                : 'bg-[#52BF36]'
            }
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default Colors
