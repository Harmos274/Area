export default interface IDbService {
    query?: (text: string, params: Array<string>, callback: () => void) => void
}