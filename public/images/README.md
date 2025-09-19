# Images pour Al Djaber Qamis

Ce dossier contient les images utilisées par l'application.

## Structure recommandée

```
images/
├── products/
│   ├── qamis/
│   │   ├── qamis-blanc-1.jpg
│   │   ├── qamis-gris-1.jpg
│   │   └── qamis-bleu-1.jpg
│   ├── accessoires/
│   │   ├── tasbih-bois-1.jpg
│   │   └── chapeau-blanc-1.jpg
│   └── placeholders/
│       ├── product-placeholder.jpg
│       └── category-placeholder.jpg
├── hero/
│   ├── hero-bg.jpg
│   └── hero-pattern.svg
└── icons/
    ├── logo.svg
    └── favicon.ico
```

## Images de démonstration

Pour les tests et la démonstration, vous pouvez utiliser des images placeholder :

### Services recommandés :
- **Placeholder.com**: https://placeholder.com/
- **Picsum Photos**: https://picsum.photos/
- **Unsplash**: https://unsplash.com/

### Exemples d'URLs placeholder :
```
https://via.placeholder.com/400x400/ffffff/000000?text=Qamis+Blanc
https://via.placeholder.com/400x400/808080/ffffff?text=Qamis+Gris
https://via.placeholder.com/400x400/000080/ffffff?text=Qamis+Bleu
https://via.placeholder.com/400x400/8B4513/ffffff?text=Tasbih+Bois
https://via.placeholder.com/400x400/FFD700/000000?text=Tasbih+Or
```

## Optimisation des images

### Formats recommandés :
- **WebP** pour les navigateurs modernes
- **JPEG** pour la compatibilité
- **PNG** pour les images avec transparence

### Tailles recommandées :
- **Produits**: 400x400px (carré)
- **Hero**: 1920x1080px (16:9)
- **Catégories**: 800x600px (4:3)
- **Thumbnails**: 100x100px

### Compression :
- Qualité JPEG : 85-90%
- Optimisation WebP : 80-85%
- Utilisation d'outils comme TinyPNG ou ImageOptim

## Intégration Cloudinary (recommandé)

Pour la production, il est recommandé d'utiliser Cloudinary :

1. Créer un compte sur https://cloudinary.com/
2. Configurer les variables d'environnement dans `backend/.env`
3. Utiliser les transformations Cloudinary pour l'optimisation automatique

### Exemple de transformation Cloudinary :
```
https://res.cloudinary.com/your-cloud/image/upload/w_400,h_400,c_fill,f_auto,q_auto/v1/products/qamis-blanc.jpg
```

## Lazy Loading

L'application utilise le lazy loading pour optimiser les performances :

```jsx
<Image
  src={product.images[0]}
  alt={product.name}
  width={400}
  height={400}
  loading="lazy"
  className="object-cover"
/>
```

## Accessibilité

- Toujours fournir un texte alternatif descriptif
- Utiliser des images de haute qualité
- Éviter les images avec du texte important
- Fournir des versions en haute résolution pour les écrans Retina





