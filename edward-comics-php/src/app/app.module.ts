import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ListeArticleComponent } from './liste-article/liste-article.component';
import { DetailArticleComponent } from './detail-article/detail-article.component';
import { PanierComponent } from './panier/panier.component';
import { PaiementComponent } from './paiement/paiement.component';
import { ModalValidationComponent } from './modal-validation/modal-validation.component';
import { DetailCompteComponent } from './detail-compte/detail-compte.component';
import { ContactComponent } from './contact/contact.component';
import { SearchBarComponent } from './header/search-bar/search-bar.component';
import { MenuComponent } from './header/menu/menu.component';
import { MeteoComponent } from './footer/meteo/meteo.component';
import { FiltreComponent } from './liste-article/filtre/filtre.component';
import { TriComponent } from './liste-article/tri/tri.component';
import { CarouselCardComponent } from './carousel-card/carousel-card.component';
import { CarouselImageComponent } from './carousel-image/carousel-image.component';
import { ValidationAchatComponent } from './validation-achat/validation-achat.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ComicsService } from './services/comics.service';
import { MeteoService } from './services/meteo.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { SlideMenuModule } from 'primeng/slidemenu';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'primeng/carousel';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { AuthGuardService } from './services/auth-guard.service';
import { FacturationComponent } from './detail-compte/facturation/facturation.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgDynamicBreadcrumbModule } from 'ng-dynamic-breadcrumb';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { NoResultsComponent } from './no-results/no-results.component';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ListeArticleComponent,
    DetailArticleComponent,
    PanierComponent,
    PaiementComponent,
    ModalValidationComponent,
    DetailCompteComponent,
    ContactComponent,
    SearchBarComponent,
    MenuComponent,
    MeteoComponent,
    FiltreComponent,
    TriComponent,
    CarouselCardComponent,
    CarouselImageComponent,
    ValidationAchatComponent,
    SigninComponent,
    SignupComponent,
    FourOhFourComponent,
    FacturationComponent,
    NoResultsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SlideMenuModule,
    ButtonModule,
    BrowserAnimationsModule,
    CarouselModule,
    BrowserAnimationsModule,
    NgbCarouselModule, 
    NgDynamicBreadcrumbModule,
    NgxPaginationModule,
    HttpClientModule
    ],
  providers: [
    ComicsService,
    MeteoService,
    AuthService, 
    ComicsService,
    AuthGuardService, 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
