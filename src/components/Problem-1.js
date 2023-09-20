import React, { useState } from 'react';

const Problem1 = () => {
    // Define an initialUsers array with an empty name and status.
    const initialUsers = [
        { name: "", status: "" },
    ];

    // Initialize state variables using the useState hook.
    const [users, setUsers] = useState(initialUsers); // Store user data.
    const [show, setShow] = useState('all'); // Store which users to show.
    const [name, setName] = useState(''); // Store user input for name.
    const [status, setStatus] = useState('active'); // Store user input for status.

    // Handle form submission to add a new user.
    const handleUsers = (e) => {
        e.preventDefault();
        if (name.trim() === '') {
            alert('Please enter a name.');
            return;
        }
        // Add a new user to the users array.
        setUsers([...users, { name, status }]);
        setName(''); // Clear the name input.
    };

    // Handle clicks on the navigation buttons (All, Active, Completed).
    const handleClick = (val) => {
        setShow(val); // Update the 'show' state to filter users.
    };

    // Handle changes in the status dropdown.
    const handleChangeStatus = (e) => {
        setStatus(e.target.value); // Update the 'status' state.
    };

    // Filter users based on the 'show' state.
    const filteredUsers = show === 'all' ? users : users.filter(user => user.status === show);

    // Render the user interface.
    return (
        <div className="container" style={{display: "flex", justifyContent: "center"}}>
            <div className="row justify-content-center mt-5 problem-1">
                <h4 className='text-center text-uppercase mb-5'>Problem-1</h4>
                <div className="col-6">
                    {/* User input form */}
                    <form onSubmit={handleUsers} className="row gy-2 gx-3 align-items-center mb-4">
                        <div className="col-auto">
                            <input type="text" name='name' className="form-control" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="col-auto select-wrapper">
                            <select name="status" className="form-select select" value={status} onChange={handleChangeStatus}>
                                <option value="active">Active</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
                <div className="col-8">
                    {/* Navigation buttons */}
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'all' ? 'active' : ''}`} type="button" onClick={() => handleClick('all')}>All</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'active' ? 'active' : ''}`} type="button" onClick={() => handleClick('active')}>Active</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'completed' ? 'active' : ''}`} type="button" onClick={() => handleClick('completed')}>Completed</button>
                        </li>
                    </ul>
                    {/* User list table */}
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredUsers.map((user, i) => (
                            <tr key={i}>
                                <td scope="col">{user.name}</td>
                                <td scope="col">{user.status}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Problem1;