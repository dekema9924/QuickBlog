
import MyEditor from "../components/MyEditor"
function AddPost() {
    return (
        <div className="flex flex-col items-center justify-center mt-20">
            <h1 className="text-3xl font-bold mb-4">Add a New Post</h1>
            <MyEditor />
        </div>
    )
}

export default AddPost