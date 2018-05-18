export const fetchCategories = () => {
    fetch('http://localhost:8080/categories')
        .then(res => {
            if(res.ok){
                res.json().then(json => {
                    return json;
                });
            }
        })
        .catch(err => {
            console.log(err);
            return null;
        })
};