import React from "react";
import SearchBar from "../components/SearchBar";
import { render } from "@testing-library/react";

describe("SearchBar", () => {
    it("should render the search input field with the correct placeholder text", () => {
        const { getByPlaceholderText } = render(<SearchBar />);
        const searchInput = getByPlaceholderText("Search by name, email, or role...");
        expect(searchInput).toBeInTheDOM;
    });
});
