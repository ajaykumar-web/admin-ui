import React from "react";
import "./UserTable.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  TextField,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

/**
 * Represents a row in the user table.
 *
 * @param {Object} props - The props for the UserRow component.
 * @param {Object} props.user - The user object to display in the row.
 * @param {boolean} props.selected - Indicates if the user is selected.
 * @param {Function} props.handleCheckboxChange - Callback function for checkbox change.
 * @param {Function} props.handleEditFieldChange - Callback function for editing fields.
 * @param {Function} props.handleEditClick - Callback function for clicking the edit button.
 * @param {Function} props.handleSaveClick - Callback function for clicking the save button.
 * @param {Function} props.handleCancelClick - Callback function for clicking the cancel button.
 * @param {Function} props.handleDeleteChange - Callback function for clicking the delete button.
 */
const UserRow = ({
  user,
  selected,
  handleCheckboxChange,
  handleEditFieldChange,
  handleEditClick,
  handleSaveClick,
  handleCancelClick,
  handleDeleteChange,
}) => {
  return (
    <TableRow>
      <TableCell>
        <Checkbox
          onChange={() => handleCheckboxChange(user.id)}
          checked={selected}
        />
      </TableCell>
      <TableCell>
        {user.isEditing ? (
          <TextField
            label="Edit name"
            variant="outlined"
            value={user.name}
            onChange={(e) =>
              handleEditFieldChange(user.id, "name", e.target.value)
            }
          />
        ) : (
          <span>{user.name}</span>
        )}
      </TableCell>
      <TableCell>
        {user.isEditing ? (
          <TextField
            label="Edit email"
            variant="outlined"
            value={user.email}
            onChange={(e) =>
              handleEditFieldChange(user.id, "email", e.target.value)
            }
          />
        ) : (
          <span>{user.email}</span>
        )}
      </TableCell>
      <TableCell>
        {user.isEditing ? (
          <TextField
            label="Edit role"
            variant="outlined"
            value={user.role}
            onChange={(e) =>
              handleEditFieldChange(user.id, "role", e.target.value)
            }
          />
        ) : (
          <span>{user.role}</span>
        )}
      </TableCell>
      <TableCell>
        {user.isEditing ? (
          <>
            <Button
              sx={{ m: 1 }}
              variant="contained"
              color="primary"
              startIcon={<CheckIcon />}
              onClick={() => handleSaveClick(user.id)}
            >
              Save
            </Button>
            <Button
              sx={{ m: 1 }}
              variant="contained"
              color="error"
              startIcon={<ClearIcon />}
              onClick={() => handleCancelClick(user.id)}
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button
              sx={{ m: 1 }}
              variant="contained"
              color="primary"
              startIcon={<EditIcon />}
              onClick={() => handleEditClick(user.id)}
            >
              Edit
            </Button>
            <Button
              sx={{ m: 1 }}
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => handleDeleteChange(user.id)}
            >
              Delete
            </Button>
          </>
        )}
      </TableCell>
    </TableRow>
  );
};

/**
 * Represents a table of users with various actions.
 *
 * @param {Object} props - The props for the UserTable component.
 * @param {Object[]} props.users - An array of user objects to display in the table.
 * @param {number[]} props.selectedUsersOnPage - An array of selected user IDs on the current page.
 * @param {boolean} props.selectAllChecked - A boolean indicating whether the "Select All" checkbox is checked.
 * @param {Function} props.handleCheckboxChange - Callback function for handling checkbox changes.
 * @param {Function} props.handleEditFieldChange - Callback function for handling user field edits.
 * @param {Function} props.handleEditClick - Callback function for clicking the "Edit" button.
 * @param {Function} props.handleSaveClick - Callback function for clicking the "Save" button.
 * @param {Function} props.handleCancelClick - Callback function for clicking the "Cancel" button.
 * @param {Function} props.handleDeleteChange - Callback function for clicking the "Delete" button.
 */
const UserTable = ({
  users,
  selectedUsersOnPage,
  selectAllChecked,
  handleCheckboxChange,
  handleEditFieldChange,
  handleEditClick,
  handleSaveClick,
  handleCancelClick,
  handleDeleteChange,
}) => {
  users = users || [];
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Checkbox
                onChange={() => handleCheckboxChange("checkAll")}
                checked={selectAllChecked}
              />
            </TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              selected={selectedUsersOnPage.includes(user.id)}
              handleCheckboxChange={handleCheckboxChange}
              handleEditFieldChange={handleEditFieldChange}
              handleEditClick={handleEditClick}
              handleSaveClick={handleSaveClick}
              handleCancelClick={handleCancelClick}
              handleDeleteChange={handleDeleteChange}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
