import { Component } from '@angular/core';

@Component({
	selector: 'app-<%= dasherize(name) %>-component',
	templateUrl: './<%= dasherize(name) %>.component.html',
	styleUrls: ['./<%= dasherize(name) %>.component.scss'],
})
export class <%= classify(name) %>Component implements OnInit {
  name = '<%= name %>';
	
  constructor() { }

  ngOnInit(): void {
  }
}