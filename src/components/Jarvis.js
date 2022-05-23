import React, { useRef, useState, useEffect } from "react";
import PastRequestsList from "./PastRequestsList";
import { v4 as uuidv4 } from "uuid";
import fetchResponse from "./Jarvislogic";
import jarvis from "../assets/Jarvis.mp4";
import jarvisVoice from "../assets/JarvisVoice.mp3";
import IronMan from "./IronMan";
import "./Jarvis.css";
import JumpingDots from "./JumpingDots";
import Dropdown from "./Dropdown";

const LOCAL_STORAGE_KEY = "JarvisApp.app";
const LOCAL_REQUEST = "Request.current";
const LOCAL_RESPONSE = "Response.current";

function Jarvis() {
	//const [userInput, setuserInput] = useState("");
	const requestRef = useRef();
	const [pastRequests, setPastRequests] = useState([]);
	const [request, setRequest] = useState("");
	const [complete, setComplete] = useState(true);
	const [showBox, setShowBox] = useState(false);
	const [response, setResponse] = useState("");
	const [bot, setBot] = useState("text-davinci-002");

	useEffect(() => {
		const storedRequests = JSON.parse(
			window.localStorage.getItem(LOCAL_STORAGE_KEY)
		);
		if (storedRequests !== null) {
			if (storedRequests.length !== 0) setPastRequests(storedRequests);
		}
		const storedCurrentRequest = JSON.parse(
			window.localStorage.getItem(LOCAL_REQUEST)
		);
		if (storedCurrentRequest !== null) {
			if (storedCurrentRequest.length !== 0)
				setRequest(storedCurrentRequest);
		}
		const storedResponse = JSON.parse(
			window.localStorage.getItem(LOCAL_RESPONSE)
		);
		if (storedResponse !== null) {
			if (storedResponse.length !== 0) {
				setShowBox(true);
				setResponse(storedResponse);
			}
		}
	}, []);

	useEffect(() => {
		window.localStorage.setItem(
			LOCAL_STORAGE_KEY,
			JSON.stringify(pastRequests)
		);
		window.localStorage.setItem(LOCAL_REQUEST, JSON.stringify(request));
		window.localStorage.setItem(LOCAL_RESPONSE, JSON.stringify(response));
	}, [pastRequests, request, response]);

	async function getResponse() {
		setRequest(requestRef.current.value);
		console.log(requestRef.current.value);
		setComplete(false);
		setShowBox(true);
		setResponse(await fetchResponse(requestRef.current.value, bot));
		setComplete(true);
		requestRef.current.value = null;
		console.log(bot);
		console.log("Response is changed", response);
	}

	async function handleSubmit(e) {
		e.preventDefault();
		setPastRequests((prevRequests) => {
			console.log("Previous request is being logged");
			return [
				{
					id: uuidv4(),
					request: request,
					response: response,
				},
				...prevRequests,
			];
		});
		await getResponse();
	}

	// if (complete == true) {
	// 	return <Dropdown setBot={setBot} />;
	// }

	return (
		<div
			style={{
				BackgroundColor: "black",
				display: "flex",
				justifyContent: "center",
				flexDirection: "Column",
				alignItems: "center",
			}}
		>
			<h1> Hello, my name is Jarvis, how may I assist you today?</h1>

			<div
				data-augmented-ui="all-hexangle-up border"
				className="reticle"
			></div>
			<div
				data-augmented-ui="all-hexangle-up border"
				className="reticle2"
			></div>
			<div
				data-augmented-ui="all-hexangle-up border"
				className="reticle3"
			></div>
			<Dropdown setBot={setBot} />
			<video width="500" autoPlay="autoPlay" loop controls muted>
				<source src={jarvis} type="video/mp4" />
			</video>

			<audio autoPlay="autoPlay">
				<source src={jarvisVoice} />
			</audio>

			<IronMan />

			<form className="form">
				<input
					data-augmented-ui="
                    tl-clip tr-clip br-clip bl-clip border
                  "
					className="styleme past-prompt"
					placeholder="Enter your prompt here"
					type="text"
					ref={requestRef}
					autoFocus
				/>

				<button
					input
					data-augmented-ui="
                    tl-clip tr-clip br-clip bl-clip border
                  "
					onClick={handleSubmit}
				>
					Submit
				</button>
			</form>
			{showBox === true ? (
				<div
					data-augmented-ui="
  tl-2-clip-x tr-clip br-2-clip-x bl-clip-y border
"
					className="styleme current-prompt"
					style={{
						width: "700px",
						padding: "30px",
						margin: "20px",
					}}
				>
					<h1 className="blue"> {request} </h1>
					{complete === false ? (
						<JumpingDots />
					) : (
						<h2 className="blue"> {response} </h2>
					)}
				</div>
			) : (
				<div></div>
			)}
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<PastRequestsList PastRequests={pastRequests} />
			</div>
		</div>
	);
}

export default Jarvis;
