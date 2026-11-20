# TP3 - Application de Gestion de Produits

Zayd Kassimi - Activite Pratique N°3 : Angular Framework.

## Ce que j'ai fait

- Backend Spring Boot (port 8083) : entite Product, repository JPA, API REST /products avec CORS, donnees initiales, Swagger.
- Frontend Angular 19 standalone (port 4200) : Bootstrap 5 et Bootstrap Icons, routage avec routerLink et router-outlet, syntaxe @if/@for/@else, service ProductService avec HttpClient et Observables RxJS.
- Pages : accueil, liste des produits avec recherche par mot-cle, formulaire d'ajout et d'edition (Reactive Forms), suppression d'un produit.

## Lancer le projet

Backend :
```
cd backend
./mvnw spring-boot:run
```

Frontend :
```
cd frontend
npm install
ng serve
```
