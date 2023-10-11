import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";

import { Outlet, Link, useNavigate } from "react-router-dom";

import { logout } from "../features/api";
import { useDispatch } from "react-redux";
import { authActions, selectAuth } from "../features/authSlice";

const pages = ["Dashboard", "PatientList"];
const settings = ["Profile", "Account", "Dashboard"];

function ResponsiveAppBar() {
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);

	const nav = useNavigate();
	const dispatch = useDispatch();
	const auth = useDispatch(selectAuth);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleLogout = async () => {
		handleCloseNavMenu();
		const resp = await logout();
		if (resp.status == 200 && resp.body == "OK") {
			console.log("Successfully logged out.");
		}
		localStorage.removeItem("authenticated");
		localStorage.removeItem("token");
		localStorage.removeItem("token_type");
		dispatch(authActions.logout());
		nav("/login", { replace: true });
		// nav("/")
	};

	return (
		<>
			<AppBar position="fixed" sx={{ backgroundColor: "#1565c0" }}>
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						{/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
						<Typography
							sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
						>
							<img src="./logo.png" alt="bug" height={35} />
						</Typography>
						<Typography
							variant="h6"
							noWrap
							component="a"
							href="/home"
							sx={{
								mr: 2,
								display: { xs: "none", md: "flex" },
								fontFamily: "monospace",
								fontWeight: 700,
								letterSpacing: ".3rem",
								color: "#fefefe",
								textDecoration: "none",
							}}
						>
							MedWatch
						</Typography>

						<Box
							sx={{
								flexGrow: 1,
								display: { xs: "flex", md: "none" },
							}}
						>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleOpenNavMenu}
								color="inherit"
							>
								<MenuIcon />
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorElNav}
								anchorOrigin={{
									vertical: "bottom",
									horizontal: "left",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "left",
								}}
								open={Boolean(anchorElNav)}
								onClose={handleCloseNavMenu}
								sx={{
									display: { xs: "block", md: "none" },
								}}
							>
								{pages.map((page) => (
									<MenuItem
										key={page}
										onClick={handleCloseNavMenu}
										component={Link}
										to={`/${page}`}
									>
										<Typography textAlign="center">
											{page}
										</Typography>
									</MenuItem>
								))}
							</Menu>
						</Box>
						<AdbIcon
							sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
						/>
						<Typography
							variant="h5"
							noWrap
							component="a"
							href="/"
							sx={{
								mr: 2,
								display: { xs: "flex", md: "none" },
								flexGrow: 1,
								fontFamily: "monospace",
								fontWeight: 700,
								letterSpacing: ".3rem",
								color: "inherit",
								textDecoration: "none",
							}}
						>
							LOGO
						</Typography>
						<Box
							sx={{
								flexGrow: 1,
								display: { xs: "none", md: "flex" },
							}}
						>
							{pages.map((page) => (
								<Button
									key={page}
									onClick={handleCloseNavMenu}
									sx={{
										my: 2,
										color: "white",
										display: "block",
									}}
									href={`/${page}`}
								>
									{page}
								</Button>
							))}
						</Box>

						<Box sx={{ flexGrow: 0 }}>
							<Tooltip title="Open settings">
								<IconButton
									onClick={handleOpenUserMenu}
									sx={{ p: 0 }}
								>
									<Avatar
										alt="Remy Sharp"
										src="/static/images/avatar/2.jpg"
									/>
								</IconButton>
							</Tooltip>
							<Menu
								sx={{ mt: "45px" }}
								id="menu-appbar"
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}
							>
								{settings.map((setting) => (
									<MenuItem
										key={setting}
										onClick={handleCloseUserMenu}
									>
										<Typography textAlign="center">
											{setting}
										</Typography>
									</MenuItem>
								))}

								<MenuItem key="logout" onClick={handleLogout}>
									<Typography textAlign="center">
										Logout
									</Typography>
								</MenuItem>
							</Menu>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>

			<Outlet />
		</>
	);
}
export default ResponsiveAppBar;
