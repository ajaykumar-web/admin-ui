import React from "react";
import { render } from "@testing-library/react";
import UserTable from "../components/UserTable";

describe("UserTable", () => {
    it("should render the User table header with name.", () => {
        const { getByText } = render(<UserTable />);
        const tableHeader = getByText("Name");
        expect(tableHeader).toBeInTheDOM;
    });

    it("should render the User table header with email.", () => {
        const { getByText } = render(<UserTable />);
        const tableHeader = getByText("Email");
        expect(tableHeader).toBeInTheDOM;
    });

    it("should render the User table header with role.", () => {
        const { getByText } = render(<UserTable />);
        const tableHeader = getByText("Role");
        expect(tableHeader).toBeInTheDOM;
    });

    it("should render the User table header with actions.", () => {
        const { getByText } = render(<UserTable />);
        const tableHeader = getByText("Actions");
        expect(tableHeader).toBeInTheDOM;
    });

    const EditImage = () => (
        <img
            src="../../images/edit.png"
            alt="edit"
        />
    );

    it("admin has access to edit employee details", () => {
        const { getByAltText } = render(<EditImage />);

        expect(getByAltText("edit")).toBeTruthy();
    });
});
