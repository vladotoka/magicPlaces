import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('places.db');

export const init = () => {
	const promise = new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				'CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL, dateOfCreation TEXT NOT NULL);',

				[],
				() => {
					resolve();
				},
				(_, err) => {
					reject(err);
				}
			);
		});
	});

	return promise;
};

export const initVersion = () => {
	const promise = new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				'CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL, dateOfCreation TEXT NOT NULL);',

				[],
				() => {
					resolve();
				},
				(_, err) => {
					reject(err);
				}
			);
		});
	});

	return promise;
};

export const checkVersionOfDB = () => {
	const promise = new Promise((resolve, reject) => {
		db.transaction((tx) => {
			const versionRecord = tx.executeSql(
				'SELECT version FROM schema_version;',
				[],
				() => {
					resolve();
				},
				(_, err) => {
					reject(err);
				}
			);
		});
	});
	// const version = versionRecord.length ? versionRecord[0].version : 0;
	// console.log(`version record:${versionRecord}, version:${version}`);
	return promise;
};

const checkSchemaVersion = async () => {
	return new Promise((resolve, reject) => {
		db.transaction((tx) => {
			try {
				// Check if the schema_version table exists
				tx.executeSql(
					'SELECT name FROM sqlite_master WHERE type="table" AND name="schema_version";',
					[],
					(_, { rows }) => {
						if (rows.length === 0) {
							// Table schema_version doesn't exist, add dateOfCreation column to the places table and create schema_version
							updateSchemaVersion2(tx, resolve);
						} else {
							// Table schema_version exists, check the version value
							tx.executeSql(
								'SELECT version FROM schema_version;',
								[],
								(_, { rows }) => {
									const version = rows.item(0)?.version;

									if (version === 2) {
										// Schema version is 2, update to version 3
										updateSchemaVersion3(tx, resolve);
									} else {
										// Schema version is already up to date or not recognized
										resolve();
									}
								}
							);
						}
					}
				);
			} catch (error) {
				reject(error);
			}
		});
	});
};

const updateSchemaVersion2 = (tx, resolve) => {
	// Create a new table with the updated schema
	tx.executeSql(
		'CREATE TABLE IF NOT EXISTS placesNew (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL, dateOfCreation TEXT NOT NULL);'
	);

	// Copy data from the existing table to the new table
	tx.executeSql(
		'INSERT INTO placesNew (id, title, imageUri, address, lat, lng, dateOfCreation) SELECT id, title, imageUri, address, lat, lng, "" FROM places;'
	);

	// Drop the old table
	tx.executeSql('DROP TABLE places;');

	// Rename the new table to the original table name
	tx.executeSql('ALTER TABLE placesNew RENAME TO places;');

	// Create or update the schema_version table
	tx.executeSql(
		'CREATE TABLE IF NOT EXISTS schema_version (id INTEGER PRIMARY KEY AUTOINCREMENT, version INTEGER);'
	);

	// Set the new schema version
	tx.executeSql('INSERT INTO schema_version (version) VALUES (2);');

	resolve();
};

const updateSchemaVersion3 = (tx, resolve) => {
	// tx.executeSql('INSERT INTO schema_version (version) VALUES (3);');

	resolve();
};

export const performSchemaUpdates = async () => {
	try {
		await checkSchemaVersion();
		console.log('Schema updates completed');
	} catch (error) {
		console.error('Error performing schema updates:', error);
	}
};

export const insertPlace = (
	title,
	imageUri,
	address,
	lat,
	lng,
	dateOfCreation
) => {
	const promise = new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				'INSERT INTO places (title, imageUri, address, lat, lng, dateOfCreation) VALUES (?, ?, ?, ?, ?, ?);',
				[title, imageUri, address, lat, lng, dateOfCreation],
				(_, result) => {
					resolve(result);
				},
				(_, err) => {
					reject(err);
				}
			);
		});
	});

	return promise;
};

export const fetchPlaces = () => {
	const promise = new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				'SELECT * FROM places',
				[],
				(_, result) => {
					resolve(result);
				},
				(_, err) => {
					reject(err);
				}
			);
		});
	});

	return promise;
};

export const deletePlace = (id) => {
	const promise = new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				`DELETE FROM places WHERE id=${id}`,
				[],
				(_, result) => {
					resolve(result);
				},
				(_, err) => {
					reject(err);
				}
			);
		});
	});

	return promise;
};
