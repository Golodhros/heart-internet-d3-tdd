const d3 = require('d3');

function heatmap() {
    const width = 800;
    const height = 400;
    const margin = {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10
    };
    const boxSize = 30;
    const colorSchema = [
        '#ccf7f6',
        '#70e4e0',
        '#00d8d2',
        '#00acaf',
        '#007f8c',
        '#005e66',
        '#003c3f'
    ];

    let svg;
    let data;
    let colorScale;
    let chartWidth;
    let chartHeight;
    let boxes;

    function exports(_selection) {
        _selection.each(function(_data) {
            chartWidth = width - margin.left - margin.right;
            chartHeight = height - margin.top - margin.bottom;

            data = _data;

            buildScales();
            buildSVG(this);
            drawBoxes();
        });
    }

    function buildContainerGroups() {
        let container = svg
              .append('g')
                .classed('container-group', true)
                .attr('transform', `translate(${margin.left}, ${margin.top})`);

        container
          .append('g')
            .classed('chart-group', true);
        container
          .append('g')
            .classed('metadata-group', true);
    }

    function buildScales() {
        colorScale = d3.scaleLinear()
                .range([colorSchema[0], colorSchema[colorSchema.length - 1]])
                .domain(d3.extent(data, function (d) { return d[2] }))
                .interpolate(d3.interpolateHcl);
    }

    function buildSVG(container) {
        if (!svg) {
            svg = d3.select(container)
                  .append('svg')
                    .classed('heatmap', true);

            buildContainerGroups();
        }

        svg
            .attr('width', width)
            .attr('height', height);
    }

    function drawBoxes() {
        boxes = svg.select('.chart-group').selectAll('.box').data(data);

        boxes.enter()
          .append('rect')
            .attr('width', boxSize)
            .attr('height', boxSize)
            .attr('x', function (d) { return d[1] * boxSize; })
            .attr('y', function (d) { return d[0] * boxSize; })
            .style('fill', function (d) { return colorScale(d[2]); })
            .classed('box', true);

        boxes.exit().remove();
    }

    return exports;
};

export default heatmap;
