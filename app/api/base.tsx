const baseUrl = "http://localhost:8000/api/";

export async function get<T>(url: string, params: Record<string, any> = {}): T {
    const queryString = new URLSearchParams(params).toString();
    const result = await fetch(`${baseUrl}${url}?${queryString}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!result.ok) {
        throw new Error(`Error: ${result.status}`);
    }
    const data = await result.json();
    return data;
}

export async function post(url: string, body: Record<string, any>) {
    const result = await fetch(`${baseUrl}${url}/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
    if (!result.ok) {
        throw new Error(`Error: ${result.status}`);
    }
    const data = await result.json();
    return data;
}
