import useLogOut from "../hooks/useLogout"

const LogOutButton = () => {
    const logout = useLogOut()
    return (
        <button className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 cursor-pointer" onClick={logout}>
            Log Out
        </button>
    )
}

export default LogOutButton