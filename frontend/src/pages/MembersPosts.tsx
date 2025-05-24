
import { selectUserRole } from '../features/userSlice'
import { useSelector } from 'react-redux'
import Alert from '../components/Alert'

function MembersPosts() {
    const userRole = useSelector(selectUserRole)
    console.log(userRole)

    if (userRole === 'standard') {
        return <Alert />
    }

    return (
        <div>MembersPosts</div>
    )
}

export default MembersPosts