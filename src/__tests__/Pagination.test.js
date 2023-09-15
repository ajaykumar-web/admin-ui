import React from "react";
import { render, screen } from "@testing-library/react";
import Pagination from "../components/Pagination";

describe("Pagination", () => {
    it("should render the correct number of pagination buttons", () => {
        const numberOfPages = 5;
        const props = {
            currentPage: 1,
            numberOfPages,
            handlePageChange: jest.fn(),
        };
        render(<Pagination {...props} />);
        const buttons = screen.getAllByRole("button");
        expect(buttons.length).toBe(numberOfPages + 4); // Two buttons for "first" and "last" pages
    });

    it("should call the `handlePageChange` function when a button is clicked", () => {
        const numberOfPages = 5;
        const props = {
            currentPage: 1,
            numberOfPages,
            handlePageChange: jest.fn(),
        };
        render(<Pagination {...props} />);
        const buttons = screen.getAllByRole("button");
        buttons[2].click();
        expect(props.handlePageChange).toBeCalledWith(1);
    });
});
