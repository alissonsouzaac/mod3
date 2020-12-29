import database from '../../modulo11/server/src/database';

export default function truncate() {
    return Promise.all(
        Object.Keys(database.connection.models).map(Key => {
            return database.connection.models[key].destroy({ truncate: true, force: true });
        })
    );
}