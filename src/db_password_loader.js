const fs = require('fs');

function get_full_access_url(pass_path) {    
    const access_data = JSON.parse(fs.readFileSync(pass_path, 'utf8'));
    const res = `mongodb+srv://${access_data.username}:${access_data.password}@amazonproductviewer.mskveu5.mongodb.net/?retryWrites=true&w=majority`;
    return res;
};

module.exports = {
    get_full_access_url,
}
