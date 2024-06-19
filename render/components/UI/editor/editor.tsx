import { EditorContent, BubbleMenu, useEditor } from '@tiptap/react'
import { IconPencil, IconPlus, IconX } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { Card, ScrollShadow } from '@nextui-org/react'
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

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!editor) return

    const isFocused = editor.isFocused
    if (isFocused) return

    if (!isEdit) return
    editor.commands.setContent(description)
  }, [description, editor, isEdit])

  if (!editor) return null

  return (
    <>
      <BubbleMenu editor={editor}>
        <Card className='bg-color-dark p-2'>
          <EditorToolbar editor={editor} />
        </Card>
      </BubbleMenu>

      <div className='col-span-2 flex flex-col space-y-1 justify-stretch'>
        <Popover
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          backdrop='opaque'
          placement='top'
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
            <div className='space-y-2 w-full relative'>
              <Button
                size='sm'
                isIconOnly
                color='danger'
                onPress={() => setIsOpen(false)}
                className='bg-color-red absolute top-4 right-2 z-10'
              >
                <IconX />
              </Button>
              <ScrollShadow size={0} hideScrollBar className='w-full h-[150px]'>
                <EditorContent editor={editor} />
              </ScrollShadow>
            </div>
          </PopoverContent>
        </Popover>

        <p className='text-danger-400 text-xs'>{errorMessage}</p>
      </div>
    </>
  )
}

export default Editor
