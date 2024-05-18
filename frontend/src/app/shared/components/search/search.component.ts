import { Component, inject } from '@angular/core'
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm'
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm'
import { HlmInputDirective } from '@spartan-ng/ui-input-helm'
import { SearchService } from '../../../core/services/search.service'
import { provideIcons } from '@ng-icons/core'
import { lucideSearch } from '@ng-icons/lucide'

@Component({
    selector: 'app-search',
    standalone: true,
    imports: [HlmButtonDirective, HlmIconComponent, HlmInputDirective],
    templateUrl: './search.component.html',
    styleUrl: './search.component.css',
    providers: [
        provideIcons({
            lucideSearch,
        }),
    ],
})
export class SearchComponent {
    searchService = inject(SearchService)

    handleSearchChange(event: Event) {
        const target = event.target as HTMLInputElement
        this.searchService.handleQueryChange(target.value)
    }

    handleSearchSubmit(event: Event) {
        event.preventDefault()
        this.searchService.handleSearch()
    }
}
