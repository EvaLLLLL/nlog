/**
 * @file getDatabaseConnection
 */

import React from 'react';
import { createConnection, getConnectionManager } from 'typeorm';

const promise = (async function () {
  const manager = getConnectionManager();
  if (!manager.has('default')) {
    console.log('创建 connection');
    return createConnection();
  } else {
    const currentConnection = manager.get('default');
    if (currentConnection.isConnected) {
      console.log('复用 connection');
      return currentConnection;
    } else {
      console.log('创建 connection, default connection 未连接');
      return createConnection();
    }
  }
})();

export const getDatabaseConnection = async () => {
  return promise;
};
