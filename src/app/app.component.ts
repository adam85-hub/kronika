import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
import { PageComponent } from './pages/page/page.component';
import { Links, InneLinks } from './links';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  
  titleStyle: string = "";
  isMainDisplayed: boolean = true;
  isModeratorDisplayed: boolean = false;

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

    this.isModeratorDisplayed = e.isModerator;
  }

  //#region NavbarLogic  

  // Responsywny navbar
  isNavbarExpanded: boolean = true;
  isSidebarExpanded: boolean = false;
  mainWhenNavbarNotCollapsed: string = "";
  Links = Links;
  InneLinks = InneLinks;
  
  //Zmienne przechowujące klasy odpowiadają za to że navbar przykleja się do góry strony przy przewijaniu
  fixedClass: string = "navbar-absolute";

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

  //Otwiera boczną nawigację kiedy navbar jest collapsed
  openSidebar() : void {
    this.isSidebarExpanded = true;
  }

  sidebarCollapse() {
    this.isSidebarExpanded = false;
  }

  //#endregion
  
  showNotification: Subject<void> = new Subject();

  copyEmail(): void {
    navigator.clipboard.writeText("adam.bialik85@gmail.com");
    this.showNotification.next();
  }
}

//Set-ExecutionPolicy -Scope Process Unrestricted
