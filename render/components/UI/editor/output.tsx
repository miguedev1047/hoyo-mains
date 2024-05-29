import { EditorContent, useEditor } from '@tiptap/react'
import Color from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import StarterKit from '@tiptap/starter-kit'

const Output = ({ description }: { description: string }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      Document,
      Paragraph,
      Text,
      Color,
      TextStyle
    ],
    content: description,
    editable: false,
    autofocus: false,
    editorProps: {
      attributes: {
        class: 'w-full leading-8 text-base text-pretty'
      }
    }
  })

  return (
    <div className='w-full '>
      <EditorContent editor={editor} />
    </div>
  )
}

export default Output
