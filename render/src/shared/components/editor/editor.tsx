'use client'

import { EditorContent, useEditor } from '@tiptap/react'
import { useEffect } from 'react'
import { Card, ScrollShadow } from '@nextui-org/react'
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import StarterKit from '@tiptap/starter-kit'
import EditorToolbar from '@/render/src/shared/components/editor/editor-toolbar'
import { cn } from '@/libs/utils'

interface EditorProps {
  description: string
  placeholder?: string
  errorMessage?: string
  className?: string
  isEdit: boolean
  onChange: (richText: string) => void
}

const Editor = ({
  description,
  placeholder,
  errorMessage,
  className,
  isEdit,
  onChange
}: EditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit.configure(), TextStyle, Color],
    content: description || placeholder,
    immediatelyRender: true,
    editorProps: {
      attributes: {
        class: 'bg-transparent h-full min-h-[200px] focus:outline-none'
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
      <Card
        className={cn(
          'bg-color-darkest flex flex-col space-y-1 justify-stretch p-4',
          className
        )}
      >
        <div className='space-y-3 w-full relative'>
          <EditorToolbar editor={editor} />

          <ScrollShadow
            size={0}
            hideScrollBar
            className='w-full h-[200px] rounded-xl'
          >
            <EditorContent editor={editor} />
          </ScrollShadow>
        </div>
      </Card>
      {errorMessage && (
        <p className='text-danger-400 text-xs'>{errorMessage}</p>
      )}
    </>
  )
}

export default Editor
