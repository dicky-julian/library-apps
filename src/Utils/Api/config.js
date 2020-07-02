import jwtDecode from 'jwt-decode';

const grantToken = token => {
    localStorage.setItem("libsToken", token);
}

const revokeToken = () => {
    localStorage.removeItem("libsToken");
}

const useToken = () => {
    const token = localStorage.getItem("libsToken");
        if (token) {
            const tokenData = jwtDecode(token);
            return tokenData;
        } else {
            console.log("can't find token");
        }
        return '';
}

const compareValues = (key, order = 'asc') => {
    return function innerSort(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
          return 0;
        }
    
        const varA = (typeof a[key] === 'string')
          ? a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string')
          ? b[key].toUpperCase() : b[key];
    
        let comparison = 0;
        if (varA > varB) {
          comparison = 1;
        } else if (varA < varB) {
          comparison = -1;
        }
        return (
          (order === 'desc') ? (comparison * -1) : comparison
        );
      };
}

export {
    grantToken,
    revokeToken,
    useToken,
    compareValues
}