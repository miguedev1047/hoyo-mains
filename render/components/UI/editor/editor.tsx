import { EditorContent, useEditor } from '@tiptap/react'
import EditorToolbar from '@/render/components/UI/editor/editor-toolbar'
import Color from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import StarterKit from '@tiptap/starter-kit'
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@nextui-org/react'
import { IconPencil, IconPlus } from '@tabler/icons-react'
import { useEffect } from 'react'

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
    extensions: [StarterKit.configure(), Color, TextStyle],

    content: description || placeholder,
    editorProps: {
      attributes: {
        class:
          'bg-color-darkest rounded-lg border-color-lightest min-h-[100px] p-3 focus:outline-none'
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
            className='bg-color-light font-bold'
          >
            {isEdit ? 'Editar' : 'Añadir'} Descripción
          </Button>
        </PopoverTrigger>
        <PopoverContent className='bg-color-dark max-w-full w-[1024px] p-4 rounded-lg'>
          <div className='space-y-2 w-full'>
            <EditorToolbar editor={editor} />
            <EditorContent editor={editor} />
          </div>
        </PopoverContent>
      </Popover>
      <p className='text-danger-400 text-xs'>{errorMessage}</p>
    </div>
  )
}

export default Editor
