import { inject, Injectable, signal } from '@angular/core'
import { Router } from '@angular/router'

export type SearchFilter = {
    //tags: string[]
}

@Injectable({
    providedIn: 'root',
})
export class SearchService {
    router = inject(Router)

    query = signal('')
    filter = signal<SearchFilter>({})

    handleSearch() {
        this.router.navigate(['/questions'], {
            queryParams: { query: this.query() },
            queryParamsHandling: 'merge',
        })
    }

    handleFilter(filter: SearchFilter) {
        this.filter.set(filter)

        this.router.navigate(['/questions'], {
            queryParams: {
                filter: encodeURIComponent(JSON.stringify(filter)),
            },
            queryParamsHandling: 'merge',
        })
    }

    handleFilterLoad(filter: SearchFilter) {
        this.filter.set(filter)
    }

    handleQueryChange(query: string) {
        this.query.set(query)
    }
}
