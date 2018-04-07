const d3 = require('d3');

function heatmap() {
    const width = 800;
    const height = 400;
    const margin = {
        top: 30,
        right: 10,
        bottom: 10,
        left: 30
    };
    const boxSize = 30;
    const colorSchema = [
        '#C0FFE7',
        '#95F6D7',
        '#6AEDC7',
        '#59C3A3',
        '#479980'
    ];
    const boxBorderColor = '#FFFFFF';
    const boxBorderSize = 2;
    const daysHuman = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
    const dayLabelWidth = 30;
    const hoursHuman = [
        '00h', '01h', '02h', '03h', '04h', '05h', '06h', '07h', '08h',
        '09h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h',
        '18h', '19h', '20h', '21h', '22h', '23h'
    ];
    const hourLabelHeight = 20;
    const boxInitialColor = '#BBBBBB';
    const animationDuration = 2000;

    let svg;
    let data;
    let colorScale;
    let chartWidth;
    let chartHeight;
    let boxes;
    let dayLabels;
    let hourLabels;

    function exports(_selection) {
        _selection.each(function(_data) {
            chartWidth = width - margin.left - margin.right;
            chartHeight = height - margin.top - margin.bottom;

            data = _data;

            buildScales();
            buildSVG(this);
            drawBoxes();
            drawDayLabels();
            drawHourLabels();
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
            .classed('day-labels-group', true);
        container
          .append('g')
            .classed('hour-labels-group', true);
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
            .classed('box', true)
            .attr('width', boxSize)
            .attr('height', boxSize)
            .attr('x', function (d) { return d[1] * boxSize; })
            .attr('y', function (d) { return d[0] * boxSize; })
            .style('opacity', 0.2)
            .style('fill', boxInitialColor)
            .style('stroke', boxBorderColor)
            .style('stroke-width', boxBorderSize)
            .transition()
            .duration(animationDuration)
            .style('fill', function (d) { return colorScale(d[2]); })
            .style('opacity', 1);

        boxes.exit().remove();
    }

    function drawDayLabels() {
        let dayLabelsGroup = svg.select('.day-labels-group');

        dayLabels = svg.select('.day-labels-group').selectAll('.day-label')
            .data(daysHuman);

        dayLabels.enter()
          .append('text')
            .text((d) => d)
            .attr('x', 0)
            .attr('y', (d, i) => i * boxSize)
            .style('text-anchor', 'start')
            .style('dominant-baseline', 'central')
            .attr('class', 'day-label');

        dayLabelsGroup.attr('transform', `translate(-${dayLabelWidth}, ${boxSize/2})`);
    }

    function drawHourLabels() {
        let hourLabelsGroup = svg.select('.hour-labels-group');

        hourLabels = svg.select('.hour-labels-group').selectAll('.hour-label')
            .data(hoursHuman);

        hourLabels.enter()
          .append('text')
            .text((d) => d)
            .attr('y', 0)
            .attr('x', (d, i) => i * boxSize)
            .style('text-anchor', 'middle')
            .style('dominant-baseline', 'central')
            .attr('class', 'hour-label');

        hourLabelsGroup.attr('transform', `translate(${boxSize/2}, -${hourLabelHeight})`);
    }

    return exports;
};

export default heatmap;
