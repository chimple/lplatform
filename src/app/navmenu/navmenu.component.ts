import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.css']
})
export class NavmenuComponent implements OnInit {

	constructor(private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {

        this.router.navigate(['testNotTaken'], { relativeTo: this.route });
    
    }


}
