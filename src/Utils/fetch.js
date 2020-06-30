import axios from 'axios';
import service from './service';

export default {
    getUser: () => {
        const options = {
            'method': 'get',
            'url': `${service.GET_USER}`,
            'headers': {
                "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1OTM1MTYxMDQsImV4cCI6MTU5MzU0NzEwNH0.l9a7xSaUToB-PHd-jkDZbuVW-SPfK_wfU1GBWJw7J1M"
            }
        };

        try {
            return axios(options);
        } catch(err) {
            console.log(err.response);
            return err;
        }
    },
    // getBook: () => {
    //     const options = {
    //         'method': 'get',
    //         'url': `${service.GET_BOOK}`,
    //         'headers': {
    //             'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1OTM1MTYxMDQsImV4cCI6MTU5MzU0NzEwNH0.l9a7xSaUToB-PHd-jkDZbuVW-SPfK_wfU1GBWJw7J1M'
    //         }
    //     }

    //     try {
    //         return axios(options);
    //     } catch(err) {
    //         return err;
    //     }
    // },
    getBook: async() => {
        const res = await axios.get(`${service.GET_USER}`, {
            headers: {
                'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1OTM1MTYxMDQsImV4cCI6MTU5MzU0NzEwNH0.l9a7xSaUToB-PHd-jkDZbuVW-SPfK_wfU1GBWJw7J1M'
            }
        }).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err.response);
        })

        console.log(res);
    }
}