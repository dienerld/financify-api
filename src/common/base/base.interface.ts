export interface BaseRepository {
  handleAndThrowError(error: unknown): never;
}
