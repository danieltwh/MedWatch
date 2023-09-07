

// const base_url = process.env.API_URL
const base_url = "http://127.0.0.1:5050"

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

    const response = await fetch(
        `${base_url}/heartrate/1`
    ).then(
        response => {
            // console.log(response);
            return response;
        }
    ).then(
        response => response.json()
    ).then(
        data => {
            data['data'].forEach(data => {
                data.time = new Date(data.time)
            })
            return data['data']
        }
    );

    return response;
}
