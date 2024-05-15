import EditorToolbar from './editor-toolbar'

import { useEditor, EditorContent } from '@tiptap/react'
import { Color } from '@tiptap/extension-color'
import { useEffect, useState } from 'react'
import StarterKit from '@tiptap/starter-kit'
import TextStyle from '@tiptap/extension-text-style'

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
    extensions: [StarterKit.configure(), Color, TextStyle],
    content: description || placeholder,
    editorProps: {
      attributes: {
        class:
          'bg-color-darkest rounded-lg border-color-lightest min-h-[125px] p-3 focus:outline-none'
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
      <div>
        <EditorToolbar editor={editor} />
        <EditorContent key={key} editor={editor} />
      </div>
      <p className='text-danger-400 text-xs'>{errorMessage}</p>
    </div>
  )
}

export default Editor
