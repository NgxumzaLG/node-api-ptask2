const { db, Table } = require('../db');

const getAllRegions = async () => {
   const params = {
      KeyConditionExpression: 'PK = :PK',
      ExpressionAttributeValues: {
         ':PK': 'regions',
      },
      TableName: Table,
   };

   try {
      const data = await db.query(params).promise();
      return { success: true, data };
   } catch (error) {
      return { success: false, error };
   }
};

const getById = async (id) => {
   const createSK = `region_id_${id}`;
   const params = {
      TableName: Table,
      Key: {
         PK: 'regions',
         SK: createSK,
      },
   };
   try {
      const data = await db.get(params).promise();
      return { success: true, data };
   } catch (error) {
      return { success: false, error };
   }
};

const createOrUpdate = async ({ id, data }) => {
   const createSK = `region_id_${id}`;
   const params = {
      TableName: Table,
      Item: {
         PK: 'regions',
         SK: createSK,
         ...data,
      },
   };

   try {
      await db.put(params).promise();
      return { success: true };
   } catch (error) {
      return { success: false };
   }
};

const deleteRegion = async (id) => {
   const createSK = `region_id_${id}`;
   const params = {
      TableName: Table,
      Key: {
         PK: 'regions',
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

module.exports = { getAllRegions, getById, createOrUpdate, deleteRegion };
