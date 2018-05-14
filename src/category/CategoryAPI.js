const list = () => fetch('http://localhost:3000/categories')
    .then(res => res.json())
    .then(payload => ({ payload }))
    .catch(error => ({ error }));

export default { list };
