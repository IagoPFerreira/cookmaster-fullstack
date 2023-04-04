DROP DATABASE IF EXISTS cookmaster;

CREATE DATABASE cookmaster;

CREATE TABLE cookmaster.recipes(
  id INTEGER NOT NULL PRIMARY KEY,
  name VARCHAR(25) NOT NULL,
  preparation VARCHAR(500) NOT NULL
);

INSERT INTO cookmaster.recipes VALUES
  (1, 'banana caramelizada', 'coloque o açúcar na frigideira até virar caramelo e jogue a banana'),
  (2, 'Frango do Jacquin', '10 min no forno'),
  (3, 'Pudim de leite condensado', 'bata o leite condensado, o creme de leite e os ovos no liquidificador por 5 minutos, enquanto isso, coloque o açúcar na frigideira até virar caramelo, ponha o caramelo em uma forma e despeje a misturam em cima, coloque para gelar'),
  (4, 'Bolo de fubá', 'coloque o fubá, a farinha de trigo e o fermento em pó em um recipiente e misture. Ponha no liquidificador, 3 ovos, o leite, o óleo e o açúcar. Junte as duas misturas e misture. Transfira a massa para uma forma untada. Leve para assar por 30 minutos'),
  (5, 'Arroz doce', 'Misture o arroz com a água fria numa panela grande para cozinhar. Com duas gemas e açúcar, faça uma gemada e misture com o leite condensado. Misture o arroz com a gemada, o leite condensado e o leite de coco e continue mexendo por 5 min'),
  (6, 'Bolo de abacate', 'Amasse o abacate até que vire uma pasta. Em uma batedeira, adicione o açúcar, a manteiga e bata até formar um creme depois adicione os outros ingredientes, adicione o abacate a massa. Despeje a massa em uma forma untada. Leve ao forno por 50 minutos');

CREATE TABLE IF NOT EXISTS cookmaster.ingredients(
  id INTEGER NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

INSERT INTO cookmaster.ingredients VALUES
  (1, 'Abacate amassado'),
  (2, 'Açúcar'),
  (3, 'Água'),
  (4, 'Arroz'),
  (5, 'Banana'),
  (6, 'Baunilha'),
  (7, 'Canela em pó'),
  (8, 'Creme de leite'),
  (9, 'Farinha de trigo'),
  (10, 'Fermento em pó'),
  (11, 'Frango'),
  (12, 'Fubá'),
  (13, 'Gemas'),
  (14, 'Leite'),
  (15, 'Leite condensado'),
  (16, 'Leite de coco'),
  (17, 'Leite em pó'),
  (18, 'Manteiga'),
  (19, 'Óleo'),
  (20, 'Ovos');

CREATE TABLE IF NOT EXISTS cookmaster.recipes_ingredients(
  `recipe_id` INT NOT NULL, 
  `ingredient_id` INT NOT NULL,
  FOREIGN KEY (`recipe_id`) REFERENCES cookmaster.recipes (id) ON DELETE CASCADE
 ON UPDATE CASCADE,
  FOREIGN KEY (`ingredient_id`) REFERENCES cookmaster.ingredients (id) ON DELETE CASCADE
 ON UPDATE CASCADE,
  PRIMARY KEY (`recipe_id`, `ingredient_id`)
);

INSERT INTO cookmaster.recipes_ingredients VALUES
  (1, 5),
  (1, 2),
  (2, 11),
  (3, 15),
  (3, 8),
  (3, 20),
  (3, 2),
  (4, 12),
  (4, 9),
  (4, 10),
  (4, 20),
  (4, 14),
  (4, 19),
  (4, 2),
  (5, 4),
  (5, 15),
  (5, 13),
  (5, 2),
  (5, 16),
  (5, 7),
  (5, 3),
  (6, 1),
  (6, 9),
  (6, 18),
  (6, 2),
  (6, 20),
  (6, 6),
  (6, 10),
  (6, 17);