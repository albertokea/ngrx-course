# NgrxExamples

Proyecto de ejemplo para el curso de NGRX generado con [Angular CLI](https://github.com/angular/angular-cli) version 15.1.1.
El proyecto consiste en una aplicación donde podemos ver algunas estadísticas históricas de los peores jugadores de fútbol de la liga española de primera división.

## Ejecución de la aplicación

Para ejecutar la aplicación es necesario ejecutar el servidor Json con `npm run back-server` y posteriormente la aplicación web con `npm run start`.

## Explicaciones

### Día 1

#### Estructura de la aplicación de ejemplo

Para comenzar este primer día de trabajo repasaremos rápidamente la estructura de la aplicación:

- Las funcionalidades están divididas en directorios a modo de dominios dentro del "features" en los cuales tendremos a su vez los siguientes directorios:
  - components: contiene componentes sin lógica, como tablas, cards, listas, etc. (componentes dummy).
  - containers: contiene componentes con lógica (pantallas).
  - models: interfaces y enumerados utilizados solo dentro del dominio.
  - services: servicios para conectar con el backend.

#### Instalando NgRx

Comprobamos que para entrar en la aplicación necesitamos iniciar sesión. Para ello vamos a utilizar un estado que mantenga la información de la sesión de usuario.

Primero instalaremos [NgRx](https://ngrx.io/) y para ello ejecutamos el comando

```sh
ng add @ngrx/store@latest
```

Una vez instalado comprobamos que nos ha añadido en el app.module.ts en la sección de imports lo siguiente:

```sh
StoreModule.forRoot({}, {})
```

Este módulo habilita el uso de ngrx en nuestra aplicación y nos da la opción de cargar al inicio de la aplicación los diferentes estados que formarán nuestro "Store".
Instalamos también ngrxEffects, el cuál nos permitirá lanzar efectos secundarios asociados a las acciones. Para ello ejecutamos:

```sh
ng add @ngrx/effects@latest
```

Vamos a instalar también los schematics que nos ayudarán en el proceso de generar los diferentes estados:

```sh
npm install @ngrx/schematics --save-dev
```

Finalmente instalaremos la herramienta store-devetools. Una herramienta que, nos permite ver cómo va modificándose el Store y qué acciones se van ejecutando. Para instalarla ejecutamos el siguiente comando:

```sh
ng add @ngrx/store-devtools@latest
```

Nos instalaremos también en el navegador la herramienta Redux DevTools para ver de forma gráfica cómo se modifica el Store.

- [Chrome](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=es)
- [Firefox](https://addons.mozilla.org/es/firefox/addon/reduxdevtools/)

En el appModule debemos tener importadas las dependencias de ngrx, tanto el StoreModule como el EffectsModule, así como la dependencia del store-devtools.

```javascript
StoreModule.forRoot({}, {}),
  EffectsModule.forRoot([]),
  StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() });
```

#### Generando un estado "clásico"

Vamos a generar el estado para gestionar la autenticación. En nuestro ejemplo, la autenticación no va a pertenecer a una feature concreta, sino que va a ser un estado global de la aplicación que deberá cargarse siempre que la aplicación se inicie. Además será un estado compartido que podrá ser utilizado desde diferentes features.
Para ello vamos a generar los archivos del estado en el directorio "shared/auth" en un subdirectorio llamado "state". Además, queremos que se cargue con el módulo auth.module, el cuál cargaremos al iniciar la aplicación, por lo que añadiremos la opción "-m shared/auth/shared-auth.module.ts" para indicar en qué módulo queremos que se cargue nuestro estado.

Para generar el estado para la autenticación vamos a ejecutar el siguiente comando:

```sh
ng generate @ngrx/schematics:feature shared/auth/state/Auth -m shared/auth/shared-auth.module.ts --skip-tests
```

Si no nos encuentra @ngrx/schematics estableceremos los schematics por defecto siguientes:

ng config cli.defaultCollection @ngrx/schematics

Vemos que nos ha generado un directorio en shared/auth/state dentro del cual ha creado ficheros para acciones, efectos, reducer y selectores con contenido de ejemplo. Comprobamos también que se ha registrado el feature del estado en el módulo shared-auth.module.ts, así como los efectos.

En primer lugar, definiremos el objeto que contendrá la información de nuestro estado. Queremos guardar la información que nos devuelve el login, el id de usuario y el accessToken. Además vamos a añadir un campo para almacenar errores y otro para conocer cuándo el estado está siendo modificado porque hay alguna acción en curso: Para ello iremos al fichero auth.reducer.ts y crearemos la interfaz siguiente:

```javascript
export interface State {
  id: number | null;
  accessToken: string | null;
  error: string | null;
  loading: boolean;
}
```

Definimos también el estado inicial con todos sus campos a nulo.
Añadimos la dependencia de SharedAuthModule a los imports de login.module.ts.

```javascript
imports: [
  CommonModule,
  FormsModule,
  SharedAuthModule,
  ReactiveFormsModule,
  RouterModule.forChild([
    {
      path: "",
      component: LoginContainerComponent,
    },
  ]),
];
```

Si abrimos el navegador y entramos en el plugin de reduxDevTools podremos ver cómo se carga el estado auth por defecto al entrar en la aplicación y aparecer la pantalla de login. Sin embargo, si entramos directamente en la url localhost/home vemos que no hay ningún estado ¿por qué?. En este caso, hemos creado el estado auth como feature que se carga por lazyLoading al entrar en la pantalla de login.
El estado de auth debería ser global, ya que con él podríamos crear guards que impidan el acceso a pantallas sin estar logueado. Si queremos que un estado sea totalmente global tenemos dos opciones:

- Añadirlo al StoreModule.forRoot y al EffectsModule.forRoot del app.module.ts
- Añadirlos al módulo shared-auth.module.ts como feature e importar el módulo en el app.module.ts

A continuación definimos las acciones. Eliminaremos las acciones por defecto creadas y crearemos unas con una semántica más correcta.

```javascript
export const userLogin = createAction(
  '[Login Page] Login User',
  props<{ email: string; password: string }>()
);

export const loginUserSuccess = createAction(
  '[Auth API] Login User Success',
  props<{ id: number; accessToken: string }>()
);

export const loginUserFailure = createAction(
  '[Auth API] Login User  Failure',
  props<{ error: any }>()
);

```

A continuación tenemos que modificar el reducer para indicar cómo cambia el estado según las acciones que se han ejecutado.
En el reducer, la acción loginUserSuccess generará un nuevo estado con la información recuperar del servicio de login.

```javascript
initialState,
  on(AuthActions.userLogin, (state) => ({ ...state, loading: true })),
  on(AuthActions.loginUserSuccess, (state, action) => ({
    ...state,
    id: action.id,
    accessToken: action.accessToken,
    loading: false,
  })),
  on(AuthActions.loginUserFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }));
```

Ya tenemos listas las acciones y el reducer. Ahora necesitamos disparar el efecto que llamará a backend una vez se lance la acción de loginUser. Para ello vamos al archivo de efectos y creamos el siguiente efecto:

```javascript
loginUser$ = createEffect(() => {
  return this.actions$.pipe(
    ofType(AuthActions.userLogin),
    switchMap((action) =>
      this.authService
        .loginUser({ email: action.email, password: action.password })
        .pipe(
          map((response) =>
            AuthActions.loginUserSuccess({
              id: response.user.id,
              accessToken: response.accessToken,
            })
          ),
          catchError((error) => of(AuthActions.loginUserFailure({ error })))
        )
    )
  );
});
```

Ahora necesitamos lanzar la acción de userLogin una vez se pulse el botón de "Entrar" en la pantalla de login. Para ello accedemos al componente login-container.component.ts y añadimos la dependencia del Store al constructor.

```javascript
constructor(private formBuilder: FormBuilder, private store: Store) {}
```

En el método sendLogin tenemos que llamar a la acción. Para ello utilizamos el método "dispatch" del store, el cuál nos permite lanzar acciones.

```javascript
sendLogin() {
    this.store.dispatch(
      AuthActions.userLogin({
        email: this.form.get('email')?.value,
        password: this.form.get('password')?.value,
      })
    );
  }
```

Si vamos al login y abrimos el reduxDevTools veremos cómo el estado "auth" se ha iniciado con los valores iniciales.
Si introducimos email y contraseña y pulsamos "Enter" veremos que se lanza la acción "Login user", la cuál a su vez lanzará "Login User Success" o "Login User Failure" en función de la respuesta de backend.

Si introducimos valores de usuario válidos:

- email: usuario@prueba.es
- password: patata

Vemos que se lanza la acción "Login User Success". Sin embargo, una vez logueado seguimos estando en la misma pantalla. ¿Cómo podemos hacer para que cuando el login sea exitoso la aplicación navegue a la home? La respuesta es creando un nuevo efecto.

Para ello volvemos al fichero auth.effects.ts, añadimos la dependencia del router al constructor y creamos el siguiente efecto:

```javascript
navigateToHome$ = createEffect(
  () =>
    this.actions$.pipe(
      ofType(AuthActions.loginUserSuccess),
      tap(() => this.router.navigate(["/home"]))
    ),
  { dispatch: false }
);
```

Este efecto tiene una peculiaridad. No lanza nuevas acciones, simplemente realiza una navegación. Cuando un efecto no lance acciones es necesario indicar `{ dispatch: false }`.

Ahora comprobamos cómo al realizar el login con éxito, la aplicación nos redirige a la pantalla de la home.

¿Cómo podemos hacer que se muestre un mensaje en la pantalla de login indicando que el login no es válido cuando nos devuelva un error el servicio de backend?

Para ello necesitamos en primer lugar un selector que nos permita saber si ha ocurrido algún error a la hora de hacer login.
Abrimos el fichero auth.selectors.ts y creamos un selector que, a partir del selectAuthState que nos devuelve el campo error.

```javascript
export const selectError = createSelector(
  selectAuthState,
  (state) => state.error
);
```

Ahora ya podemos ir al componente login-container.component.ts y conectarnos al selector.
Para obtener el valor nos suscribiremos a él desde la vista utilizando el pipe async de manera que sea la vista la que reaccione de forma reactiva a los cambios en el valor de User y además sea la que se desuscriba automáticamente del observable una vez se destruya el componente. Es importante hacer selectores específicos en lugar de devolver el estado al completo. Si nos suscribimos a un selector con el estado completo, cualquier cambio dentro de este provocará el refresco del componente. Si devolvemos únicamente los campos que necesitamos, sólo refrescaremos la vista en los casos en los que el valor devuelto por el selector cambie.

Importaremos los selectores con `import * as AuthSelectors from '@ngrx-example/shared/auth/state/auth.selectors';` y conectaremos con el selector selectError:

```javascript
error$ = this.store.select(AuthSelectors.selectError);
```

En la vista creamos un div con un mensaje de error y nos suscribimos al observable con el pipe async

```html
<div
  class="p-3 text-xl text-center text-red-900 bg-red-300"
  *ngIf="error$ | async"
>
  <p>Inicio de sesión incorrecto</p>
</div>
```

Vemos que en el perfil de usuario los datos que están mostrándose son datos estáticos. Lo que queremos es que se muestren los datos de usuario que están en el store y que recuperaremos a partir del método userProfile de UserProfileService.
Para ello vamos a generar un nuevo estado para los datos de usuario.

```sh
  ng generate @ngrx/schematics:feature features/user-profile/state/UserData -m features/user-profile/user-profile.module.ts --skip-tests
```

Vamos a crear las acciones necesarias para obtener los datos del perfil. Nuestro primer impulso puede ser crear la acción "loadProfile", pero las buenas prácticas de NgRx indican que las acciones deben estar asociadas a eventos de la aplicación, no a "comandos" lanzados por el usuario y no hay un evento de loadProfile a diferencia de userLogin, que si existe como evento cuando el usuario pulsa el botón de entrar. En este caso el evento que iniciará la carga del perfil del usuario es la entrada en la propia pantalla del perfil. Las acciones serán las siguientes:

```javascript

export const enterProfilePage = createAction(
  '[Profile Page] Enter Profile Page'
);

export const loadUserProfileSuccess = createAction(
  '[UserProfile Api] Load User Profile Success',
  props<{ user: User }>()
);

export const loadUserProfileFailure = createAction(
  '[UserProfile Api] Load User Profile Failure',
  props<{ error: any }>()
);

```

En el reducer.ts creamos el estado para guarda la información del usuario y definimos el estado inicial:

```javascript
export interface State {
  user: User | null;
  loading: boolean;
  error: string | null;
}
```

Además definimos los nuevos estados en la función reducer

```javascript
initialState,
  on(UserDataActions.enterProfilePage, (state) => ({
    ...state,
    loading: true,
  })),
  on(UserDataActions.loadUserProfileSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
  })),
  on(UserDataActions.loadUserProfileFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }));
```

Ahora tenemos que crear el efecto que conecte con el backend y se traiga los datos de usuario pero tenemos un problema: el servicio de backend necesita el identificador de usuario. ¿Dónde lo tenemos?. Si recordamos, el login nos devuelve el id del usuario logueado, pero éste id está en el store. ¿Cómo lo podemos recuperar?

En primer lugar, crearemos un selector en auth.selectors.ts que nos devuelva únicamente el id de usuario.

```javascript
export const selectUserId = createSelector(
  selectAuthState,
  (state) => state.id
);
```

En segundo lugar, creamos el efecto en user-data.effects. En este efecto recuperaremos del store el identificador de usuario y lo usaremos como parámetro en la llamada al servicio de backend. Para ello utilizamos el operador concatLatestFrom incluido en la librería ngrx. Este operador concatena el último valor emitido por el selector o la lista de selectores indicados. Además utilizamos un operador filter que evitará que se llame a backend de forma accidental si el valor de userId es nulo.

```javascript
loadUserProfile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserDataActions.enterProfilePage),
      concatLatestFrom(() => this.store.select(AuthSelectors.selectUserId)),
      filter(([action, userId]) => Boolean(userId)),
      switchMap(([action, userId]) =>
        this.userProfileService.userProfile(userId!).pipe(
          map((response) =>
            UserDataActions.loadUserProfileSuccess({
              user: response,
            })
          ),
          catchError((error) =>
            of(UserDataActions.loadUserProfileFailure({ error }))
          )
        )
      )
    );
  });
```

Necesitaremos también un selector que nos devuelva la información del usuario y si ha habido también un error. En este caso utilizaremos el patrón viewModel. En lugar de tener dos selectores y suscribirnos a los dos en el profile container, crearemos un selector que contenga la información que necesita cada vista y con el formato deseado.

```javascript
export const selectUserData = createSelector(
  selectUserDataState,
  (state) => state.user
);

export const selectError = createSelector(
  selectUserDataState,
  (state) => state.error
);

export const userProfileViewModel = createSelector(
  selectUserData,
  selectError,
  (userData, error) => ({ userData, error })
);
```

Ahora ya podemos ir al componente user-profile-container.component.ts, importar las acciones y selectores de user-profile, inyectar la dependencia del Store y lanzar la acción cuando entramos por primera vez en la pantalla. Para ello usaremos el método onInit.

```javascript
 ngOnInit(): void {
    this.store.dispatch(UserDataActions.enterProfilePage());
  }
```

Ahoras nos queda conectarnos al selector y suscribirnos en la vista.

```javascript
userProfileViewModel$ = this.store.select(
  UserDataSelectors.userProfileViewModel
);
```

En la vista nos suscribimos al observable con el pipe async

```html
<ng-container *ngIf="userProfileViewModel$ | async as viewModel">
  <app-user-info [user]="viewModel.userData"></app-user-info>
</ng-container>
```

Ahora podemos comprobar que los datos que se muestran en el perfil son los almacenados en el store.

Ejercicio: Vemos que el servicio tarda bastante en responde. ¿Cómo podemos mostrar una animación de carga mientras el servicio responde?

### Día 2

#### Generando un estado con entityState

A continuación vamos a generar el estado para gestionar el listado de jugadores con más partidos perdidos.
Este estado es local, no va a ser compartido por todas las features, por lo que crearemos un estado que se configurará y cargará en el módulo de estadísticas.

Nuestra primera intención puede ser la de crear un estado que contenga un array con los jugadores.

```javascript
export interface State {
  players: Player[];
  loading: boolean;
  error: string | null;
}
```

Sin embargo, crear un estado así tiene una complejidad. Recordemos que el estado es inmutable y que cualquier acción debe generar un nuevo estado. Trabajar con arrays inmutables no es trivial. Si tenemos que modificar los datos de un jugador dentro del array debemos buscar el jugador, modificar sus valores y generar un array nuevo que contenga a todos los jugadores, incluyendo el jugador modificado. El mismo problema tenemos a la hora de eliminar elementos del array.
Por suerte, ngrx tiene un tipo especial de estado pensado para estas situaciones: EntityState.
EntityState almacena los elementos en un diccionario organizados por ids. De esta forma el acceso a cada elemento es "inmediato". Además nos proporciona una serie de utilidades para modificar el array de forma sencilla.

Primero instalaremos el paquete @ngrx/entity con

```sh
ng add @ngrx/entity@latest
```

Luego generaremos el estado para el feature de Player.

```sh
ng generate @ngrx/schematics:feature features/statistics/state/Player -m features/statistics/statistics.module.ts --skip-tests
```

A continuación iremos al reducer generado y crearemos un nuevo estado de tipo EntityState. Para ello necesitamos indicarle cuál va a ser la entidad que almacenará el estado en su diccionario. En nuestro caso serán jugadores "Player". Añadiremos también los campos para guardar el error y el estado de carga.

```javascript
export interface State extends EntityState<Player> {
  loading: boolean;
  error: string | null;
}
```

A continuación crearemos el entityAdapter. El cuál es una colección de métodos y utilidades que nos permitirá trabajar de forma cómoda con el estado. Al crearlo tenemos que indicar el identificador que nos permitirá diferenciar cada Player y acceder a él directamente en el diccionario. En este caso el player.id. También en este punto podemos indicarle una forma de comparación si queremos tener ordenados los jugadores por algún criterio. En este caso no lo utilizaremos.

```javascript
export const adapter: EntityAdapter<Player> = createEntityAdapter<Player>
  {
    selectId: (player: Player) => player.id,
    //sortComparer: (a: Player, b: Player) => a.lostMatches - b.lostMatches,
  };
```

Finalmente inicializamos el estado utilizando la opción adapter.getInitialState para que genere el diccionario vacío inicial y le indicaremos el resto de valores por defecto.

```javascript
export const initialState: State = adapter.getInitialState({
  loading: false,
  error: null,
});
```

Como siempre, definiremos las acciones correspondientes:

```javascript
export const enterLostMatchesPage = createAction(
  '[Lost Matches Page] Enter Lost Matches Page Players'
);

export const loadPlayersLostMatchesSuccess = createAction(
  '[Statistics Api] Load Lost Matches Success',
  props<{ players: PlayerLostMatches[] }>()
);

export const loadPlayersLostMatchesFailure = createAction(
  '[Statistics Page] Load  Lost Matches Failure',
  props<{ error: any }>()
);
```

Y los nuevos estados en el reducer. En este caso hay una peculiaridad, a la hora de establecer el listado de jugadores utilizaremos el adapter para rellenar el diccionario. Hay varios métodos que podemos usar como por ejemplo: addMany, setAll, etc.
Aprovechando este nuevo estado, vamos a hacer unos de una nueva funcionalidad de ngrx, la función createFeature.
Esta función engloba la definición del reducer con createReducer tal y como lo conocíamos de antes. Lo interesante es que nos va a generar automáticamente los selectores de todos los elementos definidos en el estado.

```javascript
export const playerFeature = createFeature({
  name: 'players',
  reducer: createReducer(
    initialState,
    on(PlayerActions.enterLostMatchesPage, (state) => ({
      ...state,
      loading: true,
    })),
    on(PlayerActions.loadPlayersLostMatchesSuccess, (state, action) =>
      adapter.setAll(action.players, { ...state, loading: false })
    ),
    on(PlayerActions.loadPlayersLostMatchesFailure, (state, action) => ({
      ...state,
      loading: false,
      error: action.error,
    }))
  ),
});
```
La forma de declararlo en el módulo también cambia. Pasaremos de esto:
```javascript
StoreModule.forFeature(fromPlayer.playerFeatureKey, fromPlayer.reducer),
```
a esto:

```javascript
StoreModule.forFeature(fromPlayer.playerFeature.name, fromPlayer.playerFeature.reducer),
```
En el archivo de selectores, a partir del playerFeature obtenemos selectores para cada elemento almacenado en el estado: loading, error, el estado al completo, entities e ids. 

- SelectEntities: Nos devuelve el diccionario de Players.
- SelectId: Nos devuelve el listado de ids del diccionario.
- SelectPlayerState: Nos devuelve el estado al completo.

Utilizado la función selectAll del conjunto de funciones de selectores del adapter y el selector de estado, podemos obtener el array de jugadores en lugar del diccionario.

```javascript
export const {
  selectLoading,
  selectPlayerState,
  selectError,
  selectEntities,
  selectIds,
} = playerFeature;

const { selectAll } = adapter.getSelectors();

export const selectAllPlayers = createSelector(
  selectPlayerState,
  (state: State) => selectAll(state)
);

```

A continuación creamos el efecto como siempre

```javascript
loadLostMatchesPlayers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PlayerActions.enterLostMatchesPage),
      concatMap(() =>
        this.statisticsService.lostMatches().pipe(
          map((response) =>
            PlayerActions.loadPlayersLostMatchesSuccess({
              players: response.map((player) => ({ ...player, ownGoals: 0 })),
            })
          ),
          catchError((error) =>
            of(PlayerActions.loadPlayersLostMatchesFailure({ error }))
          )
        )
      )
    );
  });
```
Lanzamos la acción desde el container y comprobamos en el devTools que todo va correctamente.
Sólo nos falta suscribirnos al selector en la vista y pasar los datos a la tabla de jugadores.

Ahora vamos a ver la potencia de usar componentes reactivos.
Vamos a insertar un jugador y ver cómo se actualiza la tabla automáticamente.
Generamos como siempre, las acciones para añadir un jugador:

```javascript
export const playerLostMatchesAdded = createAction(
  '[Lost Matches Page] Add player',
  props<{ player: PlayerLostMatches }>()
);

export const addPlayerLostMatchesSuccess = createAction(
  '[Statistics Api] Add player Success',
  props<{ player: PlayerLostMatches }>()
);

export const addPlayerLostMatchesFailure = createAction(
  '[Statistics Page] Add player Failure',
  props<{ error: any }>()
);
```
Añadimos los nuevos estados del reducer

```javascript
    on(PlayerActions.playerLostMatchesAdded, (state) => ({
      ...state,
      loading: true
    })),
    on(PlayerActions.addPlayerLostMatchesSuccess, (state, action) =>
      adapter.addOne(({...action.player, ownGoals: 0}), { ...state, loading: false })
    ),
    on(PlayerActions.addPlayerLostMatchesFailure, (state, action) => ({
      ...state,
      loading: false,
      error: action.error,
    }))
```

En el método addPlayer de lost-matches-container.component.ts añadimos la llamada a la acción

```javascript
 this.store.dispatch(PlayerStatisticsAcions.playerLostMatchesAdded({player}));
 ````
y comprobamos cómo gracias al selector, al añadir un nuevo jugador, este aparecerá de forma reactiva en la tabla.






#### Buenas prácticas: createFeature, viewModel.

