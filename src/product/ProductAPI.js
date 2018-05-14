const list = (options) => {
    const url = new URL('http://localhost:3000/products');
    Object.keys(options).forEach(key => url.searchParams.append(key, options[key]));

    return fetch(url)
        .then(res => res.json())
        .then(payload => ({ payload }))
        .catch(error => ({ error }));
};

const get = id => fetch(`http://localhost:3000/products/${id}`)
    .then(res => res.json())
    .then(payload => ({ payload }))
    .catch(error => ({ error }));

export default { list, get };
