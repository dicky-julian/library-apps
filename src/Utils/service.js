const baseUrl = 'http://localhost:3000';

const services = {
    FETCH_LOGIN: `${baseUrl}/login`,
    FETCH_REGISTER: `${baseUrl}/register`,
    GET_AUTHOR: `${baseUrl}/author`,
    GET_BOOK: `${baseUrl}/book`,
    GET_GENRE: `${baseUrl}/genre`,
    GET_TRANSACTION: `${baseUrl}/transaction`,
}

const configs = {
    AUTHORIZATION: localStorage.getItem("libsToken") || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYsInVzZXJuYW1lIjoibmFiaWxhIiwiZnVsbG5hbWUiOiJOYWJpbGEgUmFobWFkYW50aSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTU5NDEyMjIzMX0.gYou-6jDKrVvXd7P2Ml3mgbf_T5NC5K885yCfqlUKS8'
}

export {
    services,
    configs
}