const {MongoClient} = require('mongodb');

/**
 * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
 * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
 */
const uri = "mongodb+srv://vickygiovi_db_user:OT4xsI1okt894IKn@cse341-node.hirm9l2.mongodb.net/?retryWrites=true&w=majority&appName=cse341-node";

async function main() {
    
    const client = new MongoClient(uri);

    try {
    
        await client.connect();

        await listDatabases(client);

    } catch (e) {

        console.error(e);

    } finally {

        await client.close();

    }
}

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

main().catch(console.error);