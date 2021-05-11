import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Managers_sortService } from './managers/manager_sort.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ManagersComponent } from './managers/managers.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ManagerFormComponent } from './manager-form/manager-form.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleFormComponent } from './article-form/article-form.component';
import { SyscatComponent } from './syscat/syscat.component';
import { CountriesComponent } from './countries/countries.component';
import { CountryFormComponent } from './country-form/country-form.component';
import { CitiesComponent } from './cities/cities.component';
import { CityFormComponent } from './city-form/city-form.component';
import { TagsComponent } from './tags/tags.component';
import { TagFormComponent } from './tag-form/tag-form.component';
import { CompaniesComponent } from './companies/companies.component';
import { CompanyFormComponent } from './company-form/company-form.component';
import { DiscountsComponent } from './discounts/discounts.component';
import { DiscountFormComponent } from './discount-form/discount-form.component';
import { ArComponent } from './ar/ar.component';
import { ArFormComponent } from './ar-form/ar-form.component';
import { SightsComponent } from './sights/sights.component';
import { SightFormComponent } from './sight-form/sight-form.component';

import { FileUploadModule } from 'ng2-file-upload';


import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { NgbdSortableHeader } from './users/sortable.directive';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { VrComponent } from './vr/vr.component';
import { VrFormComponent } from './vr-form/vr-form.component';
import { CommentsComponent } from './comments/comments.component';
import { CommentFormComponent } from './comment-form/comment-form.component';
import { CommentDetailsComponent } from './comment-details/comment-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SliderComponent } from './slider/slider.component';
import { SliderListComponent } from './slider-list/slider-list.component';
import { DiscountSliderComponent } from './discount-slider/discount-slider.component';
import { ArticlesSliderComponent } from './articles-slider/articles-slider.component';
import { ArticlesSliderListComponent } from './articles-slider-list/articles-slider-list.component';
import { DiscountSliderListComponent } from './discount-slider-list/discount-slider-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ManagersComponent,
    ManagerFormComponent,
    LoginComponent,
    UsersComponent,
    UserFormComponent,
    UserDetailsComponent,
    ArticlesComponent,
    ArticleFormComponent,
    SyscatComponent,
    CountriesComponent,
    CountryFormComponent,
    CitiesComponent,
    CityFormComponent,
    TagsComponent,
    TagFormComponent,
    CompaniesComponent,
    CompanyFormComponent,
    DiscountsComponent,
    DiscountFormComponent,
    ArComponent,
    ArFormComponent,
    SightsComponent,
    SightFormComponent,
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    VrComponent,
    VrFormComponent,
    CommentsComponent,
    CommentFormComponent,
    CommentDetailsComponent,
    NgbdSortableHeader,
    SliderComponent,
    SliderListComponent,
    DiscountSliderComponent,
    ArticlesSliderComponent,
    ArticlesSliderListComponent,
    DiscountSliderListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	FormsModule,
  ReactiveFormsModule,
	HttpClientModule,
	FileUploadModule,
	NgbModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
