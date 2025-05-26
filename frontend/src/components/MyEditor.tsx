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
import Image from '@tiptap/extension-image'
import { useState } from 'react'


//  Added type for props
interface MyEditorProps {
    content: string
    onChange?: (value: string) => void
    isEditMode?: boolean  // optional; defaults to false

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



//  Accept props
export default function MyEditor({ content, onChange, isEditMode = false }: MyEditorProps) {
    const [coverImageFile, setCoverImageFile] = useState<File | null>(null)
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


    //  Update editor content if `content` prop changes externally
    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content)
        }
    }, [content, editor])

    //submit blog with imabe

    const handleSubmit = async () => {
        if (!editor || !coverImageFile) return

        const htmlContent = editor.getHTML()

        try {
            // 1. Upload image to Cloudinary
            const formData = new FormData()
            formData.append('file', coverImageFile)
            formData.append('upload_preset', 'blog_uploads') // from Cloudinary settings

            const uploadRes = await axios.post(
                'https://api.cloudinary.com/v1_1/dzhawgjow/image/upload',
                formData
            )

            const imageUrl = uploadRes.data.secure_url

            // 2. Submit blog with image URL and HTML content
            await axios.post(
                `${APIURL.baseUrl}/blogs/addblog`,
                { content: htmlContent, coverImage: imageUrl },
                { withCredentials: true }
            ).then((res) => {
                console.log(res.data)
            })

            toast.success('Blog added')
            setIsModalOpen(false)
            navigate('/')
        } catch (error) {
            console.error('Error submitting blog:', error)
            toast.error('Failed to submit blog.')
        }
    }


    return (
        <div className="flex flex-col items-center h-[76vh] relative">
            {editor && <MenuBar editor={editor} />}
            {editor &&
                <>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setCoverImageFile(e.target.files?.[0] || null)}
                        className="mb-4"
                    />

                </>}
            {editor && <div className=' md:w-[60vw] w-full md:h-[40vh] '> <EditorContent editor={editor} /></div>}

            {/* Conditionally render buttons */}
            <div className={`pb-[80px]`}>
                {/* Your editor content here */}
                {!isEditMode && (
                    <div
                        className={`fixed bottom-0 left-0 right-0  p-4 flex justify-end md:relative  ${isDarkMode == 'dark' ? "!bg-black" : "!bg-white"
                            }`}
                    >
                        <EditorSubmitBtns handleSubmit={handleSubmit} setIsModalOpen={setIsModalOpen} />
                    </div>
                )}
            </div>



        </div>
    )
}
