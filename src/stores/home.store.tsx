import { action, observable } from 'mobx';
import { Film } from '../interfaces/starwars.interface';
import * as starWarsApi from '../apis/starwars.api';
import { ToastAndroid } from 'react-native';

export default class HomeStore {
  @observable films: Film[] = []
  @observable film: Film[] | any = [];

  @action getFilms = async () => {
    try {
      const { data: films } = await starWarsApi.getFilms();
      this.films = films;
    } catch (error) {
      this.films = [];
      ToastAndroid.show(
        "Não foi possível listar os filmes.",
        ToastAndroid.LONG
      );
    }
  }

  @action getFilmById = async (id: number) => {
    try {
      this.film = {};
      const { data: film } = await starWarsApi.getFilmById(id);
      this.film = film;
    } catch (error) {
      this.film = {};
      ToastAndroid.show(
        `Não foi possível listar o filme: ${id}`,
        ToastAndroid.LONG
      );
    }
  }
}

const homeStore = new HomeStore();

export { homeStore };