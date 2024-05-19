import { Component, inject, Input } from '@angular/core'
import { HlmBadgeDirective } from '@spartan-ng/ui-badge-helm'
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm'
import { provideIcons } from '@ng-icons/core'
import { lucideHash } from '@ng-icons/lucide'
import { Router } from '@angular/router'
import { SearchService } from '../../../core/services/search.service'

@Component({
    selector: 'app-tag-badge',
    standalone: true,
    imports: [HlmBadgeDirective, HlmIconComponent],
    templateUrl: './tag-badge.component.html',
    styleUrl: './tag-badge.component.css',
    providers: [provideIcons({ lucideHash })],
})
export class TagBadgeComponent {
    @Input({ required: true }) tag!: string

    searchService = inject(SearchService)
    router = inject(Router)

    handleTagClick() {
        const old = this.searchService.filter()
        if (old.tags.includes(this.tag)) return

        const filter = {
            ...old,
            tags: [...old.tags, this.tag],
        }
        this.router.navigate(['/questions'], {
            queryParams: {
                filter: encodeURIComponent(JSON.stringify(filter)),
            },
            queryParamsHandling: 'merge',
        })
    }
}
