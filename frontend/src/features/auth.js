

export const logout = () => {
    // Logout
    localStorage.removeItem("authenticated");
    localStorage.removeItem("token");
    localStorage.removeItem("token_type");
    return nav("/", {replace: true})
}