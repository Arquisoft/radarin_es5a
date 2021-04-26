import React from "react";
import { render, cleanup } from "react-testing-library";
import { HashRouter as Router } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { WelcomeComponent } from "./welcome.container";

library.add(fas);

const props = {
	webId: "https://exmaple.com/#me",
	image: "test.png",
	updatePhoto: "updated.png",
	name: "example"
};

describe.only("Welcome", () => {
	afterAll(cleanup);
	const { container, getByTestId } = render(
		<Router>
			<WelcomeComponent {...{ ...props }} />
		</Router>
	);

	test("renders without crashing", () => {
		expect(container).toBeTruthy();
	});

	test("renders with styled components", () => {
		expect(getByTestId("welcome-wrapper")).toBeTruthy();
		expect(document.querySelector(".card")).toBeTruthy();
	});
});