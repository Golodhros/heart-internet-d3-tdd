const d3 = require('d3');

const heatmap = require('./heatmap').default;

const data = [
    [
        0,
        0,
        7
    ],
    [
        0,
        1,
        0
    ],
    [
        0,
        2,
        1
    ],
    [
        0,
        3,
        0
    ],
    [
        0,
        4,
        0
    ],
    [
        0,
        5,
        0
    ],
    [
        0,
        6,
        0
    ],
    [
        0,
        7,
        9
    ],
    [
        0,
        8,
        7
    ],
    [
        0,
        9,
        26
    ],
    [
        0,
        10,
        30
    ],
    [
        0,
        11,
        26
    ],
    [
        0,
        12,
        19
    ],
    [
        0,
        13,
        23
    ],
    [
        0,
        14,
        13
    ],
    [
        0,
        15,
        19
    ],
    [
        0,
        16,
        22
    ],
    [
        0,
        17,
        23
    ],
    [
        0,
        18,
        14
    ],
    [
        0,
        19,
        16
    ],
    [
        0,
        20,
        19
    ],
    [
        0,
        21,
        16
    ],
    [
        0,
        22,
        18
    ],
    [
        0,
        23,
        25
    ],
    [
        1,
        0,
        6
    ],
    [
        1,
        1,
        3
    ],
    [
        1,
        2,
        2
    ],
    [
        1,
        3,
        2
    ],
    [
        1,
        4,
        6
    ],
    [
        1,
        5,
        1
    ],
    [
        1,
        6,
        1
    ],
    [
        1,
        7,
        1
    ],
    [
        1,
        8,
        14
    ],
    [
        1,
        9,
        31
    ],
    [
        1,
        10,
        25
    ],
    [
        1,
        11,
        50
    ],
    [
        1,
        12,
        35
    ],
    [
        1,
        13,
        38
    ],
    [
        1,
        14,
        30
    ],
    [
        1,
        15,
        44
    ],
    [
        1,
        16,
        31
    ],
    [
        1,
        17,
        30
    ],
    [
        1,
        18,
        19
    ],
    [
        1,
        19,
        6
    ],
    [
        1,
        20,
        14
    ],
    [
        1,
        21,
        29
    ],
    [
        1,
        22,
        20
    ],
    [
        1,
        23,
        18
    ],
    [
        2,
        0,
        13
    ],
    [
        2,
        1,
        2
    ],
    [
        2,
        2,
        7
    ],
    [
        2,
        3,
        1
    ],
    [
        2,
        4,
        0
    ],
    [
        2,
        5,
        0
    ],
    [
        2,
        6,
        2
    ],
    [
        2,
        7,
        4
    ],
    [
        2,
        8,
        29
    ],
    [
        2,
        9,
        28
    ],
    [
        2,
        10,
        44
    ],
    [
        2,
        11,
        43
    ],
    [
        2,
        12,
        33
    ],
    [
        2,
        13,
        69
    ],
    [
        2,
        14,
        54
    ],
    [
        2,
        15,
        43
    ],
    [
        2,
        16,
        49
    ],
    [
        2,
        17,
        34
    ],
    [
        2,
        18,
        20
    ],
    [
        2,
        19,
        14
    ],
    [
        2,
        20,
        13
    ],
    [
        2,
        21,
        31
    ],
    [
        2,
        22,
        21
    ],
    [
        2,
        23,
        18
    ],
    [
        3,
        0,
        11
    ],
    [
        3,
        1,
        5
    ],
    [
        3,
        2,
        5
    ],
    [
        3,
        3,
        0
    ],
    [
        3,
        4,
        1
    ],
    [
        3,
        5,
        1
    ],
    [
        3,
        6,
        1
    ],
    [
        3,
        7,
        4
    ],
    [
        3,
        8,
        22
    ],
    [
        3,
        9,
        47
    ],
    [
        3,
        10,
        77
    ],
    [
        3,
        11,
        86
    ],
    [
        3,
        12,
        54
    ],
    [
        3,
        13,
        36
    ],
    [
        3,
        14,
        42
    ],
    [
        3,
        15,
        54
    ],
    [
        3,
        16,
        40
    ],
    [
        3,
        17,
        40
    ],
    [
        3,
        18,
        33
    ],
    [
        3,
        19,
        18
    ],
    [
        3,
        20,
        28
    ],
    [
        3,
        21,
        32
    ],
    [
        3,
        22,
        29
    ],
    [
        3,
        23,
        24
    ],
    [
        4,
        0,
        16
    ],
    [
        4,
        1,
        0
    ],
    [
        4,
        2,
        1
    ],
    [
        4,
        3,
        0
    ],
    [
        4,
        4,
        0
    ],
    [
        4,
        5,
        0
    ],
    [
        4,
        6,
        1
    ],
    [
        4,
        7,
        5
    ],
    [
        4,
        8,
        19
    ],
    [
        4,
        9,
        53
    ],
    [
        4,
        10,
        48
    ],
    [
        4,
        11,
        28
    ],
    [
        4,
        12,
        39
    ],
    [
        4,
        13,
        28
    ],
    [
        4,
        14,
        43
    ],
    [
        4,
        15,
        64
    ],
    [
        4,
        16,
        32
    ],
    [
        4,
        17,
        50
    ],
    [
        4,
        18,
        11
    ],
    [
        4,
        19,
        19
    ],
    [
        4,
        20,
        18
    ],
    [
        4,
        21,
        18
    ],
    [
        4,
        22,
        25
    ],
    [
        4,
        23,
        18
    ],
    [
        5,
        0,
        9
    ],
    [
        5,
        1,
        2
    ],
    [
        5,
        2,
        0
    ],
    [
        5,
        3,
        0
    ],
    [
        5,
        4,
        0
    ],
    [
        5,
        5,
        0
    ],
    [
        5,
        6,
        1
    ],
    [
        5,
        7,
        2
    ],
    [
        5,
        8,
        14
    ],
    [
        5,
        9,
        35
    ],
    [
        5,
        10,
        53
    ],
    [
        5,
        11,
        26
    ],
    [
        5,
        12,
        25
    ],
    [
        5,
        13,
        18
    ],
    [
        5,
        14,
        41
    ],
    [
        5,
        15,
        35
    ],
    [
        5,
        16,
        42
    ],
    [
        5,
        17,
        23
    ],
    [
        5,
        18,
        23
    ],
    [
        5,
        19,
        15
    ],
    [
        5,
        20,
        18
    ],
    [
        5,
        21,
        21
    ],
    [
        5,
        22,
        22
    ],
    [
        5,
        23,
        13
    ],
    [
        6,
        0,
        24
    ],
    [
        6,
        1,
        6
    ],
    [
        6,
        2,
        0
    ],
    [
        6,
        3,
        0
    ],
    [
        6,
        4,
        0
    ],
    [
        6,
        5,
        0
    ],
    [
        6,
        6,
        0
    ],
    [
        6,
        7,
        1
    ],
    [
        6,
        8,
        10
    ],
    [
        6,
        9,
        35
    ],
    [
        6,
        10,
        30
    ],
    [
        6,
        11,
        27
    ],
    [
        6,
        12,
        34
    ],
    [
        6,
        13,
        31
    ],
    [
        6,
        14,
        30
    ],
    [
        6,
        15,
        24
    ],
    [
        6,
        16,
        19
    ],
    [
        6,
        17,
        18
    ],
    [
        6,
        18,
        23
    ],
    [
        6,
        19,
        7
    ],
    [
        6,
        20,
        17
    ],
    [
        6,
        21,
        19
    ],
    [
        6,
        22,
        17
    ],
    [
        6,
        23,
        13
    ]
];

describe('Heatmap', () => {
    let heatmapChart;
    let container;

    // adds an html fixture to the DOM
    beforeEach(() => {
        const fixture = '<div id="fixture"><div class="container"></div></div>';

        document.body.insertAdjacentHTML('afterbegin', fixture);
    });

    // remove the html fixture from the DOM
    afterEach(function() {
        document.body.removeChild(document.getElementById('fixture'));
    });

    describe('rendering the chart', () => {

        beforeEach(() => {
            heatmapChart = heatmap();
            container = d3.select('.container');

            container.datum(data).call(heatmapChart);
        });

        afterEach(() => {
            container.remove();
        })

        it('should render a heatmap', () => {
            let expected = 1;
            let actual = container.select('.heatmap').nodes().length;

            expect(actual).toEqual(expected);
        });

        it('should render a container-group', () => {
            let expected = 1;
            let actual = container.select('g.container-group').nodes().length;

            expect(actual).toEqual(expected);
        });

        it('should render a chart-group', () => {
            let expected = 1;
            let actual = container.select('g.chart-group').nodes().length;

            expect(actual).toEqual(expected);
        });

        it('should render a metadata-group', () => {
            let expected = 1;
            let actual = container.select('g.metadata-group').nodes().length;

            expect(actual).toEqual(expected);
        });

        it('should render a box for each hour in the week', () => {
            let expected = 24 * 7;
            let actual = container.selectAll('.box').nodes().length;

            expect(actual).toEqual(expected);
        });

        it('should render the day labels', () => {
            let expected = 7;
            let actual = container.selectAll('.day-label').nodes().length;

            expect(actual).toEqual(expected);
        });

        it('should render the hour labels', () => {
            let expected = 24;
            let actual = container.selectAll('.hour-label').nodes().length;

            expect(actual).toEqual(expected);
        });
    });

    describe('configuring the chart', () => {

        beforeEach(() => {
            heatmapChart = heatmap();
            container = d3.select('.container');

            container.datum(data).call(heatmapChart);
        });

        afterEach(() => {
            container.remove();
        })

        it('should provide colorSchema getter and setter', () => {
            let previous = heatmapChart.colorSchema(),
                expected = ['#FFFFFF'],
                actual;

            heatmapChart.colorSchema(expected);
            actual = heatmapChart.colorSchema();

            expect(previous).not.toBe(actual);
            expect(actual).toBe(expected);
        });

        it('should provide height getter and setter', () => {
            let previous = heatmapChart.height(),
                expected = 100,
                actual;

            heatmapChart.height(expected);
            actual = heatmapChart.height();

            expect(previous).not.toBe(actual);
            expect(actual).toBe(expected);
        });

        it('should provide margin getter and setter', () => {
            let previous = heatmapChart.margin(),
                expected = {
                    top: 2,
                    bottom: 2,
                    left: 2,
                    right: 2
                },
                actual;

            heatmapChart.margin(expected);
            actual = heatmapChart.margin();

            expect(previous).not.toBe(actual);
            expect(actual).toBe(expected);
        });

        it('should provide width getter and setter', () => {
            let previous = heatmapChart.width(),
                expected = 100,
                actual;

            heatmapChart.width(expected);
            actual = heatmapChart.width();

            expect(previous).not.toBe(actual);
            expect(actual).toBe(expected);
        });
    });
});