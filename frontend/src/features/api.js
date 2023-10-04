

// const base_url = process.env.API_URL
const base_url = "http://127.0.0.1:5050"


export const login = async (payload) => {
    const requestOptions = {
        method: "POST",
        body: payload,
        headers: {
            // "Content-Type": "application/x-www-form-urlencoded"
        }
    }
    console.log(requestOptions);

    const data = await fetch(
        `${base_url}/login`, 
        requestOptions
    ).then(
        response => response.json().then(data => {
            return {
                body: data,
                status: response.status
            };
        })
    );
    return data;
}

export const logout = async () => {
    const requestOptions = {
        method: "POST",
        // body: payload,
        headers: {
            // "Content-Type": "application/x-www-form-urlencoded"
            "Authorization": `${localStorage.token_type} ${localStorage.token}`
        }
    }
    console.log(requestOptions);

    const data = await fetch(
        `${base_url}/logout`, 
        requestOptions
    ).then(
        response => response.json().then(data => {
            return {
                body: data,
                status: response.status
            };
        })
    );
    return data;
}

export const signup = async (payload) => {
    const requestOptions = {
        method: "POST",
        body: payload,
        headers: {
            // "Content-Type": "application/x-www-form-urlencoded"
        }
    }
    console.log(requestOptions);

    const data = await fetch(
        `${base_url}/user/add`, 
        requestOptions
    ).then(
        response => response.json().then(data => {
            return {
                body: data,
                status: response.status
            };
        })
    );
    return data;
}


export const heartrate = async (payload) => {
    // const requestOptions = {
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //         email: payload.email,
    //         password: payload.password,
    //     }),
    //     method: "POST",
    // };

    const requestOptions = {
        method: "GET",
        // body: payload,
        headers: {
            // "Content-Type": "application/x-www-form-urlencoded"
            "Authorization": `${localStorage.token_type} ${localStorage.token}`
        }
    }
    console.log(requestOptions);

    const response = await fetch(
        `${base_url}/heartrate/1`, 
        requestOptions
    ).then(
        response => {
            // console.log(response);
            return response;
        }
    ).then(
        response => response.json().then(
            data => {
                // if(data.data) {
                //     data['data'].forEach(data => {
                //         data.time = new Date(data.time)
                //     })
                // }

                // return data['data']
                return {
                    body: data['data'],
                    status: response.status
                }; 
            }
        )
    );
    console.log(response)

    return response;
}
