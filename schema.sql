create table if not exists services
(
	service_id integer not null
		constraint services_pkey
			primary key,
	token varchar(255),
	refresh_token varchar(255),
	enabled boolean
);

alter table services owner to "user";

create table if not exists users
(
	id serial not null
		constraint users_pk
			primary key,
	name text not null,
	mail text not null
		constraint users_mail_key
			unique,
	password text not null,
	twitter integer
		constraint fk_twitter_service
			references services,
	reddit integer
		constraint fk_reddit_service
			references services,
	spotify integer
		constraint fk_spotify_service
			references services,
	token text
		constraint users_token_key
			unique,
	token_expire_date date
);

alter table users owner to "user";

