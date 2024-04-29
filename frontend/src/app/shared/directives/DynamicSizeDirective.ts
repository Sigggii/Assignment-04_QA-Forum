import {
    Directive,
    ElementRef,
    HostListener,
    AfterContentChecked,
} from '@angular/core'

@Directive({
    selector: '[appDynamicSize]',
    standalone: true,
})
export class DynamicSizeDirective implements AfterContentChecked {
    constructor(private el: ElementRef) {}

    @HostListener('input') onInput() {
        this.resizeInput()
    }

    ngAfterContentChecked() {
        this.resizeInput()
    }

    resizeInput() {
        const value = this.el.nativeElement.value as string
        const size = Math.max(value.length, 1)
        this.el.nativeElement.size = size
    }
}
