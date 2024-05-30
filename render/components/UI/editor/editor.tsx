import EditorToolbar from './editor-toolbar'

import { EditorContent, useEditor } from '@tiptap/react'
import Color from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import StarterKit from '@tiptap/starter-kit'
import { useEffect, useState } from 'react'
import { ScrollShadow } from '@nextui-org/react'

const Editor = ({
  description,
  placeholder,
  errorMessage,
  onChange
}: {
  description: string
  placeholder?: string
  errorMessage?: string
  onChange: (richText: string) => void
}) => {
  const [key, setKey] = useState(+new Date())

  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      Document,
      Paragraph,
      Text,
      Color,
      TextStyle
    ],
    
    content: description || placeholder,
    editorProps: {
      attributes: {
        class:
          'bg-color-darkest rounded-lg border-color-lightest h-full p-3 focus:outline-none'
      }
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    }
  })

  useEffect(() => {
    setKey(+new Date())
  }, [editor])

  return (
    <div className='col-span-2 flex flex-col space-y-1 justify-stretch'>
      <div className='space-y-2'>
        <EditorToolbar editor={editor} />
        <ScrollShadow hideScrollBar className='w-full h-full max-h-[240px] '>
          <EditorContent key={key} editor={editor} />
        </ScrollShadow>
      </div>
      <p className='text-danger-400 text-xs'>{errorMessage}</p>
    </div>
  )
}

export default Editor
