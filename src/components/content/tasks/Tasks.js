import React, { useState } from 'react'
import TopControll from '../../commonComponents/TopControll'
import NewTask from './NewTask'


const Tasks = ({ projectId }) => {
    const [newTaskMenuOpen, setNewTaskMenuOpen] = useState(false)
    const handleToggleMenuOpen = () => {
        setNewTaskMenuOpen(prev => !prev)
    }

    return (
        <>
            <TopControll createNewText='New Task' listText='Tasks' open={newTaskMenuOpen} toggleOpen={handleToggleMenuOpen} />

            <NewTask projectId={projectId} open={newTaskMenuOpen} />


            <h1>TASK</h1>
            <h1>TASK</h1>
            <h1>TASK</h1>
            <h1>TASK</h1>
            <h1>TASK</h1>


        </>

    )
}

export default Tasks