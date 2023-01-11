import type { Asset } from '@mux/mux-node';
import MuxClient from '@mux/mux-node';
import DataLoader from 'dataloader';
import { GraphQLError } from 'graphql';

export default class MuxDataSource {
  #muxClient: MuxClient;

  constructor(args: { muxClient: MuxClient }) {
    const { muxClient } = args;
    this.#muxClient = muxClient;
  }

  async getAsset(assetId: string): Promise<Asset> {
    return await this.#batchGetAsset.load(assetId);
  }

  #batchGetAsset = new DataLoader(async (ids: Readonly<Array<string>>) => {
    return Promise.all(ids.map((id) => this.#muxClient.Video.Assets.get(id)));
  });
}
