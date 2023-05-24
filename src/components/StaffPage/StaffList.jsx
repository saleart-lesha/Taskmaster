import React, { useState } from "react";

const StaffList = () => {
    const [staff, setStaff] = useState([
        {
            id: "1",
            name: "John Smith",
            position: "Software Developer",
            taskCount: 8
        },
        {
            id: "2",
            name: "Emily Johnson",
            position: "UI Designer",
            taskCount: 5
        },
        {
            id: "3",
            name: "Peter Parker",
            position: "Frontend Developer",
            taskCount: 10
        }
    ]);

    const [newStaffName, setNewStaffName] = useState("");
    const [newStaffPosition, setNewStaffPosition] = useState("");

    const handleAddStaff = () => {
        if (newStaffName && newStaffPosition) {
            // Generate unique ID for new staff member
            const id = Date.now().toString();

            // Create new staff object
            const newStaff = {
                id,
                name: newStaffName,
                position: newStaffPosition,
                taskCount: 0
            };

            // Add new staff to the list
            setStaff([...staff, newStaff]);

            // Reset input fields
            setNewStaffName("");
            setNewStaffPosition("");
        } else {
            alert("Please enter both name and position.");
        }
    };

    const handleDeleteStaff = (id) => {
        const updatedStaff = staff.filter((member) => member.id !== id);
        setStaff(updatedStaff);
    };

    return (
        <div>
            <h1>Staff List Component</h1>
            <ul>
                {staff.map((member) => (
                    <li key={member.id}>
                        {member.name} - {member.position} - {member.taskCount} tasks
                        <button onClick={() => handleDeleteStaff(member.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <div>
                <h2>Add New Staff Member</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={newStaffName}
                    onChange={(e) => setNewStaffName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Position"
                    value={newStaffPosition}
                    onChange={(e) => setNewStaffPosition(e.target.value)}
                />
                <button onClick={handleAddStaff}>Add New Staff Member</button>
            </div>
        </div>
    );
};

export default StaffList;