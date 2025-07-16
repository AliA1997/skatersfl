

export async function callApi(
    method: "GET" | "POST" | "PUT" | "DELETE",
    url: string,
    body?: object
) {
    let json: object = {};
    try {
        let fetchOptions;
        
        if(method === "GET" || method === "DELETE")
            fetchOptions = {};
        else
            fetchOptions = {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            };
    
        const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}${url}`, fetchOptions);

        if(response.status !== 200)
            throw new Error('Error calling the api');
    
        json = await response.json();
    } catch(err) {
        console.log("Error calling api:", err);
        throw err;
    } finally {
        return json;
    }
}