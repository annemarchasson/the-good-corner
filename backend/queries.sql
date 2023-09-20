-- SQLite
--créer table ad
CREATE TABLE `ad` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `title` VARCHAR(250) NOT NULL,
  `description` TEXT NOT NULL,
  `owner` VARCHAR(250) NOT NULL,
  `price` INT NOT NULL,
  `picture` VARCHAR(250) NOT NULL,
  `location` VARCHAR(100) NOT NULL,
  `createdAt` DATE NOT NULL
);

-- insérer données dans table ad *10 ça suffit
INSERT INTO ad ( title, description, owner, price, picture, location, createdAt)
VALUES ('bike1', 'bike blue', 'anneM@yaho.fr', 100, 'https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000',
'Lille', '2023-09-05T10:13:14.755Z');

INSERT INTO ad ( title, description, owner, price, picture, location, createdAt)
VALUES ('bike2', 'bike pink', 'anneM@yaho.fr', 100, 'https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000',
'Bordeaux', '2023-09-05T10:13:14.755Z');

INSERT INTO ad ( title, description, owner, price, picture, location, createdAt)
VALUES ('bike3', 'bike pink', 'anneM@yaho.fr', 39, 'https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000',
'Paris', '2023-08-05T10:13:14.755Z');

INSERT INTO ad (title, description, owner, price, picture, location, createdAt)
VALUES ('bike4', 'bike red', 'anneM@yaho.fr', 70, 'https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000',
'Lyon', '2023-08-01T10:13:14.755Z');

INSERT INTO ad ( title, description, owner, price, picture, location, createdAt)
VALUES ('bike5', 'bike orange', 'anneM@yaho.fr', 103, 'https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000',
'Lyon', '2023-08-03T10:13:14.755Z');

INSERT INTO ad (id, title, description, owner, price, picture, location, createdAt)
VALUES (6,'bike6', 'bike green', 'anneM@yaho.fr', 12, 'https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000',
'Paris', '2023-08-01T10:13:14.755Z');

INSERT INTO ad (title, description, owner, price, picture, location, createdAt)
VALUES ('bike7', 'bike yellow', 'anneM@yaho.fr', 112, 'https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000',
'Bordeaux', '2023-08-05T10:13:14.755Z');

INSERT INTO ad ( title, description, owner, price, picture, location, createdAt)
VALUES ('bike8', 'bike violet', 'anneM@yaho.fr', 32, 'https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000',
'Paris', '2023-09-05T10:13:14.755Z');

INSERT INTO ad ( title, description, owner, price, picture, location, createdAt)
VALUES ('bike9', 'bike black', 'anneM@yaho.fr', 18, 'https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000',
'Lyon', '2023-09-05T10:13:14.755Z');

INSERT INTO ad (title, description, owner, price, picture, location, createdAt)
VALUES ('bike10', 'bike white', 'anneM@yaho.fr', 180, 'https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000',
'Paris', '2023-09-05T10:13:14.755Z');


 --créer table categorie
CREATE TABLE `category` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `nameCat` VARCHAR(50) NOT NULL
);

-- insérer les catégories
INSERT INTO category (nameCat) VALUES
('vêtement'),
('voiture'),
('autre');


-- voir champs table
.schema category

-- voir données des tables
SELECT * FROM category;
SELECT * FROM ad;

/*activé clé étrangère*/
PRAGMA foreign_keys = ON;
/* test si ça a fonctionné = 1 Si pas fonctionné = 0 */
PRAGMA foreign_keys;
/* si je lance les deux commandes en mm temps ça met 1
et si je relance seulement foreign-keys = ON ça remet 0

Si la valeur revient à 0 après avoir exécuté à nouveau PRAGMA foreign_keys = ON;, cela suggère qu'il peut y avoir une interférence ou une incompatibilité avec l'outil ou l'environnement que vous utilisez.

SOLUTIONS PROPOSEES:
1/Essayez d'utiliser une autre session SQLite ou un autre outil SQLite pour voir si le comportement est le même.

2/Vérifiez si des paramètres de configuration spécifiques à l'outil ou à l'environnement que vous utilisez peuvent influencer le comportement des contraintes de clé étrangère. */


/* lier table MAIS ne fonctionne pas avec SQLite*/
/* ALTER TABLE ad
ADD CONSTRAINT fk_ad_category
FOREIGN KEY (category_id) 
REFERENCES category(id)  
ON DELETE CASCADE
ON UPDATE CASCADE; */



-- ajouter colonne "fausse clé étrangère" dans table ad
ALTER TABLE `ad` ADD COLUMN `category_id` INTEGER;

/*mettre à jour la colonne category_id dans table ad avec uniquement
les id des trois catégories possible */
UPDATE `ad` SET `category_id` = 1 WHERE `id` = 1;
UPDATE `ad` SET `category_id` = 2 WHERE `id` = 3;
UPDATE `ad` SET `category_id` = 3 WHERE `id` = 4;
UPDATE `ad` SET `category_id` = 2 WHERE `id` = 5;
UPDATE `ad` SET `category_id` = 3 WHERE `id` = 6;


/* Afficher toutes les annonces */
SELECT * FROM ad;

/* Afficher toutes les annonces de Bordeaux */
SELECT * FROM ad WHERE location = 'Bordeaux';

/* Supprimer les annonces avec un prix supérieur à 40€ */
SELECT * FROM ad WHERE price > 100;
DELETE FROM ad WHERE price > 100;

/* Mettre à jour les annonces du 1er Aout avec un prix à 0€ */
SELECT * FROM ad WHERE createdAt = '2023-08-01T10:13:14.755Z';
UPDATE ad SET price=0 WHERE createdAt = '2023-08-01T10:13:14.755Z';

/* Afficher la moyenne des prix de Paris */
/* AVG(champ) : effectue la moyenne  */
SELECT * FROM ad WHERE location='Paris';
SELECT AVG(price) FROM ad WHERE location = 'Paris';


/*BONUS : Afficher la moyenne des prix des annonces par ville */
SELECT ad.location, AVG(price) FROM ad GROUP BY location;
 
 
 /*Afficher les annonces de la catégorie "vêtement" :
sql
*/
SELECT * FROM ad WHERE category_id = 1;


/*catégories "vêtement" et "voiture" :*/
SELECT * FROM ad WHERE category_id IN (1, 2);

/*  prix moyen des annonces de la catégorie "autre" : */
SELECT * FROM ad WHERE category_id=3;
SELECT AVG(price) AS PrixMoyen FROM ad WHERE category_id = 3;


/* annonces des catégories dont le nom commence par un "v" */
SELECT ad.*
FROM ad
JOIN category ON ad.category_id = category.id
WHERE category.nameCat LIKE 'v%';
