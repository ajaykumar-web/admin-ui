import React from "react";
import { render } from "@testing-library/react";
import AdminPanel from "../components/AdminPanel";
import fetch from 'node-fetch';
global.fetch = fetch;
describe("AdminPanel", () => {
    it("should render the Admin Panel header", () => {
        const { getByText } = render(<AdminPanel />);
        const header = getByText("Admin Panel");
        expect(header).toBeInTheDOM;
    });

    it("should render the Admin Panel Delete Button", () => {
        const { getByText } = render(<AdminPanel />);
        const header = getByText("Delete Selected");
        expect(header).toBeInTheDOM;
    });

    it("admin has access to delete mupliple employees", () => {
        const { getByText } = render(<AdminPanel />);
        const header = getByText("Delete Selected");
        expect(header).toBeInTheDOM;
    });
});
