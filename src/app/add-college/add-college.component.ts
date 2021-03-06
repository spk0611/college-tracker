import { Component, Output, EventEmitter, Input, ViewEncapsulation } from '@angular/core';
import { College } from '../models/College';
import { CollegeStorageService } from '../services/CollegeStorageService';
import { UnlessDirective } from '../shared/myUnless.directive';

@Component({
	moduleId: module.id,
	selector: 'add-college',
	templateUrl: 'add-college.component.html',
	styleUrls: ['add-college.component.css'],
	providers: [CollegeStorageService],
	directives: [UnlessDirective]
})

export class AddCollege {
	@Input() colleges: College[];
	@Output() collegeAdded: EventEmitter<College> = new EventEmitter<College>();
	constructor(private _collegeStorageService: CollegeStorageService) { }
	selectedCollege: College = null;

	addCollege () {
		let indexInUnappliedCollegesList: number = this.colleges.indexOf(this.selectedCollege);
		if (indexInUnappliedCollegesList > -1) {
			this.colleges.splice(indexInUnappliedCollegesList, 1);
		}
		this.selectedCollege.isApplied = !this.selectedCollege.isApplied;
		this._collegeStorageService.save(this.selectedCollege);
		this.collegeAdded.emit(this.selectedCollege);
		this.selectedCollege = this.colleges && this.colleges.length > 0 ? this.colleges[0] : null;
	}
}