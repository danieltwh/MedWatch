import React from "react";
import Child from "../ChildPatientList";

const Parent = () => {
	const data = {
		avatar: "https://i.imgur.com/oflMA1gb.jpg",
		name: "fake1",
		age: 90,
		height: 1.88,
		weight: 80,
		blood_type: "A",
		medication: [
			{ name: "Prinivil", count: "20mg", freq: "once a day" },
			{ name: "Metformin", count: "500mg", freq: "twice a day" },
		],
		medical_condition: [
			"High Blood Pressure",
			"Type II Diabetes",
			"Allergic to Ibuprofen",
		],
		nok_contact: {
			name: "Chiu Tien Le",
			relationship: "Son",
			phone_number: "+6591234567",
		},
	};
	return (
		<div>
			<Child data={data} />
		</div>
	);
};

export default Parent;
