import { render, screen } from "@testing-library/react";
import List from "../List";

test("render List", () => {
  const wrapper = render(
    <List
      FarmData={[
        { location: "Item 1", datetime: Date.now() },
        { location: "Item 2", datetime: Date.now() },
      ]}
    />
  );

  expect(wrapper.findByTitle("table"));
});
