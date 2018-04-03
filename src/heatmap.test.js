import d3 from 'd3';
import heatmap from './heatmap';

describe('Heatmap', () => {
    let heatmapChart = heatmap;

    it('should be a heatmap', () => {
        let expected = 'heatmap';
        let actual = heatmapChart.name;

        expect(actual).toEqual(expected);
    });
});