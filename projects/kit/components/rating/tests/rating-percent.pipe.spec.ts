import {TuiRatingPercentPipe} from '../pipes/rating-percent.pipe';

describe('TuiRatingPercentPipe', () => {
    const pipe = new TuiRatingPercentPipe();
    const max = 5;

    it('calculate wrapper width', () => {
        // 5 of 5 = 100%
        expect(pipe.transform(5, max)).toEqual(100);

        // 4 of 5 = 80%
        expect(pipe.transform(4, max)).toEqual(80);

        // 3 of 5 = 60%
        expect(pipe.transform(3, max)).toEqual(60);

        // 2 of 5 = 40%
        expect(pipe.transform(2, max)).toEqual(40);

        // 1 of 5 = 20%
        expect(pipe.transform(1, max)).toEqual(20);

        // 0 of 5 = 0%
        expect(pipe.transform(0, max)).toEqual(0);
    });
});
