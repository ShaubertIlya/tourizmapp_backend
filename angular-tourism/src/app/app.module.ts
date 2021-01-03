import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ManagersComponent } from './managers/managers.component';

import { FormsModule } from '@angular/forms';
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
    SightFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	FormsModule,
	HttpClientModule,
	FileUploadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
