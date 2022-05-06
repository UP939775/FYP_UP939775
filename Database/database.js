import sqlite from 'sqlite';


async function init() {
    const db = await sqlite.open('./Database/database.sqlite', { verbose: true });
    await db.migrate({ migrationsPath: './Database' });
    return db;
}

const dbConn = init();


export async function getAllParkLocation(){
    const db = await dbConn;
    return db.all('SELECT * from park_locations order by park_name ASC');
}

export async function searchPark(id) {
    const db = await dbConn;
    return db.get('SELECT * FROM park_locations where park_id = ?', id)
}

export async function getParkFacilities(id) {
    const db = await dbConn;
    return db.get('SELECT * FROM park_facilities where park_id = ?', id)
}

export async function facility_availibility(id) {
    const db = await dbConn;
    return db.get(
        `SELECT 
            bc_available as 'Basketball Court',
            bc_timestamp, 
            sfp_available as 'Small Football Pitch', 
            sfp_timestamp,
            fsp_available as 'Full Size Pitch', 
            fsp_timestamp,
            at_available as 'Astro Turf',
            at_timestamp,
            tc_available as 'Tennis Court', 
            tc_timestamp,
            pg_available as 'Play Ground', 
            pg_timestamp,
            sp_available as 'Skate Park',
            sp_timestamp
        FROM 
            facility_availibility where park_id = ?`, id)
}





export async function testData() {
    const db = await dbConn;
    return db.all(
        `SELECT 
            park_locations.park_name as 'Park Name', 
            park_locations.park_id as 'Park ID', 
            facility_availibility.bc_available as 'Basketball Court',
            facility_availibility.sfp_available as 'Small Football Pitch',
            facility_availibility.fsp_available as 'Full Size Pitch',
            facility_availibility.at_available as 'Astro Turf',
            facility_availibility.tc_available as 'Tennis Court',
            facility_availibility.pg_available as 'Play Ground',
            facility_availibility.sp_available as 'Skate Park'
        FROM 
            'facility_availibility' inner join park_locations on facility_availibility.park_id = park_locations.park_id`
    )

}

export async function storeAvailibility(updateArray){
    const db = await dbConn;
    
    db.run(
        `UPDATE 'facility_availibility' set ${updateArray[1]} = '${updateArray[5]}', ${updateArray[2]} = ${updateArray[4]} where park_id = '${updateArray[0]}'`
        )


}

// `SELECT 
//             bc_available as 'Basketball Court', 
//             sfp_available as 'Small Football Pitch', 
//             fsp_available as 'Full Size Pitch', 
//             at_available as 'Astro Turf',
//             tc_available as 'Tennis Court', 
//             pg_available as 'Playground', 
//             pd_available as 'Pond', 
//             sp_available as 'Skate Park'
//         FROM 
//             facility_availibility where park_id = ?`, id)

// export async function facility_availibility(id) {
//     const db = await dbConn;
//     return db.get(
//         `SELECT 
//             park_facilities.basketball_court as 'Basketball Court', 
//             park_facilities.small_football_pitch as 'Small Football Pitch', 
//             park_facilities.full_size_pitch as 'Full Size Pitch', 
//             park_facilities.astro_turf as 'Astro Turf',
//             park_facilities.tennis_court as 'Tennis Court', 
//             park_facilities.playground as 'Playground', 
//             park_facilities.pond as 'Pond', 
//             park_facilities.skate_park as 'Skate Park',

//             facility_availibility.bc_available as 'BC Available',
//             facility_availibility.sfp_available as 'SP Available',
//             facility_availibility.fsp_available as 'FP Available',
//             facility_availibility.at_available as 'AT Available',
//             facility_availibility.tc_available as 'TC Available',
//             facility_availibility.pg_available as 'PG Available',
//             facility_availibility.pd_available as 'PD Available',
//             facility_availibility.sp_available as 'SP Available'
//         FROM 
//             park_facilities
//         INNER JOIN facility_availibility on facility_availibility.park_id = park_facilities.park_id
//             where facility_availibility.park_id = ?`, id)
// }





// INNER JOIN 

// SELECT park_locations.park_name, facility_availibility.park_id FROM 'facility_availibility' inner join park_locations on facility_availibility.park_id = park_locations.park_id LIMIT 0,30