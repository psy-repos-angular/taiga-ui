import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    forwardRef,
    HostBinding,
    Inject,
    Input,
    Optional,
    Self,
} from '@angular/core';
import {NgControl} from '@angular/forms';
import {AbstractTuiControl, TUI_FOCUSABLE_ITEM_ACCESSOR} from '@taiga-ui/cdk';

import {RatingOptions, TUI_RATING_OPTIONS} from './rating.options';
import {roundRatingBy} from './utils/round-rating-by';

@Component({
    selector: 'tui-rating',
    templateUrl: './rating.template.html',
    styleUrls: ['./rating.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: TUI_FOCUSABLE_ITEM_ACCESSOR,
            useExisting: forwardRef(() => TuiRatingComponent),
        },
    ],
})
export class TuiRatingComponent extends AbstractTuiControl<number> {
    @Input() max: number = this.options.max;
    @Input() iconNormal: string = this.options.iconNormal;
    @Input() iconFilled: string = this.options.iconFilled;
    focused: boolean = true;

    @HostBinding('class._disabled')
    get computedDisabled(): boolean {
        return this.disabled;
    }

    constructor(
        @Optional()
        @Self()
        @Inject(NgControl)
        ngControl: NgControl | null,
        @Inject(ChangeDetectorRef)
        changeDetectorRef: ChangeDetectorRef,
        @Inject(TUI_RATING_OPTIONS)
        private readonly options: RatingOptions,
    ) {
        super(ngControl, changeDetectorRef);
    }

    get isFocusable(): boolean {
        return !(this.readOnly || this.disabled);
    }

    setRateByIndex(index: number): void {
        const computed = this.getComputedRatingValue(this.max - index);
        const toggled = this.value === computed ? 0 : computed;

        this.updateValue(toggled);
    }

    setRate(rate: number): void {
        const computed = this.getComputedRatingValue(rate);

        this.updateValue(computed);
    }

    protected getFallbackValue(): number {
        return 0;
    }

    private getComputedRatingValue(value: number): number {
        return roundRatingBy({value, max: this.max});
    }
}
