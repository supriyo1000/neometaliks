const knex = require('knex');

// Source database configuration
const sourceDb = knex({
    client: 'mysql2',
    connection: {
        database: 'neoproduction',
        host: '127.0.0.1',
        user: 'root',
        password: 'qtest123'
    },
});

// Destination database configuration
const destinationDb = knex({
    client: 'mysql2',
    connection: {
        database: 'neoproduction',
        host: '103.184.242.29',
        user: 'neodbadmin',
        password: 'Killer$123'
    },
});

// Function to get stored procedure names from a database using Knex.js
async function getProcedureNames(db) {
    try {
        const procedureNames = await db.raw(
            "SELECT `ROUTINE_NAME` FROM `information_schema`.`ROUTINES` " +
            "WHERE `ROUTINE_TYPE` = 'PROCEDURE' " +
            "AND `ROUTINE_SCHEMA` = ?;",
            [db.client.config.connection.database]
        );
        return procedureNames[0].map((row) => row.ROUTINE_NAME);
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}


// Function to find unique stored procedures
async function findUniqueStoredProcedures() {
    try {
        const sourceProcedures = await getProcedureNames(sourceDb);
        const destinationProcedures = await getProcedureNames(destinationDb);

        console.log("sourceProcedures", sourceProcedures);
        console.log("destinationProcedures", destinationProcedures);

        // Iterate through source procedures and check if they exist in destination
        for (const sourceProcedure of sourceProcedures) {
            if (!destinationProcedures.includes(sourceProcedure)) {
                // If the procedure is unique, copy it to the destination
                await copyStoredProcedure(sourceProcedure);
                console.log(`Copied procedure "${sourceProcedure}" to destination.`);
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
    finally {
        sourceDb.destroy();
        destinationDb.destroy();
    }
}



// Function to copy a stored procedure to the destination
async function copyStoredProcedure(procedureName) {
    try {
        const procedureDefinition = await getStoredProcedureDefinition(sourceDb, procedureName);
        if (procedureDefinition) {
            await destinationDb.raw(procedureDefinition);
        }
    } catch (error) {
        console.error(`Error copying procedure "${procedureName}":`, error);
    }
}

// Function to get the definition of a stored procedure
async function getStoredProcedureDefinition(db, procedureName) {
    try {
        const result = await db.raw(`SHOW CREATE PROCEDURE \`${procedureName}\``);
        if (result[0].length > 0 && result[0][0]['Create Procedure']) {
            return result[0][0]['Create Procedure'];
        }
    } catch (error) {
        console.error(`Error getting definition for procedure "${procedureName}":`, error);
    }
    return null;
}

// Function to get table names from the source database
async function getTableNames(db) {
    try {
        const tableNames = await db.raw(
            "SELECT `TABLE_NAME` FROM `information_schema`.`TABLES` " +
            "WHERE `TABLE_SCHEMA` = ?;",
            [db.client.config.connection.database]
        );
        return tableNames[0].map((row) => row.TABLE_NAME);
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

// Function to create tables with the same structure in the destination database
async function copyTables() {
    try {
        const sourceTables = await getTableNames(sourceDb);

        // Iterate through source tables and create equivalent tables in the destination
        for (const sourceTable of sourceTables) {
            await copyTableStructure(sourceTable);
            console.log(`Copied table "${sourceTable}" to destination.`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
    // finally {
    //     sourceDb.destroy();
    //     destinationDb.destroy();
    // }
}

// Function to copy the structure of a table (without data)
async function copyTableStructure(tableName) {
    try {
        // Get the table structure (columns, keys, etc.) from the source database
        const tableDefinition = await sourceDb.raw(`SHOW CREATE TABLE \`${tableName}\``);

        if (tableDefinition[0].length > 0 && tableDefinition[0][0]['Create Table']) {
            // Create an equivalent table in the destination database
            await destinationDb.raw(tableDefinition[0][0]['Create Table']);
        }
    } catch (error) {
        console.error(`Error copying table structure for "${tableName}":`, error);
    }
}

// Call the copyTables function to copy table structures



// Call the findUniqueStoredProcedures function to compare the stored procedures between databases
async function copyAndFind() {
    await copyTables();
    findUniqueStoredProcedures();
}

copyAndFind();