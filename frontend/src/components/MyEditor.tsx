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
import MenuBar from './MenuBar' // ✅ You need to pass editor to this!

const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({}),
    StarterKit.configure({
        bulletList: { keepMarks: true, keepAttributes: false },
        orderedList: { keepMarks: true, keepAttributes: false },
    }),
]

const content = `
<h2>Hi there,</h2>

<p>this is a <em>basic</em> example of <strong>Tiptap</strong>...</p>
<ul><li>That’s a bullet list</li><li>With two items</li></ul>
<pre><code class="language-css">body { display: none; }</code></pre>
<blockquote>Wow, that’s amazing! — Mom</blockquote>
`

export default () => {
    const { isDarkMode } = useThemeContext()
    const { setIsModalOpen } = useModalContext()

    const editor = useEditor({
        extensions,
        content,
        editorProps: {
            attributes: {
                class: isDarkMode === 'dark' ? 'tiptap dark' : 'tiptap light',
            },
        },
    })

    const handleSubmit = async () => {
        if (!editor) return
        const htmlContent = editor.getHTML()
        try {
            const res = await axios.post(`${APIURL.baseUrl}/blogs/addblog`, { content: htmlContent }, { withCredentials: true })
            toast.success('blog added')
            setIsModalOpen(false)
        } catch (error) {
            console.error('Error submitting blog:', error)
            toast.error('Failed to submit blog.')
        }
    }

    return (
        <div className="flex flex-col items-center h-[76vh]">
            {editor && <MenuBar editor={editor} />}
            {editor && <EditorContent editor={editor} />}
            <div className="mt-6">
                <button
                    onClick={handleSubmit}
                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition cursor-pointer"
                >
                    Publish
                </button>
                <button
                    className="ml-4 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition cursor-pointer"
                    onClick={() => setIsModalOpen(false)}
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}
