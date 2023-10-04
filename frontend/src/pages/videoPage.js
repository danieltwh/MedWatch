import React from 'react';
import { Container, Paper, Typography } from '@mui/material';

const VideoPage = () => {
    return (
        <Container
            sx={{
                backgroundColor: '#EEF2F6',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 4
            }}
            maxWidth="md"
        >
            <Paper
                elevation={10}
                sx={{
                    padding: 4,
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRadius: 2,
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        color: '#3699DB',
                        marginBottom: 3
                    }}
                >
                    Webcam Feed
                </Typography>
                <img
                    src="http://127.0.0.1:5055/webcam"
                    alt="Webcam feed"
                    sx={{
                        width: '640px',
                        height: '480px',
                        border: '4px solid #1A77D2',
                        borderRadius: '12px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                    }}
                />
            </Paper>
        </Container>
    );
};

export default VideoPage;
