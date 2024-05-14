import { type Editor } from '@tiptap/react'

interface Props {
  editor: Editor | null
}

const EditorToolbar = ({ editor }: Props) => {
  if (!editor) return null

  return (
    <div className='flex gap-1'>
      
    </div>
  )
}

export default EditorToolbar
