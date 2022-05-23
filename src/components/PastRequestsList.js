import React from "react";
import PastRequest from "./PastRequest";

function PastRequestsList({ PastRequests }) {
	return PastRequests?.map((pastrequest) => {
		if (pastrequest.request !== "") {
			return (
				<PastRequest key={pastrequest.id} pastrequest={pastrequest} />
			);
		}
	});
}

export default PastRequestsList;
