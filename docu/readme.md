# Modulos

imports: [UsersModule, ProductsModule],

cada modulo tiene sus controlador, servicios y entidades
todod tiene que estar encapsulados, en modulos mas pequeños...

```
producto
    -categorias
    -añadir
    -eliminar

usuarios
    - controlers
    - perfil
    - buscar
    - eliminar

codigo organizado
```

@Module({
imports:[],
controllers:[]
providers:[]
export:[]
})

# cli

nest g mo products

# injections

## @injectable

dentro de servicios
existe @injectable el mas famoso para servicios

## @inject

y para global props => @inject

`constructor(@Inject('API_KEY') private apikey: string) {}`
the esta manera obtenemos el API_KEY de manera segura en toda la app
dentro del provider de appmodule

```
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },

```

## Async Inject - Factory

se puede injectar a un servicio, utiliza axios por detras...

`constructor(private httpService: HttpService) {}`

```
    {
      provide: 'TASK',
      useFactory: async (http: HttpService) => {
        const tasks = await http
          .get('https://jsonplaceholder.typicode.com/todos')
          .toPromise();
        return tasks.data;
      },
      inject: [HttpService],
    },
```

y en app service:

```
 constructor(
    @Inject('API_KEY') private apikey: string,
    @Inject('TASK') private tasks: string,
  ) {}

```

# modules

pueden exportarse e importarse,

- no puede haver loops
- padre > hijo
- tienen que ser como islas
- tinen sus services and controllers

## Global modules

@Global
estos providers son globales,
como apiKey y puede ser utilizada por cualquier modulo,
como por ejemplo database conection

```
import { Global, Module } from '@nestjs/common';

const API_KEY = 'abc12345';
const API_KEY_PROD = 'PROD-abc12345';

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
  ],
  exports: ['API_KEY'],
})
export class DatabaseModule {}


// Luego llamarlo desde cualquier servicio

  constructor(@Inject('API_KEY') private apikey: string,) {}

```

En caso de que se créen loops, utilizar los global modules, pero no es aconsejable.
