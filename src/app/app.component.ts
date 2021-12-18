import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  
  ngOnInit(): void {
    //Change navbar state
    let e = {
      target: {
        innerWidth: window.innerWidth
      }
    };
    this.onResize(e);
  }

  //#region NavbarLogic
  // Responsywny navbar
  isNavbarExtended: boolean = true;
  
  //Zmienne przechowujące klasy odpowiadają za to że navbar przykleja się do góry strony przy przewijaniu
  fixedClass: string = "navbar-absolute";

  //Zmienne odpowiedzalne za wyświetlanie innych
  isInneExpanded: boolean = false;
  innePadding: string = "20px";


  //Obsługuje zmienianie się navbara przy zmianie wielkości okna
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if(event.target.innerWidth < 910) {
      this.isNavbarExtended = false;
    }
    else {
      this.isNavbarExtended = true;
    }
  }

  //Obsługuje przyklejanie się navbara do góry okna przy przewijaniu
  onScroll(event: Event){
    if(window.scrollY >= 140) {
      this.fixedClass = "navbar-fixed";
    }
    else { 
      this.fixedClass = "navbar-absolute";
    }
  }

  //Navbar element inne expand
  expandInne(e : Event): void {
    this.isInneExpanded = true;
    this.innePadding = "0";
  }

  //Navbar element inne collapse
  collapseInne(e : Event): void {
    this.isInneExpanded = false;
    this.innePadding = "20px";
  }
  //#endregion
  

}

// Set-ExecutionPolicy -Scope Process Unrestricted