import EditorToolbar from './editor-toolbar'

import { useEditor, EditorContent } from '@tiptap/react'
import { Color } from '@tiptap/extension-color'
import { useEffect, useState } from 'react'
import StarterKit from '@tiptap/starter-kit'
import TextStyle from '@tiptap/extension-text-style'

const Editor = ({
  description,
  placeholder,
  onChange
}: {
  description: string
  placeholder?: string
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
    <div className='col-span-2 flex flex-col gap-2 justify-stretch'>
      <EditorToolbar editor={editor} />
      <EditorContent key={key} editor={editor} />
    </div>
  )
}

export default Editor
