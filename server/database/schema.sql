create table user (
  id int unsigned primary key auto_increment not null,
  email varchar(255) not null unique,
  password varchar(255) not null
);

create table item (
  id int unsigned primary key auto_increment not null,
  title varchar(255) not null,
  user_id int unsigned not null,
  foreign key(user_id) references user(id)
);

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
