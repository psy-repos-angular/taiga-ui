import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'ratingPercent'})
export class TuiRatingPercentPipe implements PipeTransform {
    transform(rate: number, max: number): number {
        return (100 * rate) / max;
    }
}
