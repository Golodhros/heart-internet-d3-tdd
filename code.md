// Test Setup
// adds an html fixture to the DOM
beforeEach(() => {
    const fixture = '<div id="fixture"></div>';

    document.body.insertAdjacentHTML('afterbegin', fixture);
});

// remove the html fixture from the DOM
afterEach(function() {
    document.body.removeChild(document.getElementById('fixture'));
});

// Basic chart test
describe('rendering the chart', () => {
    let container;

    beforeEach(() => {
        heatmapChart = heatmap();
        container = d3.select('#fixture');

        container.datum(data).call(heatmapChart);
    });

    it('should be a heatmap', () => {
        let expected = 1;
        let actual = container.select('.heatmap').nodes().length;

        expect(actual).toEqual(expected);
    });
});


// Reusable chart
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


// Create container group and apply margin convention
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

// Build color scale
function buildScales() {
    colorScale = d3.scaleLinear()
            .range([colorSchema[0], colorSchema[colorSchema.length - 1]])
            .domain(d3.extent(data, function (d) { return d[2] }))
            .interpolate(d3.interpolateHcl);
}

// Draw boxes
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