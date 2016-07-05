import {prepareSwaggerFormat, getEndpointParent, getEndpointId} from './swaggerTools';

export default function apiVisualizer(data){
    let api = prepareSwaggerFormat(data);

    let width = 960,
        height = 2000;

    let tree = d3.tree()
        .size([height, width - 160]);

    var root = d3.stratify()
        .id(getEndpointId)
        .parentId(getEndpointParent)
        (api);

    console.log(root);
}