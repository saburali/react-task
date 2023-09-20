import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal'; // Import the Modal component
import { debounce } from 'lodash';

const Problem2 = () => {
    // State variables
    const [contacts, setContacts] = useState([]); // Store contact data
    const [selectedContacts, setSelectedContacts] = useState([]); // Store filtered contacts
    const [showModal, setShowModal] = useState(false); // Control modal visibility
    const [searchTerm, setSearchTerm] = useState(''); // Store search term
    const [modalType, setModalType] = useState(null); // Store modal type
    const [isLoading, setIsLoading] = useState(true); // Loading indicator
    const [showOnlyEven, setShowOnlyEven] = useState(false); // Checkbox for even IDs

    // useEffect to fetch contacts data from an API
    useEffect(() => {
        axios.get("https://contact.mediusware.com/api/contacts/")
            .then(res => {
                setContacts(res.data.results);
                setIsLoading(false); // Turn off loading indicator
            })
            .catch(error => {
                console.error('Error fetching contacts:', error);
                setIsLoading(false); // Turn off loading indicator in case of error
            });
    }, []);

    // useEffect to filter contacts when showOnlyEven or searchTerm changes
    useEffect(() => {
        filterContacts();
    }, [showOnlyEven, searchTerm, contacts]);

    // Function to display all contacts
    const showAllContacts = () => {
        setModalType('all');
        setSelectedContacts(contacts);
        setShowModal(true);
        window.history.pushState({}, null, "/all");
    };

    // Function to display US contacts
    const showUsContacts = () => {
        setModalType('us');
        setSelectedContacts(contacts.filter(contact => contact.country.name === "United States"));
        setShowModal(true);
        window.history.pushState({}, null, "/us");
    };

    // Function to close the modal
    const closeModal = () => {
        setShowModal(false);
        window.history.pushState({}, null, "/");
    };

    // Debounced search handler
    const handleSearch = debounce((value) => {
        setSearchTerm(value);
    }, 300);

    // Function to filter contacts based on various criteria
    const filterContacts = () => {
        let filteredContacts = contacts;

        if (modalType === 'us') {
            filteredContacts = filteredContacts.filter(contact => contact.country.name === "United States");
        }

        if (showOnlyEven) {
            filteredContacts = filteredContacts.filter(contact => contact.id % 2 === 0);
        }

        if (searchTerm) {
            filteredContacts = filteredContacts.filter(contact =>
                contact.phone.includes(searchTerm) || contact.country.name.includes(searchTerm)
            );
        }

        setSelectedContacts(filteredContacts);
    };

    // Function to clear the search term
    const handleClearSearch = () => {
        setSearchTerm('');
    };

    // Function to toggle the 'Only even' checkbox
    const handleToggleEven = () => {
        setShowOnlyEven(!showOnlyEven);
    };

    // Render the component
    return (
        <div className="container" style={{display: "flex", justifyContent: "center"}}>
            <div className="row justify-content-center mt-5 problem-1">
                <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

                {/* Buttons for filtering contacts */}
                <div className="d-flex justify-content-center gap-3">
                    <button
                        className="btn btn-lg btn-outline-primary"
                        type="button"
                        onClick={showAllContacts}
                    >
                        All Contacts
                    </button>
                    <button
                        className="btn btn-lg btn-outline-warning"
                        type="button"
                        onClick={showUsContacts}
                    >
                        US Contacts
                    </button>
                </div>

                {/* Search input and clear button */}
                <div className="form-group search-box mt-4" style={{position: "relative"}}>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search contacts..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            handleSearch(e.target.value);
                        }}
                    />
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={handleClearSearch}
                    >
                        Clear
                    </button>
                </div>

                {/* Checkbox for 'Only even' */}
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="onlyEvenCheckbox"
                        checked={showOnlyEven}
                        onChange={handleToggleEven}
                    />
                    <label className="form-check-label" htmlFor="onlyEvenCheckbox">
                        Only even
                    </label>
                </div>

                {/* Loading indicator and modal */}
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    showModal && (
                        <Modal closeModal={closeModal}>
                            <table>
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Phone</th>
                                    <th>Country</th>
                                </tr>
                                </thead>
                                <tbody>
                                {selectedContacts.map(contact => (
                                    <tr key={contact.id}>
                                        <td>{contact.id}</td>
                                        <td>{contact.phone}</td>
                                        <td>{contact.country.name}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </Modal>
                    )
                )}
            </div>
        </div>
    );
};

export default Problem2;