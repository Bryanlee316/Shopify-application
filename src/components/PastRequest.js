import React from "react";
import "./Jarvis.css";

export default function PastRequest({ pastrequest }) {
	return (
		<div
			data-augmented-ui="
  tl-2-clip-x tr-clip br-2-clip-x bl-clip-y border
"
			className="styleme past-prompt"
			style={{ width: "700px", padding: "30px", margin: "20px" }}
		>
			<h1>Prompt: {pastrequest.request}</h1>
			<h2>Jarvis's Response: {pastrequest.response}</h2>
		</div>
	);
}
