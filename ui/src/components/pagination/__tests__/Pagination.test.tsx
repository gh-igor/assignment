import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import Pagination from "../Pagination";

describe("renders Pagination", () => {

    test("first page", () => {
        const testProps = {
            currentPage: 1,
            itemsPerPageMax: 10,
            itemsLength: 10,
            onPreviousClick: jest.fn(),
            onNextClick: jest.fn(),
        };

        render(<Pagination {...testProps} />);

        const prevBtn = screen.queryByText(/previous/);
        expect(prevBtn).toBeNull();

        const nextBtn = screen.queryByText(/next/);
        expect(nextBtn).toBeInTheDocument();

        const pageNumber = screen.queryByText("-= 1 =-");
        expect(pageNumber).toBeInTheDocument();
    });

    test("next page", () => {
        const testProps = {
            currentPage: 2,
            itemsPerPageMax: 10,
            itemsLength: 10,
            onPreviousClick: jest.fn(),
            onNextClick: jest.fn(),
        };

        render(<Pagination {...testProps} />);

        const prevBtn = screen.queryByText(/previous/);
        expect(prevBtn).toBeInTheDocument();

        const nextBtn = screen.queryByText(/next/);
        expect(nextBtn).toBeInTheDocument();

        const pageNumber = screen.queryByText("-= 2 =-");
        expect(pageNumber).toBeInTheDocument();
    });

    test("last page", () => {
        const testProps = {
            currentPage: 3,
            itemsPerPageMax: 10,
            itemsLength: 9,
            onPreviousClick: jest.fn(),
            onNextClick: jest.fn(),
        };

        render(<Pagination {...testProps} />);

        const prevBtn = screen.queryByText(/previous/);
        expect(prevBtn).toBeInTheDocument();

        const nextBtn = screen.queryByText(/next/);
        expect(nextBtn).toBeNull();

        const pageNumber = screen.queryByText("-= 3 =-");
        expect(pageNumber).toBeInTheDocument();
    });

    test("matches snapshot", () => {
        const testProps = {
            currentPage: 3,
            itemsPerPageMax: 10,
            itemsLength: 9,
            onPreviousClick: jest.fn(),
            onNextClick: jest.fn(),
        };

        const tree = renderer.create(<Pagination {...testProps} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test("btn clickable", () => {
        const testProps = {
            currentPage: 2,
            itemsPerPageMax: 10,
            itemsLength: 10,
            onPreviousClick: jest.fn(),
            onNextClick: jest.fn(),
        };

        render(<Pagination {...testProps} />);

        fireEvent.click(screen.getByText(/next/i));
        fireEvent.click(screen.getByText(/previous/i));

        expect(testProps.onNextClick).toHaveBeenCalled();
        expect(testProps.onPreviousClick).toHaveBeenCalled();
    });
});
