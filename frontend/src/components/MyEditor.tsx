import { useEditor, EditorContent } from '@tiptap/react'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import StarterKit from '@tiptap/starter-kit'
import '../styles/MyEditor.css'
import { useThemeContext } from '../context/ThemeContext'
import { useModalContext } from '../context/ModalContext'
import axios from 'axios'
import { APIURL } from '../config/Url'
import toast from 'react-hot-toast'
import MenuBar from './MenuBar'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import EditorSubmitBtns from './EditorSubmitBtns'

//  Added type for props
interface MyEditorProps {
    content: string
    onChange: (value: string) => void
    isEditMode?: boolean  // optional; defaults to false

}

const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({}),
    StarterKit.configure({
        bulletList: { keepMarks: true, keepAttributes: false },
        orderedList: { keepMarks: true, keepAttributes: false },
    }),
]

//  Accept props
export default function MyEditor({ content, onChange, isEditMode = false }: MyEditorProps) {
    const { isDarkMode } = useThemeContext()
    const { setIsModalOpen } = useModalContext()
    const navigate = useNavigate()

    const editor = useEditor({
        extensions,
        content,
        onUpdate: ({ editor }) => {
            const html = editor.getHTML()
            onChange(html)
        },
        editorProps: {
            attributes: {
                class: isDarkMode === 'dark' ? 'tiptap dark' : 'tiptap light',
            },
        },
    })

    //  Update editor content if `content` prop changes externally
    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content)
        }
    }, [content, editor])

    const handleSubmit = async () => {
        if (!editor) return
        const htmlContent = editor.getHTML()
        try {
            await axios.post(`${APIURL.baseUrl}/blogs/addblog`, { content: htmlContent }, { withCredentials: true })
            toast.success('blog added')
            setIsModalOpen(false)
            navigate('/')
        } catch (error) {
            console.error('Error submitting blog:', error)
            toast.error('Failed to submit blog.')
        }
    }

    return (
        <div className="flex flex-col items-center h-[76vh]">
            {editor && <MenuBar editor={editor} />}
            {editor && <EditorContent editor={editor} />}

            {/* Conditionally render buttons */}
            {!isEditMode && (
                <EditorSubmitBtns handleSubmit={handleSubmit} setIsModalOpen={setIsModalOpen} />
            )}


        </div>
    )
}
