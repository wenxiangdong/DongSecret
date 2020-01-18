import { createContainer } from 'unstated-next';
import React, { useState, Dispatch, SetStateAction } from 'react';
import { fromJS } from 'immutable';

/**
 * @type {import('..').UserRecord}
 */
export const DEFAULT_USER = fromJS({
  _id: '',
  since: 0,
  state: 0,
  valid: false
});

const useUser = () => {
  const state = useState(DEFAULT_USER);
  return state;
};

export const UserStore = createContainer(useUser);
