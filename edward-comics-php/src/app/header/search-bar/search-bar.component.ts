import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  searchForm!: FormGroup; 

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
     this.initForm();
 }

  initForm() {
    this.searchForm = this.formBuilder.group({
    searchText: ''
   });
 }

  onSubmitForm() {
    const searchValue = this.searchForm.value.searchText;
    this.router.navigate(['/liste', { searchText: searchValue}]);
    } 
}
 




