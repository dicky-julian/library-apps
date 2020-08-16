const baseUrl = 'http://app-1f820b94-8f0a-4899-9184-460036f902de.cleverapps.io';

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
    baseUrl,
    services,
    configs
}