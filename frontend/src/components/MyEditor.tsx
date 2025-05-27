// MyEditor.tsx
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
import { useEffect, useState } from 'react'
import EditorSubmitBtns from './EditorSubmitBtns'
import Image from '@tiptap/extension-image'

// Props interface
interface MyEditorProps {
    content: string
    onChange?: (value: string) => void
    isEditMode?: boolean
    setCoverImageFile?: (file: File | null) => void
}

const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({}),
    StarterKit.configure({
        bulletList: { keepMarks: true, keepAttributes: false },
        orderedList: { keepMarks: true, keepAttributes: false },
    }),
    Image.configure({
        inline: false,
        allowBase64: true,
    }),
]

export default function MyEditor({
    content,
    onChange,
    isEditMode = false,
    setCoverImageFile,
}: MyEditorProps) {
    const [coverImageFile, setLocalCoverImageFile] = useState<File | null>(null)
    const { isDarkMode } = useThemeContext()
    const { setIsModalOpen } = useModalContext()
    const navigate = useNavigate()

    const editor = useEditor({
        extensions,
        content,
        onUpdate: ({ editor }) => {
            const html = editor.getHTML()
            onChange?.(html)
        },
        editorProps: {
            attributes: {
                class: isDarkMode === 'dark' ? 'tiptap dark' : 'tiptap light',
            },
        },
    })

    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content)
        }
    }, [content, editor])

    const handleSubmit = async () => {
        let imageUrl = ''

        if (!editor?.getText().trim()) {
            return toast.error('Please add some content to the blog.')
        }

        const htmlContent = editor.getHTML()

        try {
            const formData = new FormData()
            if (coverImageFile) {
                formData.append('file', coverImageFile)
                formData.append('upload_preset', 'blog_uploads')

                const uploadRes = await axios.post(
                    'https://api.cloudinary.com/v1_1/dzhawgjow/image/upload',
                    formData
                )
                imageUrl = uploadRes.data.secure_url
            }

            await axios.post(
                `${APIURL.baseUrl}/blogs/addblog`,
                { content: htmlContent, coverImage: imageUrl || null },
                { withCredentials: true }
            )

            toast.success('Blog added')
            setIsModalOpen(false)
            navigate('/')
        } catch (error) {
            console.error('Error submitting blog:', error)
            toast.error('Failed to submit blog.')
        }
    }

    return (
        <>
            {editor && <MenuBar editor={editor} />}
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Cover Image</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                            const file = e.target.files[0]
                            setLocalCoverImageFile(file)
                            setCoverImageFile?.(file)
                        }
                    }}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0 file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
            </div>
            <div className="flex-1 overflow-y-auto p-6">
                {editor && <EditorContent editor={editor} />}
            </div>
            {!isEditMode && (
                <div className={`p-4 border-t flex justify-end gap-4 ${isDarkMode === 'dark' ? 'bg-black' : 'bg-white'}`}>
                    <EditorSubmitBtns handleSubmit={handleSubmit} setIsModalOpen={setIsModalOpen} />
                </div>
            )}
        </>
    )
}
