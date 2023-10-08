import React from "react";
import { Container, Paper, Typography } from "@mui/material";

const VideoPage = () => {
	return (
		<Container
			sx={{
				backgroundColor: "#EEF2F6",
				height: "100vh",
				width: "100vw",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				padding: 4,
				borderRadius: "20px",
			}}
			maxWidth="md"
		>
			<Paper
				elevation={10}
				sx={{
					padding: 4,
					backgroundColor: "#ffffff",
					height: "100vh",
					width: "60vw",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					borderRadius: "20px",
				}}
			>
				<Typography
					sx={{
						fontSize: "1.75rem",
						fontWeight: 800,
						color: "#5e35b1",
						marginTop: 0,
						marginBottom: 3,
					}}
				>
					Webcam Feed
				</Typography>
				<img
					src="http://127.0.0.1:5055/webcam"
					alt="Webcam feed"
					sx={{
						width: "640px",
						height: "480px",
						border: "4px solid #5e35b1",
						borderRadius: "12px",
						boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
					}}
				/>
			</Paper>
		</Container>
	);
};

export default VideoPage;
