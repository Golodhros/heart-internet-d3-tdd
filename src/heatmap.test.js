const d3 = require('d3');

const heatmap = require('./heatmap').default;

const data = [];

describe('Heatmap', () => {
    let heatmapChart = heatmap();

    // adds an html fixture to the DOM
    beforeEach(() => {
        const fixture = '<div id="fixture"></div>';

        document.body.insertAdjacentHTML('afterbegin', fixture);
    });

    // remove the html fixture from the DOM
    afterEach(function() {
        document.body.removeChild(document.getElementById('fixture'));
    });

    describe('rendering the chart', () => {
        let container;

        beforeEach(() => {
            container = d3.select('#fixture');

            container.datum(data).call(heatmapChart);
        });

        it('should be a heatmap', () => {
            let expected = 1;
            let actual = container.select('.heatmap').nodes().length;

            expect(actual).toEqual(expected);
        });
    });

});