# Instalacion

```js
npm i 
```

# Ejecucion

```js
npm run dev
```

# Rutas

| Tipo | ruta  | Requiere 'Authorization' Header | Body
| :---: | :-: | :-: | :-: | 
| Post | localhost:3000/auth/signIn | no | { user:'usuario' , password:'password'}
| Post | localhost:3000/auth/signUp | no | { user:'usuario' , password:'password'}
| Get |  localhost:3000/clima/:ciudad | si | No tiene
| Get | localhost:3000/transacciones | si | No tiene


