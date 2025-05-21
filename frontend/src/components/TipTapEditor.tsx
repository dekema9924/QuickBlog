import '../styles/TipTap.css'

import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useModalContext } from '../context/ModalContext'

const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({}),
    StarterKit.configure({
        bulletList: { keepMarks: true, keepAttributes: false },
        orderedList: { keepMarks: true, keepAttributes: false },
    }),
]


const content = `<h2>Welcome to your Quick Blogs</h2><p>Start typing...</p>`

const MenuBar = ({ editor }: { editor: any }) => {
    if (!editor) return null

    const buttonClass = (active: boolean) =>
        `px-3 py-1 rounded text-sm font-medium border ${active
            ? 'bg-purple-600 text-white border-purple-600'
            : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200'
        }`

    const iconButton = `px-3 py-1 rounded text-sm bg-gray-100 border border-gray-300 hover:bg-gray-200`


    return (
        <div className="overflow-x-auto py-4">
            <div className="flex flex-wrap gap-2">
                <button onClick={() => editor.chain().focus().toggleBold().run()} className={buttonClass(editor.isActive('bold'))}>Bold</button>
                <button onClick={() => editor.chain().focus().toggleItalic().run()} className={buttonClass(editor.isActive('italic'))}>Italic</button>
                <button onClick={() => editor.chain().focus().toggleStrike().run()} className={buttonClass(editor.isActive('strike'))}>Strike</button>
                <button onClick={() => editor.chain().focus().toggleCode().run()} className={buttonClass(editor.isActive('code'))}>Code</button>

                <button onClick={() => editor.chain().focus().unsetAllMarks().run()} className={iconButton}>Clear Marks</button>
                <button onClick={() => editor.chain().focus().clearNodes().run()} className={iconButton}>Clear Nodes</button>

                <button onClick={() => editor.chain().focus().setParagraph().run()} className={buttonClass(editor.isActive('paragraph'))}>Paragraph</button>
                {([1, 2, 3, 4, 5, 6] as const).map(level => (
                    <button
                        key={level}
                        onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
                        className={buttonClass(editor.isActive('heading', { level }))}
                    >
                        H{level}
                    </button>
                ))}

                <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={buttonClass(editor.isActive('bulletList'))}>Bullet List</button>
                <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={buttonClass(editor.isActive('orderedList'))}>Ordered List</button>
                <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={buttonClass(editor.isActive('codeBlock'))}>Code Block</button>
                <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={buttonClass(editor.isActive('blockquote'))}>Blockquote</button>

                <button onClick={() => editor.chain().focus().setHorizontalRule().run()} className={iconButton}>Horizontal Rule</button>
                <button onClick={() => editor.chain().focus().setHardBreak().run()} className={iconButton}>Hard Break</button>

                <button onClick={() => editor.chain().focus().undo().run()} className={iconButton}>Undo</button>
                <button onClick={() => editor.chain().focus().redo().run()} className={iconButton}>Redo</button>

                <button
                    onClick={() => editor.chain().focus().setColor('#958DF1').run()}
                    className={buttonClass(editor.isActive('textStyle', { color: '#958DF1' }))}
                >
                    Purple
                </button>
            </div>
        </div>
    )
}

export default function TiptapEditor() {
    const editor = useEditor({
        extensions,
        content,
    })
    const { toggleModal } = useModalContext()



    // Handle form submission
    // This is where you would handle the submission of the editor content
    const handleSubmit = () => {
        if (editor) {
            const html = editor.getHTML()
            console.log("Submitted content:", html)
            // Send to server, save to DB, etc.

            toggleModal() // Close the modal after submission
        }
    }

    return (
        <div className="w-screen min-h-screen p-6 bg-gray-50 absolute top-0 left-0">
            <div className="max-w-screen-lg mx-auto">
                <MenuBar editor={editor} />
                <EditorContent editor={editor} className="editor" />
                <div className="mt-6">
                    <button
                        onClick={handleSubmit}
                        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition cursor-pointer"
                    >
                        Submit
                    </button>
                    <button
                        onClick={() => editor?.commands.setContent(content)}
                        className="ml-4 bg-gray-300 text-gray-800 px-4 py-2 cursor-pointer rounded hover:bg-gray-400 transition"
                    >
                        Reset
                    </button>

                    <button
                        className="ml-4 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition cursor-pointer"
                        onClick={() => toggleModal()}
                    // onClick={() => setIsModalOpen(false)}
                    >
                        cancel
                    </button>
                </div>
            </div>
        </div>
    )
}
