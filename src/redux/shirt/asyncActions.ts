import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Shirt, ShirtParams } from './types';
import pickBy from 'lodash/pickBy';
import identity from 'lodash/identity';

export const fetchShirt = createAsyncThunk<Shirt[], ShirtParams>(
  'shirt/fetchShirtStatus',
  async (params) => {
    const { sortBy, order, category, search, currentPage } = params;
    const { data } = await axios.get<Shirt[]>(
      `https://659472421493b011606a870c.mockapi.io/items`,
      {
        params: pickBy(
          {
            page: currentPage,
            limit: 8,
            category,
            sortBy,
            order,
            search,
          },
          identity
        ),
      }
    );

    return data;
  }
);
