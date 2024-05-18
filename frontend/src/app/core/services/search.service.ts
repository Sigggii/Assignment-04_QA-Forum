import { inject, Injectable, signal } from '@angular/core'
import { Router } from '@angular/router'

export type SearchFilter = {
    tags: string[]
    sort: 'newest' | 'highestScore' | 'mostAnswers'
    filter: 'all' | 'unanswered' | 'answered'
}

export const sortOptions: Record<SearchFilter['sort'], string> = {
    newest: 'Newest',
    highestScore: 'Highest Score',
    mostAnswers: 'Most Answers',
}
export const filterOptions: Record<SearchFilter['filter'], string> = {
    all: 'All',
    unanswered: 'Unanswered',
    answered: 'Answered',
}

@Injectable({
    providedIn: 'root',
})
export class SearchService {
    router = inject(Router)

    query = signal('')
    filter = signal<SearchFilter>({
        tags: [],
        sort: 'newest',
        filter: 'all',
    })

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

    handleFilterLoad(filter: Partial<SearchFilter>) {
        this.filter.update(prev => ({ ...prev, ...filter }))
    }

    handleQueryChange(query: string) {
        this.query.set(query)
    }
}
