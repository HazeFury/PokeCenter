create table pokedex (
  id int unsigned primary key auto_increment not null,
  name varchar(50) not null unique,
  image varchar(255) not null,
  sprite varchar(255) not null,
  type varchar(40) not null,
  health int not null,
  attack int not null,
  defense int not null
);

create table pokemon_to_heal (
  id int unsigned primary key auto_increment not null,
  pokemon_pseudo varchar(100) not null unique,
  pokemon_owner varchar(100) not null,
  health_left int unsigned not null,
  pokedex_id int unsigned not null,
  foreign key(pokedex_id) references pokedex(id)
);

create table staff (
  id int unsigned primary key auto_increment not null,
  name varchar(50) not null,
  image varchar(255) not null,
  origin varchar(50) not null,
  favorite_type varchar(30) not null
);

