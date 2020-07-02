const baseUrl = 'http://localhost:3000';

const services = {
    FETCH_LOGIN: `${baseUrl}/login`,
    FETCH_REGISTER: `${baseUrl}/register`,
    GET_AUTHOR: `${baseUrl}/author`,
    GET_BOOK: `${baseUrl}/book`,
    GET_GENRE: `${baseUrl}/genre`
}

const configs = {
    AUTHORIZATION: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsInJvbGUiOiJhZG1pbiIsImlhdCI6MTU5MzUzNDUwMCwiZXhwIjoxNTk0MTM5MzAwfQ.EXyS28orCfhoI9mjOcwfmhJ_Otq855E_4RnpKV7Q-Qk'
}
export {
    services,
    configs
}