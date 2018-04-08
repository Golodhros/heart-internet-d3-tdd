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


// Draw day labels
const daysHuman = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const dayLabelWidth = 25;

...

container
  .append('g')
    .classed('day-labels-group', true);

...

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


// Hours labels
const hoursHuman = [
    '00h', '01h', '02h', '03h', '04h', '05h', '06h', '07h', '08h',
    '09h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h',
    '18h', '19h', '20h', '21h', '22h', '23h'
];
const hourLabelHeight = 20;

...

container
  .append('g')
    .classed('hour-labels-group', true);

...

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


// Styling
boxes.enter()
  .append('rect')
    .classed('box', true)
    .attr('width', boxSize)
    .attr('height', boxSize)
    .attr('x', function (d) { return d[1] * boxSize; })
    .attr('y', function (d) { return d[0] * boxSize; })
    .style('fill', function (d) { return colorScale(d[2]); })
    .style('stroke', "#FFFFFF")
    .style('stroke-width', 2);


// Animation
// First, we will fade in the boxes
boxes.enter()
  .append('rect')
    .classed('box', true)
    .attr('width', boxSize)
    .attr('height', boxSize)
    .attr('x', function (d) { return d[1] * boxSize; })
    .attr('y', function (d) { return d[0] * boxSize; })
    .style('fill', function (d) { return colorScale(d[2]); })
    .style('stroke', boxBorderColor)
    .style('stroke-width', boxBorderSize)
    .style('opacity', 0)
    .transition()
    .duration(animationDuration)
    .style('opacity', 1);

// Next, we will animate the colors
boxes.enter()
  .append('rect')
    .classed('box', true)
    .attr('width', boxSize)
    .attr('height', boxSize)
    .attr('x', function (d) { return d[1] * boxSize; })
    .attr('y', function (d) { return d[0] * boxSize; })
    .style('opacity', 0.2)
    .style('fill', '#BBBBBB')
    .style('stroke', boxBorderColor)
    .style('stroke-width', boxBorderSize)
    .transition()
    .duration(animationDuration)
    .style('fill', function (d) { return colorScale(d[2]); })
    .style('opacity', 1);


// Accessors
it('should provide colorSchema getter and setter', () => {
    let previous = heatmapChart.colorSchema(),
        expected = ['#FFFFFF'],
        actual;

    heatmapChart.colorSchema(expected);
    actual = heatmapChart.colorSchema();

    expect(previous).not.toBe(actual);
    expect(actual).toBe(expected);
});

exports.colorSchema = function(_x) {
    if (!arguments.length) {
        return colorSchema;
    }
    colorSchema = _x;

    return this;
};

// Configurable properties
let colorSchema = [
    '#C0FFE7',
    '#95F6D7',
    '#6AEDC7',
    '#59C3A3',
    '#479980'
];

// Real Data
const myAPIKey = 'ToFillWithYourAPIKey';
const requestURLs = [
    `https://api.weatherbit.io/v2.0/history/hourly?key=${myAPIKey}&lat=37.7585&lon=-122.4137&start_date=2018-03-12:00&end_date=2018-03-12:23&units=I`,
    `https://api.weatherbit.io/v2.0/history/hourly?key=${myAPIKey}&lat=37.7585&lon=-122.4137&start_date=2018-03-13:00&end_date=2018-03-13:23&units=I`,
    `https://api.weatherbit.io/v2.0/history/hourly?key=${myAPIKey}&lat=37.7585&lon=-122.4137&start_date=2018-03-14:00&end_date=2018-03-14:23&units=I`,
    `https://api.weatherbit.io/v2.0/history/hourly?key=${myAPIKey}&lat=37.7585&lon=-122.4137&start_date=2018-03-15:00&end_date=2018-03-15:23&units=I`,
    `https://api.weatherbit.io/v2.0/history/hourly?key=${myAPIKey}&lat=37.7585&lon=-122.4137&start_date=2018-03-16:00&end_date=2018-03-16:23&units=I`,
    `https://api.weatherbit.io/v2.0/history/hourly?key=${myAPIKey}&lat=37.7585&lon=-122.4137&start_date=2018-03-17:00&end_date=2018-03-17:23&units=I`,
    `https://api.weatherbit.io/v2.0/history/hourly?key=${myAPIKey}&lat=37.7585&lon=-122.4137&start_date=2018-03-18:00&end_date=2018-03-18:23&units=I`
];
const requests = requestURLs.map((url) => d3.json(url));

Promise.all(requests)
    .then(function(values) {
        let dataByHour = getFormattedWindSpeed(values);

        console.log('dataByHour', dataByHour)

        container.datum(dataByHour).call(heatmapChart);
    });

// Data picking and formatting
const flattenArray = array => array.reduce((acc, d) => acc.concat(d), []);
const getWindSpeedData = (dayOfWeek, {wind_spd}, i) => [dayOfWeek, i, wind_spd];
const getWindSpeedDataByDay = ({data}, i) => data.map(getWindSpeedData.bind(null, i));
const getFormattedWindSpeed = (rawData) => flattenArray(rawData.map(getWindSpeedDataByDay));
