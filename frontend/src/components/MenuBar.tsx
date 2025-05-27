import { Editor } from '@tiptap/react'
import { useThemeContext } from '../context/ThemeContext'

const MenuBar = ({ editor }: { editor: Editor }) => {
    const { isDarkMode } = useThemeContext()

    if (!editor) return null

    return (
        <div className={`control-group  py-4 mb-10 md:w-full ${isDarkMode === 'light' ? 'bg-white text-black' : 'bg-[#121212]'}`}>
            <div className={`button-group flex flex-wrap gap-4 md:w-9/12 m-auto justify-center md:justify-start ${isDarkMode === 'light' ? 'lightBorder' : ''}`}>
                {[

                    { label: 'Bold', command: () => editor.chain().focus().toggleBold().run(), isActive: editor.isActive('bold') },
                    { label: 'Italic', command: () => editor.chain().focus().toggleItalic().run(), isActive: editor.isActive('italic') },
                    { label: 'Strike', command: () => editor.chain().focus().toggleStrike().run(), isActive: editor.isActive('strike') },
                    { label: 'Code', command: () => editor.chain().focus().toggleCode().run(), isActive: editor.isActive('code') },
                    { label: 'Clear marks', command: () => editor.chain().focus().unsetAllMarks().run(), isActive: false },
                    { label: 'Clear nodes', command: () => editor.chain().focus().clearNodes().run(), isActive: false },
                    { label: 'Paragraph', command: () => editor.chain().focus().setParagraph().run(), isActive: editor.isActive('paragraph') },
                    ...[1, 2, 3, 4, 5, 6].map(level => ({
                        label: `H${level}`,
                        command: () => editor.chain().focus().toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 }).run(),
                        isActive: editor.isActive('heading', { level }),
                    })),
                    { label: 'Bullet List', command: () => editor.chain().focus().toggleBulletList().run(), isActive: editor.isActive('bulletList') },
                    { label: 'Ordered List', command: () => editor.chain().focus().toggleOrderedList().run(), isActive: editor.isActive('orderedList') },
                    { label: 'Code Block', command: () => editor.chain().focus().toggleCodeBlock().run(), isActive: editor.isActive('codeBlock') },
                    { label: 'Blockquote', command: () => editor.chain().focus().toggleBlockquote().run(), isActive: editor.isActive('blockquote') },
                    { label: 'Horizontal Rule', command: () => editor.chain().focus().setHorizontalRule().run(), isActive: false },
                    { label: 'Hard Break', command: () => editor.chain().focus().setHardBreak().run(), isActive: false },
                    { label: 'Undo', command: () => editor.chain().focus().undo().run(), isActive: false, disabled: !editor.can().chain().focus().undo().run() },
                    { label: 'Redo', command: () => editor.chain().focus().redo().run(), isActive: false, disabled: !editor.can().chain().focus().redo().run() },
                    { label: 'Purple', command: () => editor.chain().focus().setColor('#958DF1').run(), isActive: editor.isActive('textStyle', { color: '#958DF1' }) },
                ].map(({ label, command, isActive, disabled = false }, index) => (
                    <button
                        key={index}
                        onClick={command}
                        disabled={disabled}
                        className={`px-3 py-1 rounded transition border text-sm
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${isActive
                                ? isDarkMode === 'dark'
                                    ? 'bg-white text-black font-bold  '
                                    : 'bg-black text-white font-bold '
                                : isDarkMode === 'dark'
                                    ? 'bg-black text-white font-bold'
                                    : ''}
      `}
                    >
                        {label}
                    </button>

                ))}


            </div>

        </div>
    )
}

export default MenuBar
