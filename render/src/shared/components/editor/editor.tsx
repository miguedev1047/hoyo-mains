'use client'

import { EditorContent, useEditor } from '@tiptap/react'
import { IconPencil, IconPlus, IconX } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { ScrollShadow } from '@nextui-org/react'
import { Color } from '@tiptap/extension-color'
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@nextui-org/react'
import TextStyle from '@tiptap/extension-text-style'
import StarterKit from '@tiptap/starter-kit'
import EditorToolbar from '@/render/src/shared/components/editor/editor-toolbar'

const Editor = ({
  description,
  placeholder,
  errorMessage,
  isEdit,
  onChange
}: {
  description: string
  placeholder?: string
  errorMessage?: string
  isEdit: boolean
  onChange: (richText: string) => void
}) => {
  const editor = useEditor({
    extensions: [StarterKit.configure(), TextStyle, Color],
    content: description || placeholder,
    immediatelyRender: true,
    editorProps: {
      attributes: {
        class:
          'bg-color-darkest rounded-lg h-full min-h-[200px] border-color-lightest p-3 focus:outline-none'
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
    <>
      <div className='col-span-2 flex flex-col space-y-1 justify-stretch'>
        <div className='space-y-2 w-full relative'>
          <EditorToolbar editor={editor} />

          <ScrollShadow
            size={0}
            hideScrollBar
            className='w-full h-[200px] rounded-xl'
          >
            <EditorContent editor={editor} />
          </ScrollShadow>
        </div>

        <p className='text-danger-400 text-xs'>{errorMessage}</p>
      </div>
    </>
  )
}

export default Editor
