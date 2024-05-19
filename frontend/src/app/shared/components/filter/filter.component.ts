import { Component, inject, OnInit } from '@angular/core'
import { BrnToggleDirective } from '@spartan-ng/ui-toggle-brain'
import { HlmToggleDirective } from '@spartan-ng/ui-toggle-helm'
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm'
import {
    BrnCollapsibleComponent,
    BrnCollapsibleContentComponent,
    BrnCollapsibleTriggerDirective,
} from '@spartan-ng/ui-collapsible-brain'
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm'
import { provideIcons } from '@ng-icons/core'
import { lucideFilter } from '@ng-icons/lucide'
import {
    filterOptions,
    SearchFilter,
    SearchService,
    sortOptions,
} from '../../../core/services/search.service'
import {
    HlmRadioDirective,
    HlmRadioGroupDirective,
    HlmRadioIndicatorComponent,
} from '@spartan-ng/ui-radiogroup-helm'
import {
    BrnRadioChange,
    BrnRadioComponent,
    BrnRadioGroupComponent,
} from '@spartan-ng/ui-radiogroup-brain'
import { BadgeInputComponent } from '../badge-input/badge-input.component'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'

@Component({
    selector: 'app-filter',
    standalone: true,
    imports: [
        BrnToggleDirective,
        HlmToggleDirective,
        HlmButtonDirective,
        BrnCollapsibleComponent,
        BrnCollapsibleTriggerDirective,
        HlmIconComponent,
        BrnCollapsibleContentComponent,
        HlmRadioGroupDirective,
        HlmRadioDirective,
        HlmRadioIndicatorComponent,
        BrnRadioComponent,
        BrnRadioGroupComponent,
        BadgeInputComponent,
        ReactiveFormsModule,
    ],
    templateUrl: './filter.component.html',
    styleUrl: './filter.component.css',
    providers: [provideIcons({ lucideFilter })],
})
export class FilterComponent implements OnInit {
    searchService = inject(SearchService)

    selectedSort: SearchFilter['sort'] = this.searchService.filter().sort
    selectedFilter: SearchFilter['filter'] = this.searchService.filter().filter
    tags: string[] = this.searchService.filter().tags

    tagsForm = new FormGroup({
        tags: new FormControl<string[]>(this.tags),
    })

    handleApplyFilter() {
        this.searchService.handleFilter({
            sort: this.selectedSort,
            filter: this.selectedFilter,
            tags: this.tagsForm.controls.tags.value ?? [],
        })
    }

    handleResetFilter() {
        this.selectedSort = 'newest'
        this.selectedFilter = 'all'
        this.tags = []

        this.tagsForm.controls.tags.setValue(this.tags)
        this.searchService.handleFilter({
            sort: this.selectedSort,
            filter: this.selectedFilter,
            tags: this.tags,
        })
    }

    handleChangeSort(event: BrnRadioChange) {
        this.selectedSort = event.value as SearchFilter['sort']
    }

    handleChangeFilter(event: BrnRadioChange) {
        this.selectedFilter = event.value as SearchFilter['filter']
    }

    toggleFilterCollapsible() {
        document.getElementById('collabsible')!.classList.toggle('hidden')
    }

    ngOnInit(): void {
        this.searchService.filterObservable.subscribe(newValue => {
            this.tagsForm.controls.tags.setValue(newValue.tags)
        })
    }

    protected readonly sortOptions = sortOptions
    protected readonly Object = Object
    protected readonly filterOptions = filterOptions
}
