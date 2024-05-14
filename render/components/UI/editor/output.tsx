import { EditorContent, useEditor } from '@tiptap/react'
import Color from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import StarterKit from '@tiptap/starter-kit'

const Output = ({ description }: { description: string }) => {
  const editor = useEditor({
    extensions: [StarterKit.configure(), Color, TextStyle],
    content: description,
    editable: false,
    autofocus: false,
    editorProps: {
      attributes: {
        class: 'w-full leading-6 text-sm'
      }
    }
  })

  return (
    <div className='flex justify-stretch'>
      <EditorContent editor={editor} />
    </div>
  )
}

export default Output
