create table if not exists services
(
	service_id serial not null
		constraint services_pkey
			primary key,
	token varchar(255),
	refresh_token varchar(255),
	enabled boolean,
	token_expire_date timestamp with time zone
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
	twitter_id integer
		constraint fk_twitter_service
			references services
				on update cascade on delete set null,
	reddit_id integer
		constraint fk_reddit_service
			references services
				on update cascade on delete set null,
	spotify_id integer
		constraint fk_spotify_service
			references services
				on update cascade on delete set null,
	token text
		constraint users_token_key
			unique,
	token_expire_date date
);

alter table users owner to "user";

create table if not exists widget_types
(
	id serial not null
		constraint widget_types_pk
			primary key,
	type text not null,
	configurable boolean not null
);

alter table widget_types owner to "user";

create unique index if not exists widget_types_type_uindex
	on widget_types (type);

create table if not exists widgets
(
	id serial not null
		constraint widgets_pk
			primary key,
	"user" integer
		constraint fk_user
			references users
				on update cascade on delete set null,
	widget_type integer
		constraint fk_widget_type
			references widget_types
				on update cascade on delete set null,
	name text,
	number integer,
	refresh integer
);

alter table widgets owner to "user";

insert into widget_types(type, configurable)
values ('reddit_profile', false),
       ('reddit_hots', true),
       ('reddit_spotlights', false);