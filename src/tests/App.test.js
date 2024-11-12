import App from "../App";

import React from "react";

import { fireEvent, screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../utils/testUtil";
import json from "../../sample-data.json";
import { fetchCompanyInfoSuccess } from "../redux/companyInfoSlice";


//Header Component
test("company name is rendered", async () => {
  const container = renderWithProviders(<App />);
  container.store.dispatch(fetchCompanyInfoSuccess(json));
  expect(await screen.findByText(/Anderson - Koss/i)).toBeInTheDocument();
});

test("company motto is rendered", async () => {
  const container = renderWithProviders(<App />);
  container.store.dispatch(fetchCompanyInfoSuccess(json));
  expect(
    await screen.findByText(/vertical leverage synergies/i)
  ).toBeInTheDocument();
});

test("companyEst is rendered", async () => {
  const container = renderWithProviders(<App />);
  container.store.dispatch(fetchCompanyInfoSuccess(json));
  expect(
    await screen.findByText(/2023-04-30T08:43:46.890Z/i)
  ).toBeInTheDocument();
});

// Employee Summary
test("an empoyee from list is rendered", async () => {
  const container = renderWithProviders(<App />);
  container.store.dispatch(fetchCompanyInfoSuccess(json));
  expect(
    await screen.findByText(/38a12e96-9806-424a-b5f8-8fa61c7d1e6c/i)
  ).toBeInTheDocument();
  expect(await screen.findByText(/Poppy Edwards/i)).toBeInTheDocument();
  expect(await screen.findByText(/0454 012 242/i)).toBeInTheDocument();
  expect(
    await screen.findByText(/Ruby Run Lake Annabellestad, New South Wales/i)
  ).toBeInTheDocument();
});

// Employee Details

test("Modal with employee details is rendered", async () => {
  const container = renderWithProviders(<App />);
  container.store.dispatch(fetchCompanyInfoSuccess(json));
  const rowToClick = await screen.findByText(/Poppy/i);
  fireEvent.click(rowToClick);
  expect(
    screen.getByText(/Senior Applications Administrator/i)
  ).toBeInTheDocument();
  expect(screen.getByText(/27/i)).toBeInTheDocument();
  expect(screen.getByText(/2023-10-28T09:07:43.325Z/i)).toBeInTheDocument();
  expect(document.querySelector(".employee-name")).toHaveTextContent(
    "Poppy Edwards"
  );
  expect(
    screen.getByText(
      /Voluptas minus et repellat similique ex. Earum dolores dolore sint modi. Iste aliquid et. Neque asperiores aut rem voluptate./i
    )
  ).toBeInTheDocument();
});

test("Modal closes on clicking close button", async () => {
  const container = renderWithProviders(<App />);
  container.store.dispatch(fetchCompanyInfoSuccess(json));
  const rowToClick = await screen.findByText(/Poppy/i);
  fireEvent.click(rowToClick);
  const dialogContent = screen.getByText("Senior Applications Administrator");
  const closeButton = screen.getByRole("button", { name: /close/i });
  fireEvent.click(closeButton);
  await waitFor(() => {
    expect(document.querySelector(".p-dialog")).not.toBeInTheDocument();
  });
});


