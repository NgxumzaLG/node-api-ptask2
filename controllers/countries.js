const { db, Table } = require('../db');

const getAllCountries = async () => {
   const params = {
      TableName: Table,
      Key: {
         PK: 'countries',
      },
   };

   try {
      const data = await db.scan(params).promise();
      return { success: true, items: data.Items };
   } catch (error) {
      return { success: false, error };
   }
};

const getById = async (id) => {
   const createSK = `country_id_${id}`;
   const params = {
      TableName: Table,
      Key: {
         PK: 'countries',
         SK: createSK,
      },
   };
   try {
      const data = await db.get(params).promise();
      return { success: true, item: data.Item };
   } catch (error) {
      return { success: false, error };
   }
};

const createOrUpdate = async (data) => {
   const params = {
      TableName: Table,
      Item: data,
   };

   try {
      await db.put(params).promise();
      return { success: true };
   } catch (error) {
      return { success: false };
   }
};

const deleteCountry = async (id) => {
   const createSK = `country_id_${id}`;
   const params = {
      TableName: Table,
      Key: {
         PK: 'countries',
         SK: createSK,
      },
   };

   try {
      await db.delete(params).promise();
      return { success: true };
   } catch (error) {
      return { success: false };
   }
};

module.exports = { getAllCountries, getById, createOrUpdate, deleteCountry };
