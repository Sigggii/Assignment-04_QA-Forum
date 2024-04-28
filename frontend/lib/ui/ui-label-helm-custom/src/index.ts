import { NgModule } from '@angular/core'
import { HlmLabelDirective } from './lib/hlm-label.directive'

export * from './lib/hlm-label.directive'

/*
 * Changes:
 *  - increase spacing between label and input
 *  - increase label size
 */
@NgModule({
    imports: [HlmLabelDirective],
    exports: [HlmLabelDirective],
})
export class HlmLabelModule {}
