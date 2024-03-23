import { makeAutoObservable, toJS } from 'mobx';

export class UserStore {
  rootStore;

  company = '';
  email = '';
  favorite = [];
  firstName = '';
  fullName = '';
  lastName = '';
  niche = '';
  phone = '';
  url = '';
  username = '';
  website = '';

  setUser(value) {
    this.company = value.company;
    this.email = value.email;
    this.favorite = value.favorite;
    this.firstName = value.firstName;
    this.fullName = value.fullName;
    this.lastName = value.lastName;
    this.niche = value.niche;
    this.phone = value.phone;
    this.url = value.url;
    this.username = value.username;
    this.website = value.website;
    localStorage.setItem('userUrl', value.url);
  }

  clearUser() {
    this.setIsLogged(false);
    this.company = '';
    this.email = '';
    this.favorite = [];
    this.firstName = '';
    this.fullName = '';
    this.lastName = '';
    this.niche = '';
    this.phone = '';
    this.url = '';
    this.username = '';
    this.website = '';
    localStorage.removeItem('token');
    localStorage.removeItem('userUrl');
    window.location.reload();
  }

  isLogged = false;

  setIsLogged(value) {
    this.isLogged = value;
  }

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, { rootStore: false }, { autoBind: true });
  }
}
