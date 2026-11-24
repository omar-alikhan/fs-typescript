interface Course { 
    name: string
    exerciseCount: number
}

interface ContentProps {
    courseParts: Course[]
}

const Content = ({courseParts}:ContentProps) => { 
    return(
        <div>
            {courseParts.map(part => (<p key={part.name}>{part.name} {part.exerciseCount}</p>) )}
        </div>
    )
}

export default Content;