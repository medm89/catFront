import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Icat } from '../interface/cat.interface';

@Injectable({
  providedIn: 'root'
})
export class CatsService {
  
  public loading: boolean = false;

  constructor( private http: HttpClient) { }

 
  getCats():Observable<Icat[]>{
    //let token = localStorage.getItem('token') || '';
    if(  this.loading){
      return of([]);
    }
    this.loading = true;
    return this.http.get<Icat[]>(`${environment.apiUrl}/api/cats/breeds/`).pipe(
      catchError((error) => {
        console.error('Error extrayendo gatos:', error);
        this.loading = false; 
        return of([]);
      }),
      tap(() => {
        this.loading = false; 
      })
    );
  }
/*
  searchMovies( texto: string ):Observable<Movie[]> {

    const params = { search: texto };

    return this.http.get<MoviesResponse>(`${ environment.apiUrl }/api/movies/search/`, {
      params
    }).pipe(
      map( resp => resp.results )
    )

  }
  getMovieDetail( id: string ){
    const params = { movieId: id };
    return this.http.get<MovieResponse>(`${ environment.apiUrl }/api/movies/search/`, {
      params
    }).pipe(
      catchError( err => of(null) )
    )
  }
  saveMovieFav( id: string ){
    let token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      Authorization: token
    });
    const params = { movieid: id };
      return this.http.post<FavResponse>(`${ environment.apiUrl }/api/movies/saveFav`,params,{headers});
  }
  getMovieFav(){
    let token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      Authorization: token
    });
    const params = {  };
      return this.http.post<Movie[]>(`${ environment.apiUrl }/api/movies/getFav`,params,{headers});
  }*/
}

