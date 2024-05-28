const treeData = {
    "name": "智慧agent",
    "children": [
        { 
            "name": "rag知识库系统",
            "children": [
                { "name": "反馈知识库" }
            ]
        },
        { 
            "name": "智慧心理助手",
            "children": [
                { "name": "分析心理" }
            ]
        },
        { 
            "name": "预警系统",
            "children": [
                { "name": "预警信息" }
            ]
        }
    ]
};

// 高亮路径定义
const highlightPath = new Set(["智慧agent", "rag知识库系统", "反馈知识库"]);

// Set the dimensions and margins of the diagram
const margin = { top: 20, right: 90, bottom: 30, left: 90 },
    width = 960 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

// Append the svg object to the body of the page
const svg = d3.select("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Creates a tree layout
const treemap = d3.tree().size([height, width]);

// Assigns parent, children, height, depth
const root = d3.hierarchy(treeData, d => d.children);

const treeDataStructured = treemap(root);

// Nodes and links
const nodes = treeDataStructured.descendants(),
    links = treeDataStructured.links();

// Normalize for fixed-depth
nodes.forEach(d => { d.y = d.depth * 180; });

// Links
const link = svg.selectAll(".link")
    .data(links)
  .enter().append("path")
    .attr("class", d => (highlightPath.has(d.source.data.name) && highlightPath.has(d.target.data.name)) ? "link highlight-link" : "link")
    .attr("d", d => {
        return "M" + d.target.y + "," + d.target.x
            + "C" + (d.target.y + d.source.y) / 2 + "," + d.target.x
            + " " + (d.target.y + d.source.y) / 2 + "," + d.source.x
            + " " + d.source.y + "," + d.source.x;
    });

// Nodes
const node = svg.selectAll(".node")
    .data(nodes)
  .enter().append("g")
    .attr("class", d => highlightPath.has(d.data.name) ? "node highlight" : "node")
    .attr("transform", d => "translate(" + d.y + "," + d.x + ")");

node.append("circle")
    .attr("r", 10);

node.append("text")
    .attr("dy", ".35em")
    .attr("x", d => d.children ? -13 : 13)
    .attr("text-anchor", d => d.children ? "end" : "start")
    .text(d => d.data.name);
