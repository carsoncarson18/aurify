export async function fetchWithJwt(url: string, options: RequestInit = {}) {
    const jwtToken = localStorage.getItem("jwt");
    if (!jwtToken) throw new Error("Session expired. Please log in again.");

    if (!options.headers) options.headers = {};
    (options.headers as any)["Authorization"] = `Bearer ${jwtToken}`;

    const res = await fetch(url, options);

    // handle refreshed token
    const newJwt = res.headers.get("X-New-JWT-Token");
    if (newJwt) {
        localStorage.setItem("jwt", newJwt);
    }

    if (!res.ok) {
        let errorDetail = "Request failed";
        try {
            const errData = await res.json();
            errorDetail = errData.detail || errorDetail;
        } catch (err) {
            const text = await res.text();
            console.error("Backend returned non-JSON:", text);
            errorDetail = "Unexpected response format from server.";
        }
        throw new Error(errorDetail);
    }

    return res.json();
}
