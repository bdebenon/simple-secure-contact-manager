// https://khalilstemmler.com/articles/enterprise-typescript-nodejs/application-layer-use-cases/
export interface UseCase<IRequest, IResponse> {
    execute (request?: IRequest): Promise<IResponse> | IResponse;
}