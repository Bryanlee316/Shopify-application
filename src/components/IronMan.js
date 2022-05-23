import React, { useState, useEffect, useRef } from "react";
import ironMan from "../assets/Ironman.mp4";
import "./Jarvis.css";

function IronMan() {
	const videoRef = useRef();
	const setPlayBack = () => {
		videoRef.current.playbackRate = 0.5;
	};

	const [fadeProp, setFadeProp] = useState({
		fade: "fade-in",
	});

	useEffect(() => {
		const timeout = setInterval(() => {
			if (fadeProp.fade === "fade-in") {
				setFadeProp({
					fade: "fade-out",
				});
			} else {
				setFadeProp({
					fade: "fade-in",
				});
			}
		}, 3900);

		return () => clearInterval(timeout);
	}, [fadeProp]);

	return (
		<div>
			<video
				width="500"
				autoplay="autoplay"
				controls
				ref={videoRef}
				className={`${fadeProp.fade} ironman`}
				muted
				onCanPlay={() => setPlayBack()}
				loop
			>
				<source src={ironMan} type="video/mp4" />
			</video>
		</div>
	);
}

export default IronMan;
