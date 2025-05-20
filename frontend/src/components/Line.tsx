interface LineProps {
    className?: string;
}


const Line = (props: LineProps) => {

    return (
        <>
            <hr className={`w-4/12 border-[#a4acad] ${props.className}`} />

        </>
    )
}

export default Line;