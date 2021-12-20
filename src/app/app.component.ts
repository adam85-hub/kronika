import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
import { PageComponent } from './pages/page/page.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  
  titleStyle: string = "";
  isMainDisplayed: boolean = true;

  ngOnInit(): void {
    //Change navbar state
    let e = {
      target: {
        innerWidth: window.innerWidth
      }
    };
    this.onResize(e);
  }

  changePage(e: PageComponent) {
    this.isMainDisplayed = e.isMain();
    //Jeżeli wyświetlana strona nie jest stroną główną to nie wyświetlaj sekcji z tytułem i logiem parafii
    if(this.isMainDisplayed === false){
      this.titleStyle = "display: none";
      this.fixedClass = "navbar-fixed";
    }
    else {
      this.titleStyle = "";
      this.onScroll();
    }    
  }

  //#region NavbarLogic  

  // Responsywny navbar
  isNavbarExpanded: boolean = true;
  mainWhenNavbarNotCollapsed: string = "";
  
  //Zmienne przechowujące klasy odpowiadają za to że navbar przykleja się do góry strony przy przewijaniu
  fixedClass: string = "navbar-absolute";

  //Zmienne odpowiedzalne za wyświetlanie innych
  isInneExpanded: boolean = false;
  innePadding: string = "20px";


  //Obsługuje zmienianie się navbara przy zmianie wielkości okna
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    //Navbar collapsed
    if(event.target.innerWidth < 1270) {
      this.isNavbarExpanded = false;
    }
    //Navbar expanded
    else {
      this.isNavbarExpanded = true;
    }
  }

  //Obsługuje przyklejanie się navbara do góry okna przy przewijaniu
  onScroll(event?: Event){
    if(window.scrollY >= 140 && this.isMainDisplayed) {
      this.fixedClass = "navbar-fixed";
    }
    else if (window.scrollY < 140 && this.isMainDisplayed) { 
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

  //Otwiera boczną nawigację kiedy navbar jest collapsed
  openSideNav() : void {
    console.log("ujhehe");
  }

  //#endregion
  
}

// Set-ExecutionPolicy -Scope Process Unrestricted