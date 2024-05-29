import { Button } from '@nextui-org/button'
import { type Editor } from '@tiptap/react'
import { IconBold, IconItalic, IconStrikethrough } from '@tabler/icons-react'
import Colors from '@/render/components/UI/editor/colors'

interface Props {
  editor: Editor | null
}

const EditorToolbar = ({ editor }: Props) => {
  if (!editor) return null

  return (
    <div className='flex gap-4'>
      <Colors editor={editor} />

      <div className='flex gap-2'>
        <Button
          size='sm'
          isIconOnly
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={
            editor.isActive('italic') ? 'bg-color-gray text-color-darkest' : ''
          }
        >
          <IconItalic />
        </Button>
        <Button
          size='sm'
          isIconOnly
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={
            editor.isActive('bold') ? 'bg-color-gray text-color-darkest' : ''
          }
        >
          <IconBold />
        </Button>
        <Button
          size='sm'
          isIconOnly
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={
            editor.isActive('strike') ? 'bg-color-gray text-color-darkest' : ''
          }
        >
          <IconStrikethrough />
        </Button>
      </div>
    </div>
  )
}

export default EditorToolbar
