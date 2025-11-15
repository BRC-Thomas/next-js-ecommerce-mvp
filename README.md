# MVP Shop E-commerce

## Stack technique

- **Next.js**
- **Prisma**  
- **Tailwind CSS / shadcn/ui**  
- **Stripe**
- **Resend**



## Fonctionnalités principales

### Côté client
- Consultation du catalogue produits.
- Ajout au panier et passage de commande via Stripe.
- Réception d’un email de confirmation après achat.
- Historique d'achat

### Côté administrateur
- Connexion sécurisée au dashboard admin.
- Création, modification et suppression de produits.
- Gestion des commandes en cours et passées.
- Consultation de l’historique des ventes.

---

## Authentification admin

L’authentification administrateur se fait par **encodage Base64** pour la simplicité du MVP et reste adaptée pour un **environnement de développement ou de démonstration**.  

  
Pour une version production, une migration vers NextAuth est recommandée.


