import React, { useState, useRef } from "react";
import "./Jarvis.css";

function Dropdown({ setBot }) {
	const selectionRef = useRef("text-davinci-002");

	const handleChange = (event) => {
		setBot(selectionRef.current.value);
	};

	return (
		<div className="dropdown">
			<form>
				<label>
					<select ref={selectionRef} onChange={handleChange}>
						{" "}
						<option value="text-davinci-002">
							text-davinci-002
						</option>
						<option value="text-curie-001">text-curie-001</option>
						<option value="text-babbage-001">
							text-babbage-001
						</option>
						<option value="text-davinci-001">
							text-davinci-001
						</option>
						<option value="text-ada-001">text-ada-001</option>
					</select>
				</label>
			</form>
		</div>
	);
}

export default Dropdown;
