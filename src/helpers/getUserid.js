import jwt_Decode from "jwt-decode";

export function getUserId() {
	const jwt_token = localStorage.getItem("token");
	if (jwt_token === undefined) return null;
	const decoded = jwt_Decode(jwt_token);
	return decoded.user_id;
}
