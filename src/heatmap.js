const d3 = require('d3');

function heatmap() {
    const width = 600;
    const height = 400;
    const margin = {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10
    };

    let svg;
    let chartWidth;
    let chartHeight;

    function exports(_selection) {
        _selection.each(function(_data) {
            chartWidth = width - margin.left - margin.right;
            chartHeight = height - margin.top - margin.bottom;

            if (!svg) {
                svg = d3.select(this)
                    .append('svg')
                      .classed('heatmap', true);
            }

            svg
                .attr('width', width)
                .attr('height', height);
        });
    }

    return exports;
};

export default heatmap;
