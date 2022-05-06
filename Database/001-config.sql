-- Up

CREATE TABLE IF NOT EXISTS park_locations(
    park_id PRIMARY KEY,
    park_name VARCHAR(40),
    park_address VARCHAR(40),
    park_town VARCHAR(15),
    park_postcode VARCHAR(10),
    park_descriprion VARCHAR(200),
    park_lan VARCHAR(20),
    park_lon VARCHAR(20)
);

insert into park_locations 
    (park_id, park_name, park_address, park_town, park_postcode, park_lan, park_lon) values
        ('867fdb71-7525-4a7e-b9a2-cd9e206e5010', 'Orchard Park', 'Goldsmith Avenue', 'Southsea', 'PO4', 50.79532320639754, -1.072935842654149),
        ('9c29f89c-4644-4501-b2b6-4e47a0b2335b', 'Bransbury Park', 'Bransbury Road', 'Southsea', 'PO4 8AN', 50.79010396799044, -1.0539455049618984),
        ('5d3f894e-1b80-474a-b30f-62a70ae387e4', 'Milton Park', 'Milton Road', 'Southsea', 'PO4 8PR', 50.794681846667636, -1.0601145856970973),
        ('28bf8b81-db50-47ab-b5c4-6228a5d10b66', 'Tamworth Park', 'Tamworth Park', 'Kingston', 'PO3', 50.803437866662776, -1.0585507582866736),
        ('34d1ea2d-d161-4a29-b74c-c0670665342e', 'Kingston Park', 'St Marys Road', 'Fratton', 'PO1 5ER', 50.8020690469241, -1.068691011915569),
        ('1b86d5be-8ede-486d-9a47-31c7c4ae9d48', 'Wimbeldon Park', 'Wimbeldon Park Road', 'Southsea', 'PO5 2PU', 50.78360822278176, -1.07911398985746),
        ('299ebde8-e3fa-4c38-a057-2fc2ecad094a', 'Southsea Courts', 'Eastern Parade', 'Southsea', 'PO4 9RB', 50.78158675062328, -1.0663895902891478),
        ('5c7e19a3-ad77-4b75-8724-085009856840', 'College Park', 'Kirby Road', 'Portsmouth', 'PO2 0QB', 50.81985893766588, -1.0668683366569014),
        ('8ba00491-9c99-446c-ad5b-f5217813d54b', 'Stamshaw Park', 'Weston Ter', 'Tipney', 'PO2', 50.81898519391593, -1.0899483560645642)
;


CREATE TABLE IF NOT EXISTS park_facilities (
    park_id CHAR(36) NOT NULL REFERENCES park_locations(park_id),
    basketball_court BOOLEAN,
    small_football_pitch BOOLEAN,
    full_size_pitch BOOLEAN,
    astro_turf BOOLEAN,
    tennis_court BOOLEAN,
    playground BOOLEAN,
    pond BOOLEAN,
    skate_park BOOLEAN
    
);

insert into park_facilities 
(park_id, basketball_court, small_football_pitch, full_size_pitch, astro_turf, tennis_court, playground, pond, skate_park) values
    ('867fdb71-7525-4a7e-b9a2-cd9e206e5010',TRUE,FALSE,TRUE,FALSE,TRUE,FALSE,TRUE,FALSE),
    ('9c29f89c-4644-4501-b2b6-4e47a0b2335b',TRUE,TRUE,TRUE,FALSE,FALSE,FALSE,FALSE,TRUE),
    ('5d3f894e-1b80-474a-b30f-62a70ae387e4',FALSE,TRUE,FALSE,TRUE,FALSE,TRUE,FALSE, FALSE),
    ('28bf8b81-db50-47ab-b5c4-6228a5d10b66',FALSE,TRUE,FALSE,TRUE,FALSE,TRUE,FALSE, TRUE),
    ('34d1ea2d-d161-4a29-b74c-c0670665342e',FALSE,TRUE,FALSE,TRUE,FALSE,TRUE,TRUE,FALSE),
    ('1b86d5be-8ede-486d-9a47-31c7c4ae9d48',TRUE,FALSE,TRUE,TRUE,TRUE,FALSE,TRUE,FALSE),
    ('299ebde8-e3fa-4c38-a057-2fc2ecad094a',TRUE,TRUE,TRUE,FALSE,TRUE,FALSE,TRUE,FALSE),
    ('5c7e19a3-ad77-4b75-8724-085009856840',TRUE,FALSE,TRUE,FALSE,FALSE,FALSE,TRUE,FALSE),
    ('8ba00491-9c99-446c-ad5b-f5217813d54b',TRUE,FALSE,FALSE,FALSE,TRUE,FALSE,FALSE,FALSE)
;


CREATE TABLE IF NOT EXISTS facility_availibility (
    park_id CHAR(36) NOT NULL REFERENCES park_locations(park_id),
    bc_available BOOLEAN,
    bc_timestamp VARCHAR(25),
    sfp_available BOOLEAN,
    sfp_timestamp VARCHAR(25),
    fsp_available BOOLEAN,
    fsp_timestamp VARCHAR(25),
    at_available BOOLEAN,
    at_timestamp VARCHAR(25),
    tc_available BOOLEAN,
    tc_timestamp VARCHAR(25),
    pg_available BOOLEAN,
    pg_timestamp VARCHAR(25),
    sp_available BOOLEAN,
    sp_timestamp VARCHAR(25)
);

insert into facility_availibility 
(park_id, bc_available, sfp_available, fsp_available, at_available, tc_available, pg_available, sp_available) values
    ('867fdb71-7525-4a7e-b9a2-cd9e206e5010', TRUE, NULL, TRUE, NULL, TRUE, NULL, TRUE),
    ('9c29f89c-4644-4501-b2b6-4e47a0b2335b', TRUE, TRUE, TRUE, NULL, NULL, NULL, NULL),
    ('5d3f894e-1b80-474a-b30f-62a70ae387e4', NULL, TRUE, NULL, TRUE, NULL, TRUE, NULL),
    ('28bf8b81-db50-47ab-b5c4-6228a5d10b66', NULL, TRUE, NULL, TRUE, NULL, TRUE, NULL),
    ('34d1ea2d-d161-4a29-b74c-c0670665342e', NULL, TRUE, NULL, TRUE, NULL, TRUE, TRUE),
    ('1b86d5be-8ede-486d-9a47-31c7c4ae9d48', TRUE, NULL, TRUE, TRUE, TRUE, NULL, TRUE),
    ('299ebde8-e3fa-4c38-a057-2fc2ecad094a', TRUE, TRUE, TRUE, NULL, TRUE, NULL, TRUE),
    ('5c7e19a3-ad77-4b75-8724-085009856840', TRUE, NULL, TRUE, NULL, NULL, NULL, TRUE),
    ('8ba00491-9c99-446c-ad5b-f5217813d54b', TRUE, NULL, NULL, NULL, TRUE, NULL, NULL)
;

CREATE TABLE IF NOT EXISTS events (
    event_id PRIMARY KEY,
    event_name VARCHAR(20),
    event_category VARCHAR(20),
    event_location VARCHAR(40) NOT NULL REFERENCES park_locations(park_id),
    event_description VARCHAR(200),
    event_date VARCHAR(10),
    event_start_time VARCHAR(8),
    event_end_time VARCHAR(8)

);


-- Down

DROP TABLE park_locations
