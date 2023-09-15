import React, { useEffect, useState } from "react";
import "./AdminPanel.css";
import UserTable from "../components/UserTable";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import {
    Box,
    Typography,
    Button,
    Container,
    Paper,
} from "@mui/material";

/**
 * React component for the Admin Panel.
 * This component displays a list of users with options for searching, editing, and deleting users.
 */
const AdminPanel = () => {
    /**
     * State variables.
     */
    const [users, setUsers] = useState([]); // User data
    const [searchUser, setSearchUser] = useState(""); // Search input value
    const [currentPage, setCurrentPage] = useState(1); // Current page number
    const [selectedUsersOnPage, setSelectedUsersOnPage] = useState([]); // Selected users on the current page
    const [selectAllChecked, setSelectAllChecked] = useState(false); // Whether "Select All" checkbox is checked

    /**
     * useEffect to fetch user data when the component mounts.
     */
    useEffect(() => {
        /**
         * Function to fetch user data from an API.
         */
        const getUsersList = async () => {
            try {
                const userList = await fetch(
                    "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
                );
                const userListResponse = await userList.json();
                setUsers(userListResponse);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        getUsersList();
    }, []);

    /**
     * Event handler for search input change.
     * @param {Object} e - The event object representing the input change.
     */
    const handleSearchChange = (e) => {
        setSearchUser(e.target.value);
        setCurrentPage(1);
    };

    /**
     * Filter users based on the search input.
     */
    const filteredUsers = users.filter((user) => {
        return (
            user.name.toLowerCase().includes(searchUser.toLowerCase()) ||
            user.email.toLowerCase().includes(searchUser.toLowerCase()) ||
            user.role.toLowerCase().includes(searchUser.toLowerCase())
        );
    });

    /**
     * Event handler for deleting a user by their ID.
     * @param {number} userId - The ID of the user to be deleted.
     */
    const handleDeleteChange = (userId) => {
        const updatedUsers = users.filter((user) => user.id !== userId);
        setUsers(updatedUsers);
        localStorage.setItem("updatedUsers", JSON.stringify(updatedUsers));
    };

    /**
     * Event handler for changing an editable field for a user.
     * @param {number} userId - The ID of the user being edited.
     * @param {string} field - The field name to be edited.
     * @param {string} value - The new value for the field.
     */
    const handleEditFieldChange = (userId, field, value) => {
        const updatedUsers = users.map((user) => {
            if (user.id === userId) {
                return { ...user, [field]: value };
            } else {
                return user;
            }
        });
        setUsers(updatedUsers);
    };

    /**
     * Event handler for clicking the "Edit" button for a user.
     * @param {number} userId - The ID of the user being edited.
     */
    const handleEditClick = (userId) => {
        const updatedUsers = users.map((user) => {
            if (user.id === userId) {
                return { ...user, isEditing: true };
            } else {
                return user;
            }
        });
        setUsers(updatedUsers);
    };

    /**
     * Event handler for clicking the "Save" button for a user after editing.
     * @param {number} userId - The ID of the user being edited.
     */
    const handleSaveClick = (userId) => {
        const updatedUsers = users.map((user) => {
            if (user.id === userId) {
                return { ...user, isEditing: false };
            } else {
                return user;
            }
        });
        setUsers(updatedUsers);
        localStorage.setItem("updatedUsers", JSON.stringify(updatedUsers));
    };

    /**
     * Event handler for clicking the "Cancel" button for a user during editing.
     * @param {number} userId - The ID of the user being edited.
     */
    const handleCancelClick = (userId) => {
        const updatedUsers = users.map((user) => {
            if (user.id === userId) {
                return { ...user, isEditing: false };
            } else {
                return user;
            }
        });
        setUsers(updatedUsers);
    };

    /**
     * Event handler for checkbox change.
     * @param {Object} e - The event object representing the checkbox change.
     * @param {number} userId - The ID of the user associated with the checkbox.
     */
    const handleCheckboxChange = (e, userId) => {
        const { name, checked } = e.target;
        const updatedSelectedUsersOnPage = [...selectedUsersOnPage];

        if (name === "checkAll") {
            setSelectAllChecked(checked);

            if (checked) {
                const usersOnCurrentPage = users
                    .slice((currentPage - 1) * 10, currentPage * 10)
                    .map((user) => user.id);
                updatedSelectedUsersOnPage.push(...usersOnCurrentPage);
            } else {
                updatedSelectedUsersOnPage.length = 0;
            }
        } else {
            if (checked) {
                updatedSelectedUsersOnPage.push(userId);
            } else {
                const index = updatedSelectedUsersOnPage.indexOf(userId);
                if (index !== -1) {
                    updatedSelectedUsersOnPage.splice(index, 1);
                }
            }

            const usersOnCurrentPage = users
                .slice((currentPage - 1) * 10, currentPage * 10)
                .map((user) => user.id);

            setSelectAllChecked(
                updatedSelectedUsersOnPage.length === usersOnCurrentPage.length
            );
        }

        setSelectedUsersOnPage(updatedSelectedUsersOnPage);
    };

    /**
     * Event handler for deleting selected users.
     */
    const handleDeleteSelected = () => {
        if (selectedUsersOnPage.length === 0) {
            alert("No items selected for deletion.");
            return;
        }

        const updatedUsers = users.filter(
            (user) => !selectedUsersOnPage.includes(user.id)
        );
        setUsers(updatedUsers);
        localStorage.setItem("updatedUsers", JSON.stringify(updatedUsers));

        setSelectedUsersOnPage([]);
        setSelectAllChecked(false);
    };

    /**
     * Constants for pagination.
     */
    const itemsPerPage = 10;
    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const itemsToDisplay = filteredUsers.slice(firstItemIndex, lastItemIndex);
    const numberOfPages = Math.ceil(filteredUsers.length / itemsPerPage);

    /**
     * Event handler for changing the current page.
     * @param {number} pageNum - The page number to navigate to.
     */
    const handleCurrentPageChange = (pageNum) => {
        setCurrentPage(pageNum);
    };

    return (
        <Container>
            <Paper elevation={3} sx={{ padding: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Admin Panel
                </Typography>
                <SearchBar
                    searchUser={searchUser}
                    handleSearchChange={handleSearchChange}
                />
                <Box mt={2}>
                    <UserTable
                        users={itemsToDisplay}
                        selectedUsersOnPage={selectedUsersOnPage}
                        selectAllChecked={selectAllChecked}
                        handleCheckboxChange={handleCheckboxChange}
                        handleEditFieldChange={handleEditFieldChange}
                        handleEditClick={handleEditClick}
                        handleSaveClick={handleSaveClick}
                        handleCancelClick={handleCancelClick}
                        handleDeleteChange={handleDeleteChange}
                    />
                </Box>
                <Button
                    sx={{ mt: 2 }}
                    variant="contained"
                    onClick={handleDeleteSelected}
                    color="error"
                    disabled={selectedUsersOnPage.length === 0}
                >
                    Delete Selected
                </Button>
                <Box mt={2}>
                    <Pagination
                        currentPage={currentPage}
                        numberOfPages={numberOfPages}
                        handlePageChange={handleCurrentPageChange}
                    />
                </Box>
            </Paper>
        </Container>
    );
};

export default AdminPanel;
