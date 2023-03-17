const fs = require('fs');


function get_full_access_url(username, password, cluster_url) {    
    const res = `mongodb+srv://${username}:${password}@${cluster_url}/?retryWrites=true&w=majority`;
    return res;
};

module.exports = {
    get_full_access_url,
}
