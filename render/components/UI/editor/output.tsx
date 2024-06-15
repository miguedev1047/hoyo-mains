import { useEditor } from '@tiptap/react'
import { useEffect } from 'react'
import Color from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import StarterKit from '@tiptap/starter-kit'
import parse from 'html-react-parser'

const Output = ({ description }: { description: string }) => {
  const editor = useEditor({
    extensions: [StarterKit.configure() as any, Color, TextStyle],
    content: description
  })

  useEffect(() => {
    if (!editor) return
    editor.commands.setContent(description)
  }, [description, editor])

  if (!editor) return null

  return (
    <div className='w-auto text-sm md:text-base output-text'>
      {parse(editor.getHTML())}
    </div>
  )
}

export default Output
