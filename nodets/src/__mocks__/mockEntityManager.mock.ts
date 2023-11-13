import { EntityManager } from "typeorm";

interface MockManagerArgs {
    saveReturn?: object | [object]
    findOneReturn?: object
}

export const getMockEntityManager = async ({
    saveReturn = undefined,
    findOneReturn = undefined
}: MockManagerArgs): Promise<EntityManager> => {
    const manager: Partial<EntityManager> = {}

    manager.save = jest.fn().mockImplementation(() => Promise.resolve(saveReturn))
    manager.findOne = jest.fn().mockImplementation(() => Promise.resolve())

    return manager as EntityManager;
}
