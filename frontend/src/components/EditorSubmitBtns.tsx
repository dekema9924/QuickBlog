


function EditorSubmitBtns({
    handleSubmit,
    setIsModalOpen,
}: {
    handleSubmit: () => void;
    setIsModalOpen: (isOpen: boolean) => void;
}) {
    return (
        <div className={` p-4 flex justify-end gap-4 sticky bottom-0   `}>

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
    )
}

export default EditorSubmitBtns