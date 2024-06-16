import { EditorContent, useEditor } from '@tiptap/react'
import { IconPencil, IconPlus } from '@tabler/icons-react'
import { useEffect } from 'react'
import { ScrollShadow } from '@nextui-org/react'
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@nextui-org/react'
import EditorToolbar from '@/render/components/UI/editor/editor-toolbar'
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import StarterKit from '@tiptap/starter-kit'

const Editor = ({
  description,
  placeholder,
  errorMessage,
  isEdit,
  isPending,
  onChange
}: {
  description: string
  placeholder?: string
  errorMessage?: string
  isPending: boolean
  isEdit: boolean
  onChange: (richText: string) => void
}) => {
  const editor = useEditor({
    extensions: [StarterKit.configure(), TextStyle, Color],
    content: description || placeholder,
    editorProps: {
      attributes: {
        class:
          'bg-color-darkest rounded-lg h-full min-h-[150px] border-color-lightest p-3 focus:outline-none'
      }
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    }
  })

  useEffect(() => {
    if (!editor) return

    const isFocused = editor.isFocused
    if (isFocused) return

    if (!isEdit) return
    editor.commands.setContent(description)
  }, [description, editor, isEdit])

  if (!editor) return null

  return (
    <div className='col-span-2 flex flex-col space-y-1 justify-stretch'>
      <Popover
        backdrop='opaque'
        placement='bottom'
        classNames={{ arrow: 'bg-color-dark' }}
        showArrow
      >
        <PopoverTrigger>
          <Button
            fullWidth
            isDisabled={isPending}
            color='success'
            startContent={isEdit ? <IconPencil /> : <IconPlus />}
            className='bg-secondary-color font-bold'
          >
            {isEdit ? 'Editar' : 'Añadir'} Descripción
          </Button>
        </PopoverTrigger>
        <PopoverContent className='bg-color-dark max-w-full w-[875px] p-4 rounded-lg'>
          <div className='space-y-2 w-full'>
            <EditorToolbar editor={editor} />
            <ScrollShadow size={0} hideScrollBar className='w-full h-[150px]'>
              <EditorContent editor={editor} />
            </ScrollShadow>
          </div>
        </PopoverContent>
      </Popover>

      <p className='text-danger-400 text-xs'>{errorMessage}</p>
    </div>
  )
}

export default Editor
