import { rout } from "common/addr";

interface TokenResponse {
    token: string;
    role: string;
    userId: string;
}

export async function getToken(data: Record<string, unknown>): Promise<TokenResponse> {
    const response = await fetch(rout + '/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error("Authorization wasn't successful");
    }

    const json = await response.json();
    return json as TokenResponse;
}
