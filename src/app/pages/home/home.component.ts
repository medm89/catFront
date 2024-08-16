import { Component, HostListener } from '@angular/core';
import { Icat } from 'src/app/interface/cat.interface';
import { CatsService } from 'src/app/services/cats.service';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  cats: Icat[] = [];
  selectedCatId: string | null = null;;
  constructor(private catService: CatsService){
      
  }
   ngOnInit(){
    this.catService.getCats().subscribe( resp =>{
      this.cats = resp;
   });   
   }
   onCatChange(event: MatSelectChange){
    this.selectedCatId = event.value; 
   }

   ngOnDestroy() {
   
  }

}
