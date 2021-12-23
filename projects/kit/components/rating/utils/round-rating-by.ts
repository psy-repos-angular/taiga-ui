export function roundRatingBy({value, max}: {value: number; max: number}): number {
    let rating: number = value;

    rating = Math.ceil(rating);

    if (rating > max) {
        rating = max;
    } else if (rating < 0) {
        rating = 0;
    }

    return rating;
}
