import axios from "axios";
import {OAuth2TokenResponse} from "../../@types/oauth2";

export async function fetchOAuth2Token(
    accessTokenUrl: string,
    clientId: string,
    clientSecret: string,
    username: string,
    password: string
): Promise<OAuth2TokenResponse> {
    try {
        const params = new URLSearchParams();
        params.append("grant_type", "password");
        params.append("client_id", clientId);
        params.append("client_secret", clientSecret);
        params.append("username", username);
        params.append("password", password);

        const response = await axios.post(accessTokenUrl, params, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });

        return response.data as OAuth2TokenResponse;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Error fetching OAuth2 token:", error.response?.data || error.message);
        } else {
            console.error("An unexpected error occurred:", error);
        }
        throw error;
    }
}
