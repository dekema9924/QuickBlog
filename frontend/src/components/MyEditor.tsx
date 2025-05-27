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
        let imageUrl = ''

        console.log('Submitting blog with image...')
        if (!editor?.getText().trim()) return toast.error('Please add some content to the blog.')

        const htmlContent = editor?.getHTML()

        try {
            // 1. Upload image to Cloudinary
            const formData = new FormData()

            if (coverImageFile) {
                formData.append('file', coverImageFile)
                formData.append('upload_preset', 'blog_uploads') // from Cloudinary settings

                const uploadRes = await axios.post(
                    'https://api.cloudinary.com/v1_1/dzhawgjow/image/upload',
                    formData
                )
                imageUrl = uploadRes.data.secure_url

            }




            // 2. Submit blog with image URL and HTML content
            await axios.post(
                `${APIURL.baseUrl}/blogs/addblog`,
                { content: htmlContent, coverImage: imageUrl || null },
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
        <>
            {/* <div
                className={`fixed bottom-0 left-0 right-0 z-50 w-full max-w-5xl mx-auto rounded-t-lg shadow-lg
          ${isDarkMode === 'dark' ? 'bg-black' : 'bg-white'}
          flex flex-col`}
                style={{
                    maxHeight: '90vh',
                    width: '95vw',
                    overscrollBehavior: 'contain',
                    WebkitOverflowScrolling: 'touch',
                }}
            > */}
            {/* Menu */}
            {editor && <MenuBar editor={editor} />}

            {/* Cover image input */}
            <div className="p-4 border-b">
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCoverImageFile(e.target.files?.[0] || null)}
                    className="pl-2"
                />
            </div>

            {/* Scrollable editor area */}
            <div className="flex-1 overflow-y-auto p-6">
                {editor && <EditorContent editor={editor} />}
            </div>

            {/* Button bar - always visible at bottom */}
            {!isEditMode && (
                <div
                    className={`p-4 border-t flex justify-end gap-4
                ${isDarkMode === 'dark' ? 'bg-black' : 'bg-white'}`}
                >
                    <EditorSubmitBtns
                        handleSubmit={handleSubmit}
                        setIsModalOpen={setIsModalOpen}
                    />
                </div>
            )}
            {/* </div> */}
        </>
    )

}
