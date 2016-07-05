export function prepareJsonApi(apiJson){
    let root = {
        endpoint: apiJson.host + apiJson.basePath,
        methods: [],
        parent: null
    }

    let paths = Object.keys(apiJson.paths).map(function(value) {
        return {
            endpoint: value,
            methods: Object.keys(apiJson.paths[value]),
            parent: root.endpoint
        }
    });

    paths.push(root);

    return paths;
}

export function getEndpointParent(endpoint){
    return endpoint.parent;
}

export function getEndpointId(endpoint){
    return endpoint.endpoint;
}