import {prepareSwaggerFormat, getEndpointParent, getEndpointId} from './swaggerTools';

export default function apiVisualizer(data){
    let api = prepareSwaggerFormat(data);

    let width = 960,
        height = 2000,
        translation = 40,
        treePadding = 500;

    let tree = d3.tree()
        .size([height, width - treePadding]);

    let root = d3.stratify()
        .id(getEndpointId)
        .parentId(getEndpointParent)
        (api);

    tree(root);

    let svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + translation + ",0)");

    let link = svg.selectAll(".link")
        .data(root.descendants().slice(1))
        .enter().append("path")
        .attr("class", "link")
        .attr("d", function(d) {
            return " M" + d.y + "," + d.x
                + " C" + (d.y + d.parent.y) / 2 + "," + d.x
                + " " + (d.y + d.parent.y) / 2 + "," + d.parent.x
                + " " + d.parent.y + "," + d.parent.x;
        });

    let node = svg.selectAll(".node")
        .data(root.descendants())
        .enter().append("g")
        .attr("class", function(d) { return "node" + (d.children ? " node--internal" : " node--leaf"); })
        .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })

    node.append("circle")
        .attr("r", 2.5);

    node.append("text")
        .attr("dy", 3)
        .attr("x", function(d) { return d.children ? -8 : 8; })
        .style("text-anchor", function(d) { return d.children ? "end" : "start"; })
        .text(function(d) { return d.id.substring(d.id.lastIndexOf(".") + 1); });
}